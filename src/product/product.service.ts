
import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProductService {
	constructor (private prisma :PrismaService){}
  create(dto: ProductDto) {
			const ingredients= dto.ingredientIds?.map(Number)
    return this.prisma.product.create({
			data:{
				name:dto.name,
				categoryId:Number(dto.categoryId),
				image:dto.image,
				ingredients:{
					connect:ingredients?.map(id => ({id}))
				}
			}
		});
  }

  findAll() {
    return this.prisma.product.findMany({
			include:{
				productVariant:{
					include:{
						sizes:true,
					}
				}
			}
		});
  }
async	findMaxPrice() {
    const price = await this.prisma.product.findMany({
		
			include:{
				productVariant:{
					select:{
					sizes:{
						select:{
							price:true
						}
					}
					}
				}
			},
		});

		const mathMax = price?.flatMap(val => val.productVariant.map(val => val.sizes.map(val => val.price)).flat())
		return Math.max(...mathMax)
  }
  findByCategory(id: number) {
    return this.prisma.product.findMany({
			where:{
				categoryId:Number(id)
			},
			include:{
				category:true,
				productVariant:{
					include:{
						sizes:{
							include:{
								proportion:true
							}
						},
					}
				},
				ingredients:true
			}
		});
  }
	async search (query:string){
		return  this.prisma.product.findMany({
			where:{
				name:{
						contains:query?.toLowerCase(),
						mode:'insensitive'
				},	
			}
		})
		// .then(products => {
		// 	return  products.reduce((acc, product) => {
		// 		if (!acc[product.categoryId]) {
		// 			acc[product.categoryId] = [];
		// 		}
		// 		acc[product.categoryId].push(product);
		// 		return acc;
		// 	}, {} as Record<string, typeof products>);
		// });
	}
  findId(id: number) {
return  this.prisma.product.findFirst({
			where:{
				id:+id
			},
			include:{
				productVariant:{
					include:{
						parameter:true,
						sizes:true,
					}
				},
				ingredients:true,
				category:true
			},
			
		});
  }
	
  update(id: number, dto: ProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
