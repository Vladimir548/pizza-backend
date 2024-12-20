import { BadRequestException, Injectable } from '@nestjs/common'
import { CartService } from 'src/cart/cart.service'
import { IngredientService } from 'src/ingredient/ingredient.service'
import { PrismaService } from 'src/prisma.service'
import { CartItemDto } from './dto/cart-item.dto'

@Injectable()
export class CartItemService {
  constructor(
    private prisma: PrismaService,
    private cart: CartService,
    private ingredient: IngredientService,
  ) {}

  async create(dto: CartItemDto) {
    const existingItemsIngredients = await this.prisma.cartItem.findFirst({
      where: {
        cartId: Number(dto.cartId),
        typeProduct:dto.typeProduct,
      
      },
      include:{
        subCartItem:{
          include:{
            ingredients:true
          }
        }
      }
     
    });
    const matchSubCartItem = existingItemsIngredients?.subCartItem.find((item) => {
      return (
        item.productId === Number(item.productId) &&
        item.productVariantId === Number(item.productVariantId) &&
        item.sizeId === Number(item.sizeId) 
      );
    });
    if (matchSubCartItem) {
      if (matchSubCartItem.quantity < 10) {
        await this.prisma.cartItem.update({
          where: {
            id: Number(matchSubCartItem.id),
          },
          data: {
            quantity: matchSubCartItem.quantity + 1,
          },
        });
        await this.cart.updatePrice(dto.cartId);

        return existingItemsIngredients;
      } else {
        throw new BadRequestException('Достигнуто максимальное количество');
      }
    } else {
      const addCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: Number(dto.cartId),
          typeProduct:dto.typeProduct,
          subCartItem:{
            create:dto.subCartItem.map(item => ({
              productId:item.productId,
              productVariantId:item.productVariantId,
              sizeId:item.sizeId,
              quantity:item.quantity,

              ingredients:{
                connect:item.ingredientIds.map(id => ({id:Number(id)}))
              },
            }))
          }
        },
      });

      if (addCartItem.cartId) {
        await this.cart.updatePrice(addCartItem.cartId);
      }
      return addCartItem;
    }
  }

  // async findAll() {
  //   return await this.prisma.cartItem.findFirst({
  //     where: {
  //       productVariant: {
  //         doughName: 'THIN',
  //       },
  //     },
  //   });
  // }

  async AllItemById(id: number) {
    return await this.prisma.cartItem.findMany({
      where: {
        cartId: Number(id),
      },
      include: {
       subCartItem:{
        include:{
          product:true,
          size:true,
          ingredients:true,
          productVariant:true,
        }
       },
      },
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
  // async calcItemPrice(cartId: number) {
  //   const cartItems = await this.prisma.cartItem.findMany({
  //     where: {
  //       cartId: Number(cartId),
  //     },
  //     include: {
  //       productVariant: true,
  //       size: true,
  //       ingredients: true,
  //     },
  //   });

  //   for (const item of cartItems) {
  //     const totalPriceIngredient = item.ingredients.reduce(
  //       (acc, val) => Number(acc) + Number(val),
  //       0,
  //     );
  //     const totalPrice =
  //       (item.size.price + totalPriceIngredient) * item.quantity;
  //     return totalPrice;
  //   }
  // }
}
