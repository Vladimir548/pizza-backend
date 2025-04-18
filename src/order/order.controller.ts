import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
 @Authorization()
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto,@Authorized('id') userId: number) {
    return this.orderService.create(createOrderDto,userId);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Authorization()
  @Get('user')
  findId(@Authorized('id') userId: number) {
    return this.orderService.findId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
