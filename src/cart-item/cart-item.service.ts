import { BadRequestException, Injectable } from '@nestjs/common'
import { CartService } from 'src/cart/cart.service'
import { AllTypeWithSubProduct } from 'src/data'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartItemDto } from './dto/cart-item.dto'

@Injectable()
export class CartItemService {
  constructor(
    private prisma: PrismaService,
    private cart: CartService,
  ) {}

  async create(dto: CartItemDto) {
    const ingredientsArray= dto.ingredientIds?.map(Number)
    const existingItemsIngredients = await this.prisma.cartItem.findMany({
			where: {
				cartId: Number(dto.cartId),
				productVariantId: Number(dto.productVariantId),
				sizeId: Number(dto.sizeId),
				productId: Number(dto.productId),
			},
			include:{
				ingredients:true,
        cartSubProduct:true,
        productVariant:{
          include:{
            subProduct:true
          }
        },
        product:true
			}
		})

    let getProductIdIngredients = 0
    let getQuantityIngredients = 1
    const matchIngredients = existingItemsIngredients.some(item => {
      getProductIdIngredients = item.id
      getQuantityIngredients = item.quantity

      return (JSON.stringify(item.ingredients.map(ingredient => ingredient.id).sort()) === JSON.stringify(ingredientsArray.sort()))})

    if(AllTypeWithSubProduct.includes(dto?.typeProduct)){
      let getProductId = 0;
      let getQuantity = 1
     const isProduct = existingItemsIngredients.some(product => {

      const JsonDto = JSON.stringify(dto.customSubProduct.sort((a,b) => a.index - b.index))
      const JsonProduct = JSON.stringify(product.cartSubProduct.map(sub => ({subProductId:sub.subProductId,variantId:sub.variantId,sizeId:sub.sizeId,index:sub.index})).sort((a,b) => a.index - b.index))
      getProductId = product.id
      getQuantity = product.quantity
      return(
    
     (product.productId === dto.productId && product.productVariantId === dto.productVariantId && JsonProduct === JsonDto)
    )
    } )

    if (isProduct) {
      if (getQuantity < 10) {
        await this.prisma.cartItem.update({
          where: { id: Number(getProductId) },
          data: { quantity: getQuantity + 1 }
        });
        await this.cart.updatePrice(dto.cartId);
        return existingItemsIngredients;
      }
    }
    
    if (!isProduct) {
      const addCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: Number(dto.cartId),
          productVariantId:dto.productVariantId ? Number(dto.productVariantId) : null,
          sizeId: dto.sizeId ? Number(dto.sizeId) : null,
          productId: Number(dto.productId),
          quantity: 1,
          ingredients: {
            connect: ingredientsArray?.map((id) => ({ id })),
          },
        },
        include: {
          ingredients: true,
        },
      });
    
      console.log(' dto.customSubProduct', dto.customSubProduct)
      const createSubProduct = await Promise.all(
        dto.customSubProduct.map(product =>
          this.prisma.cartSubProduct.create({
            data: {
              cartItemId: addCartItem.id,
              subProductId: product.subProductId,
              sizeId: product.sizeId,
              variantId: product.variantId,
              index: product.index
            }
          }))
      );
    
      if (addCartItem.cartId) {
        await this.cart.updatePrice(addCartItem.cartId);
      }
      return { addCartItem, createSubProduct };
    }
  } else{
    if (matchIngredients) {
      if (getQuantityIngredients < 10) {
        await this.prisma.cartItem.update({
          where: { id: Number(getProductIdIngredients) },
          data: { quantity: getQuantityIngredients + 1 }
        });
        await this.cart.updatePrice(dto.cartId);
        return existingItemsIngredients;
      } else {
        throw new BadRequestException('Достигнуто максимальное количество');
      }
    }
    const addCartItem = await this.prisma.cartItem.create({
      data: {
        cartId: Number(dto.cartId),
        productVariantId: Number(dto.productVariantId),
        sizeId: Number(dto.sizeId),
        productId: Number(dto.productId),
        quantity: 1,
        ingredients: {
          connect: ingredientsArray?.map((id) => ({ id })),
        },
      },
      include: {
        ingredients: true,
      },
    });
    if (addCartItem.cartId) {
      await this.cart.updatePrice(addCartItem.cartId);
    }
    return addCartItem
  }
  }

  async AllItemById(id: number) {
    return await this.prisma.cartItem.findMany({
      where: {
        cartId: Number(id),
      },
        include:{
          product:true,
          size:true,
          ingredients:true,
          productVariant:true,
        }
    });
  }

  async remove(id: number, cartId: number) {
    const removeItem = await this.prisma.cartItem.delete({
      where: {
        id: Number(id),
        cartId: Number(cartId),
      },
    });

    await this.cart.updatePrice(cartId);

    return removeItem;
  }
  async removeAll(cartId: number) {
    const removeItem = await this.prisma.cartItem.deleteMany({
      where: {
        cartId: Number(cartId),
      },
    });

    await this.cart.updatePrice(cartId);

    return removeItem;
  }

  async changeQuantity(id: number, cartId: number, quantity: number) {
    const changeQuantity = await this.prisma.cartItem.update({
      where: {
        id: Number(id),
        cartId: Number(cartId),
      },
      data: {
        quantity: Number(quantity),
      },
    });

    await this.cart.updatePrice(cartId);

    return changeQuantity;
  }
  async clear(userId: number) {
    const getCartId = await this.prisma.cart.findUnique({
      where:{
        userId:Number(userId)
      },
      select:{
        id:true
      }
    })

		 await this.prisma.cartItem.deleteMany({
			where:{
				cartId:Number(getCartId.id)
			},
		})
    await this.cart.updatePrice(getCartId.id);
	}
}
