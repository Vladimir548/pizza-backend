import { Controller, Get,  Param,  HttpCode } from '@nestjs/common';
import { CartService } from './cart.service';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


@HttpCode(200)
  @Get('by/:id')
  allById(@Param('id') id: number) {
		
    return this.cartService.byId(id);
  }
	// @HttpCode(200)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }



}
