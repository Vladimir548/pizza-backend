import { Module } from '@nestjs/common'
import { CartService } from 'src/cart/cart.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { DeliveryAddressController } from './delivery-address.controller'
import { DeliveryAddressService } from './delivery-address.service'

@Module({
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService,PrismaService,UserService,CartService],
})
export class DeliveryAddressModule {}
