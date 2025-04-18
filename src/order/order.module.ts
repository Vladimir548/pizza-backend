import { Module } from '@nestjs/common'
import { CartItemService } from 'src/cart-item/cart-item.service'
import { CartService } from 'src/cart/cart.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService,PrismaService,UserService,CartService,CartItemService],
})
export class OrderModule {}
