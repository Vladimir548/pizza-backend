import { Controller, Get, Post, Body, Param, Delete,HttpCode } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItemDeleteDto } from './dto/delete-item';


@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
	@HttpCode(200)
  @Post('add')
  create(@Body() createCartItemDto: CartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }
	@HttpCode(200)
  @Get('all/:id')
 async AllItemById(@Param('id') id: number) {
    return await this.cartItemService.AllItemById(id);
  }

	@HttpCode(200)
  @Post('delete')
  remove(@Body() dto:CartItemDeleteDto) {
    return this.cartItemService.remove(dto.id,dto.cartId);
  }
	@HttpCode(200)
  @Post('delete/all')
  removeAll(@Body() body: { id: number }) {
    return this.cartItemService.removeAll(body.id);
  }
	@HttpCode(200)
  @Post('change-quantity')
  changeQuantity(@Body() {id,cartId,quantity}:CartItemDto) {
    return this.cartItemService.changeQuantity(id,cartId,quantity);
  }
}
