import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common'
import { ProportionDto } from './dto/proportion.dto'
import { ProportionService } from './proportion.service'


@Controller('proportion')
export class ProportionController {
  constructor(private readonly proportionService: ProportionService) {}
	@HttpCode(200)
  @Post('create')
  create(@Body() dto: ProportionDto) {
    return this.proportionService.create(dto);
  }

  @HttpCode(200)
  @Get('all')
  findAll() {
    return this.proportionService.findAll();
  }

  @HttpCode(200)
  @Get('by-type')
  findOne(@Query('categoryId') categoryId: number) {
    return this.proportionService.byType(Number(categoryId));
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() dto: ProportionDto) {
    console.log(id,dto)
    return this.proportionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proportionService.remove(+id);
  }
}
