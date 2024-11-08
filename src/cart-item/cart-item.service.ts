import { BadRequestException, Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart-item.dto';
import { PrismaService } from 'src/prisma.service';
import { CartService } from 'src/cart/cart.service';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Injectable()
export class CartItemService {
  constructor(
    private prisma: PrismaService,
    private cart: CartService,
    private ingredient: IngredientService,
  ) {}

  async create(dto: CartItemDto) {
    const ingredientsArray = dto.ingredientIds?.map(Number);

    const existingItemsIngredients = await this.prisma.cartItem.findMany({
      where: {
        cartId: Number(dto.cartId),
        productVariantId: Number(dto.productVariantId),
        sizeId: Number(dto.sizeId),
        productId: Number(dto.productId),
      },
      include: {
        ingredients: true,
      },
    });
    const matchIngredients = existingItemsIngredients.find(
      (item) =>
        JSON.stringify(
          item.ingredients.map((ingredient) => ingredient.id).sort(),
        ) === JSON.stringify(ingredientsArray.sort()),
    );
    if (matchIngredients) {
      if (matchIngredients.quantity < 10) {
        await this.prisma.cartItem.update({
          where: {
            id: Number(matchIngredients.id),
          },
          data: {
            quantity: matchIngredients.quantity + 1,
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
      return addCartItem;
    }
  }

  async findAll() {
    return await this.prisma.cartItem.findFirst({
      where: {
        productVariant: {
          doughName: 'THIN',
        },
      },
    });
  }

  async AllItemById(id: number) {
    return await this.prisma.cartItem.findMany({
      where: {
        cartId: Number(id),
      },
      include: {
        ingredients: true,
        productVariant: true,
        size: true,
        product: true,
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
  async calcItemPrice(cartId: number) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: Number(cartId),
      },
      include: {
        productVariant: true,
        size: true,
        ingredients: true,
      },
    });

    for (const item of cartItems) {
      const totalPriceIngredient = item.ingredients.reduce(
        (acc, val) => Number(acc) + Number(val),
        0,
      );
      const totalPrice =
        (item.size.price + totalPriceIngredient) * item.quantity;
      return totalPrice;
    }
  }
}
