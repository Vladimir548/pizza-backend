import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { CartService } from './cart.service'


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


@HttpCode(200)
  @Get('by/:id')
  allById(@Param('id') id: number) {
		
    return this.cartService.byId(id);
  }

}
