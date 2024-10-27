import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode } from '@nestjs/common';
import { PizzaTypeService } from './pizza-type.service';
import { PizzaTypeDto } from './dto/pizza-type.dto';


@Controller('pizza-type')
export class PizzaTypeController {
  constructor(private readonly pizzaTypeService: PizzaTypeService) {}
	@HttpCode(200)
  @Post('create')
  create(@Body() dto: PizzaTypeDto) {
    return this.pizzaTypeService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.pizzaTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzaTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: PizzaTypeDto) {
    return this.pizzaTypeService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pizzaTypeService.remove(+id);
  }
}
