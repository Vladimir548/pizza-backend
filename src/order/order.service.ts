import { Injectable } from '@nestjs/common'
import { OrderStatus } from 'prisma/__generated__'
import { CartItemService } from 'src/cart-item/cart-item.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'


@Injectable()
export class OrderService {
	constructor (
    private readonly prisma:PrismaService,
    private readonly cartItem:CartItemService

  ){}
 async create(dto: CreateOrderDto,userId:number) {
    await this.prisma.order.create({
			data:{
				address:dto.address,
				email:dto.email,
				firstName:dto.firstName,
				phone:dto.phone.toString(),
				status:OrderStatus.PENDING,
				totalAmount:dto.totalAmount,
				comment:dto.comment ?? null,
				items:dto.items,
				userId:userId,
			}
		})

    await this.cartItem.clear(userId)
  }

  findAll() {
    return `This action returns all order`;
  }

  async findId(id: number) {
    return await this.prisma.order.findMany({
      where:{
        userId:Number(id)
      }, 
      orderBy:{
        createdAt:'desc'
      }
    })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
