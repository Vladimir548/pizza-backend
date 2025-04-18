import { Module } from '@nestjs/common'
import { CartModule } from 'src/cart/cart.module'
import { IngredientModule } from 'src/ingredient/ingredient.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartItemController } from './cart-item.controller'
import { CartItemService } from './cart-item.service'


@Module({
  controllers: [CartItemController],
  providers: [CartItemService,PrismaService],
	imports:[CartModule,IngredientModule]
})
export class CartItemModule {}
