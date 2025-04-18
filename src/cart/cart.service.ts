import { Injectable } from '@nestjs/common'

import { Prisma, TypeProduct } from 'prisma/__generated__'
import { AllTypeWithSubProduct } from 'src/data'
import { PrismaService } from 'src/prisma/prisma.service'
import { getDeliveryPrice } from './delivery-price'
type CartItem = Prisma.CartItemGetPayload<{
  include: {
    ingredients: true;
    size: true;
    product: true;
    productVariant: {
      include: {
        subProduct: {
          include: {
            size: true;
          };
        };
      };
    };
    cartSubProduct: {
      include: {
        size: true;
      };
    };
  };
}>;

type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        ingredients: true;
        size: true;
        product: true;
        productVariant: {
          include: {
            subProduct: {
              include: {
                size: true;
              };
            };
          };
        };
        cartSubProduct: {
          include: {
            size: true;
          };
        };
      };
    };
  };
}>;
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
								ingredients:true,
								product:true,
								productVariant:{
									include:{
										productAttribute:{
											include:{
												variantTypes:true
											}
										},
										parentSubProduct:true,
										subProduct:{
											include:{
												product:true,
												size:{
													include:{
														proportion:true
													}
												},
												variant:{
													include:{
														productAttribute:{
															include:{
																variantTypes:true
															}
														},

													}
												}
											}
										}
									}
								},
								size:{
									include:{
										proportion:true
									}
								},
								cartSubProduct:{
									include:{
										size:{
											include:{
												proportion:true,
											},	
										},
										variant:{
											include:{
												productAttribute:{
													include:{
														variantTypes:true
													}
												}
											}
										},
										product:true
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
		const getAllItems:CartWithItems = await this.prisma.cart.findUnique({
			where:{
				id:Number(cartId)
			},
			include:{
				items:{
							include:{
								ingredients:true,
								size:true,
								product:true,
								productVariant:{
									include:{
										subProduct:{
											include:{
												size:true
											}
										}
									}
								},
								cartSubProduct:{
									include:{
										size:true
									}
								}
							}
				}
			}
		})

		function calculateSubProductPrice(item: CartItem): number {
			if (item.product.type === TypeProduct.PIZZA_HALF) {
					return item.cartSubProduct.reduce((sum, acc) => {
							return sum + acc.size.price / 2;
					}, 0) * item.quantity;
			}
			return item.productVariant.subProduct.reduce((total, product, index) => {
					if (item.cartSubProduct?.some(subProduct => subProduct.index === index)) {
							const findProduct = item.cartSubProduct.find(subProduct => subProduct.index === index).size.price;
							return total + findProduct;
					} else {
							return total + product.size.price;
					}
			}, 0) * item.quantity;
	}
	function calculateProductPrice(item:CartItem) {
			const amountPriceIngredients = item.ingredients.reduce(
					(acc, ingredient) => acc + Number(ingredient.price),
					0
			);
			return (item.size.price + amountPriceIngredients) * item.quantity;
	}
	
	function calculateAmountGoods(getAllItems:CartWithItems) {
			let amountGoods = 0;
	
			getAllItems.items.forEach((item:CartItem) => {
					if (AllTypeWithSubProduct.includes(item?.product.type)) {
							if (item.cartSubProduct) {
									amountGoods += calculateSubProductPrice(item);
							} else {
									const totalPriceItem = item.productVariant.priceKit * item.quantity;
									amountGoods += totalPriceItem;
							}
					} else {
							amountGoods += calculateProductPrice(item);
					}
			});
			return amountGoods;
	}

	const totalAmount = calculateAmountGoods(getAllItems);
		const priceDelivery = getDeliveryPrice(totalAmount) ?? 0
				const totalPrice= Number(totalAmount) + Number(priceDelivery)
		return await this.prisma.cart.update({
			where:{
				id:Number(cartId)
			},
			data:{
				totalAmount:Number(totalPrice) ?? 0,
				amountGoods:Number(totalAmount)
			}
		})
  }

}
