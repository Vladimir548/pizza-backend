import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { DeliveryAddress } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'
import { DeliveryAddressService } from './delivery-address.service'

@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(private readonly deliveryAddressService: DeliveryAddressService) {}
@Authorization()
  @Post('create')
  create(@Body() dto:DeliveryAddress,@Authorized('id') userId: number) {

    return this.deliveryAddressService.create(dto,userId);
  }
  @Authorization()
  @Get('user')
  findById(@Authorized('id') userId: number) {
    return this.deliveryAddressService.findById(userId);
  }
  @Authorization()
  @Patch('change-default/:id')
  changeDefaultDelivery(@Authorized('id') userId: number,@Param('id') id: number) {
    return this.deliveryAddressService.changeDefaultAddress(userId,id);
  }

  @Authorization()
  @Patch('update/:id')
  update(@Authorized('id') userId: number,@Param('id') id: number, @Body() updateDeliveryAddressDto: DeliveryAddress) {
    return this.deliveryAddressService.update(userId,+id, updateDeliveryAddressDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.deliveryAddressService.remove(Number(id));
  }
}
