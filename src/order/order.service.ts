import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
	constructor (private readonly prisma:PrismaService){}
 async create(dto: CreateOrderDto) {
    return await this.prisma.order.create({
			data:{
				address:dto.address,
				email:dto.email,
				firstName:dto.firstName,
				phone:dto.phone.toString(),
				status:OrderStatus.PENDING,
				totalAmount:dto.totalAmount,
				comment:dto.comment,
				items:dto.items,
				lastName:dto.lastName,
				userId:dto.userId
			}
		})
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
