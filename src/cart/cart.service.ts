import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { getDeliveryPrice } from './delivery-price'

@Injectable()
export class CartService {

	constructor (private readonly prisma:PrismaService){}

 async create(id:number) {
	
    return await this.prisma.cart.create({
			data:{
				userId:Number(id)
			}
		});
  }

  async byId(userId:number) {
    return await this.prisma.cart.findUnique({
			where:{
				userId:Number(userId)
			},
			include:{
				items:{
					orderBy:{
						createdAt:'desc'
					},
					include:{
						subCartItem:{
							include:{
								ingredients:true,
								product:true,
								productVariant:true,
								size:true
							}
						}
					}
				},
				_count:true
			}
		});
  }
  async findOne(id: number) {
    return await this.prisma.cart.findUnique({
			where:{
				userId:id
			},
		})
  }

	

 async updatePrice(cartId: number) {
		const getAllItems = await this.prisma.cart.findUnique({
			where:{
				id:Number(cartId)
			},
			include:{
				items:{
					include:{
						subCartItem:{
							include:{
								ingredients:true,
								size:true,
							}
						}
					}
				}
			}
		})
			let amountGoods = 0
		for(const item of getAllItems.items){

			item.subCartItem.map(cartItem => {
				const amountPriceIngredients = cartItem.ingredients.reduce((acc,val) =>
					Number(acc) + Number(val.price),
			 0)
 
			 const totalPriceItem = (cartItem.size.price + amountPriceIngredients)*item.quantity	
 
			 amountGoods  +=totalPriceItem
		})

			
		}
		const priceDelivery = getDeliveryPrice(amountGoods) ?? 0
				const totalPrice= Number(amountGoods) + Number(priceDelivery)
		return await this.prisma.cart.update({
			where:{
				id:Number(cartId)
			},
			data:{
				totalAmount:Number(totalPrice) ?? 0,
				amountGoods:Number(amountGoods)
			}
		})
  }

}
