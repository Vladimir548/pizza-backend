
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
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
  findByCategory(id: number,params?:ParamsDto) {
    const where: Prisma.ProductWhereInput = {
      categoryId: Number(id),
      productVariant: {
        some: {
          ...(params?.sizes || params?.priceTo || params?.priceFrom
            ? {
                sizes: {
                  some: {
                    ...(params?.sizes && {
                      sizeId: {
                        in: params?.sizes.map(Number),
                      },
                    }),
                    ...(params?.priceTo || params?.priceFrom
                      ? {
                          price: {
                            ...(params?.priceTo && { lte: Number(params.priceTo) }),
                            ...(params?.priceFrom && { gte: Number(params.priceFrom) }),
                          },
                        }
                      : {}),
                  },
                },
              }
            : {}),
          ...(params?.variant && {
            productAttribute: {
              productVariantId:params.variant
              
            },
          }),
        },
      },
      ...(params?.ingredients && {
        ingredients: {
          some: {
            id: {
              in: params?.ingredients.map(Number),
            },
          },
        },
      }),
    };
    return this.prisma.product.findMany({
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
            subProduct:true
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
  findId(id: number) {
    return this.prisma.product.findFirst({
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
			      productAttribute:true,
            subProduct:{
              include:{
                product:true,
                size:{
                  include:{
                    proportion:true,
                    ingredients:true,
                  }
                },
                variant:true

              }
            }
          },
            
        },
        ingredients:true,

        category: true,
      },
    });
  }
}