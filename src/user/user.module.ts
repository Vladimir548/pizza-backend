import { Module } from '@nestjs/common'
import { CartService } from 'src/cart/cart.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,CartService],
})
export class UserModule {}
