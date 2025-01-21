
import { Injectable } from '@nestjs/common'
import { Prisma, TypeProduct } from '@prisma/client'
import { AllTypeWithSubProduct } from 'src/data'
import { ParamsDto } from 'src/params-dto'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(dto: ProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        categoryId: Number(dto.categoryId),
        image: dto.image,
        type: dto.type,
        ingredients:{
          connect:dto.ingredientIds?.map((id) => ({id: Number(id) }))
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        productVariant: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

 async findAllSubProducts (){
    return await this.prisma.product.findMany({
      where:{
        type:{
          notIn:AllTypeWithSubProduct
        },
      },
      include:{
        productVariant:{
          include:{
            sizes:{
              include:{
                proportion:true
              }
            },
            productAttribute:true
          }
        },
      }
    })
  };

  async findMaxPrice(categoryId:number) {
    const price = await this.prisma.product.findMany({
      where:{
        categoryId:Number(categoryId)
      },
      include: {
        productVariant: {
          select: {
            sizes: {
              select: {
                price: true,
              },
            },
            priceKit:true
            
          },
        },
      },
    });

    const mathMax = price?.flatMap((val) =>
      val.productVariant.map((val) => val.priceKit ? val.priceKit : val.sizes.map((val) => val.price)).flat(),
    );
    return Math.max(...mathMax);
  }
  
  async findByCategory(id: number,params?:ParamsDto) {
    const where: Prisma.ProductWhereInput = {
      categoryId: Number(id),
      productVariant: {
        some: {
          ...(params?.sizes && {
            sizes: {
              some: {
                id: {
                  in: params.sizes.map(Number),
                },
              },
            },
          }),
          ...(params?.priceFrom || params?.priceTo
            ? {
                OR: [
                  {
                    sizes: {
                      some: {
                        price: {
                          ...(params.priceTo && { lte: Number(params.priceTo) }),
                          ...(params.priceFrom && { gte: Number(params.priceFrom) }),
                        },
                      },
                    },
                  },
                  {
                    priceKit: {
                      ...(params.priceTo && { lte: Number(params.priceTo) }),
                      ...(params.priceFrom && { gte: Number(params.priceFrom) }),
                    },
                  },
                ],
              }
            : {}), 
          ...(params?.variant && {
            productAttribute: {
              variantTypes: {
                id: {
                  in: params.variant.map(Number),
                },
              },
            },
          }),
        },
      },
      ...(params?.ingredients && {
        ingredients: {
          some: {
            id: {
              in: params.ingredients.map(Number),
            },
          },
        },
      }),
    };

    return await this.prisma.product.findMany({
        where,
      include: {
        ingredients:true,
        category: true,
        productVariant: {
          include: {
            sizes: {
              include: {
                proportion: true,
                ingredients: true,

              },
            },
            subProduct:true,
            productAttribute:{
              include:{
                variantTypes:true
              }
            }
          },
        },
      },
    });
  }
  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query?.toLowerCase(),
          mode: 'insensitive',
        },
      },
    }).then(products => {
    	return  products.reduce((acc, product) => {
    		if (!acc[product.categoryId]) {
    			acc[product.categoryId] = [];
    		}
    		acc[product.categoryId].push(product);
    		return acc;
    	}, {} as Record<string, typeof products>);
    });
  }
  async getProductsByIds(ids:number[]){
    return await this.prisma.product.findMany({
      where:{
        id:{
          in:ids
        }
      },
      include:{
        productVariant:{
          select:{
            sizes:true,

          }
        }
      }
    })
  }
 async findId(id: number) {

    return await this.prisma.product.findFirst({
      where: {
        id: +id,
      },
      include: {
        productVariant: {
          include: {
            parameter: true,
            sizes: {
              include: {
                proportion: true,
				    ingredients:true,

              },
            },
			      productAttribute:{
              include:{
                variantTypes:true
              }
            },
            subProduct:{
              include:{
                product:{
                  include:{
                    productVariant:{
                      include:{
                        productAttribute:{
                          include:{
                            variantTypes:true
                          }
                        },
                        sizes:true
                      }
                    }
                  }
                },
                size:{
                  include:{
                    proportion:true,
                    ingredients:true,
                  }
                },
                variant:{
                  include:{
                    productAttribute:{
                      include:{
                        variantTypes:true 
                      }
                    }
                  }
                }

              }
            }
          },
            
        },
        ingredients:true,

        category: true,
      },
    });
  }
  async findByType(type: TypeProduct) {
    return await this.prisma.product.findMany({
      where:{
        type: type,
      },
      include:{
        productVariant:{
          include:{
            sizes:{
              include:{
                proportion:true
              }
            },
            productAttribute:{
              include:{
                variantTypes:true
              }
            }
          }
        }
      }
    })
  }
  async findByVariantAndSizeProduct (params:{productId:number,variantId:number,sizeId:number}[]){
    const products = await this.prisma.product.findMany({
      where:{
        OR:params.map(product => ({
          id:Number(product.productId),
        
        }))
      },
        include:{
          productVariant:{
          include:{
            sizes:{
              include:{
                ingredients:true,
                proportion:true
              }
            },
            productAttribute:{
              include:{
                variantTypes:true,
                
              },
            },

          }
        }
        }
     
    })
    const handleVariantId = (id:number) =>{
      return params.some(param => param.variantId && Number(param.variantId) === id)
    }
    const handleSizeId = (id:number) =>{
      return params.some(param => param.sizeId && Number(param.sizeId) === id)
    }
    const handleProductId = (id:number) =>{
      return params.some(param => param.productId && Number(param.productId) === id)
    }

    const filteredProducts = products.map(product => ({
      ...product,
      productVariant: product.productVariant.filter(variant => handleVariantId(variant.id)
        && variant.sizes.filter(size => handleSizeId(size.id) )
        && handleProductId(variant.productId)
      ),
      
    }));

    return filteredProducts
  }

  async getListBySizeAndVariant (params:{type:TypeProduct,size:number,variant:number}){

    return await this.prisma.product.findMany({
      where:{
        type:params.type,
        productVariant:{
          ...params.variant ? ({
          some:{
            productAttribute:{
              variantTypesId:Number(params.variant)
            }
          }
        }) : null,
        some:{
          sizes:{
            some:{
              proportionId:Number(params.size)
            }
          }
        }
        }
      },
      include:{
        productVariant:{
          include:{
            sizes:{
              include:{
                proportion:true
              }
            },
            productAttribute:{
              include:{
                variantTypes:true
              }
            }
          }
        }
      }
    })
  }
}