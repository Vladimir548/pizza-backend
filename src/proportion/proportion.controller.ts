import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ProportionService } from './proportion.service';
import { ProportionDto } from './dto/proportion.dto';
import { UpdateProportionDto } from './dto/update-proportion.dto';
import { TypeProduct } from '@prisma/client';

@Controller('proportion')
export class ProportionController {
  constructor(private readonly proportionService: ProportionService) {}
	@HttpCode(200)
  @Post('create')
  create(@Body() dto: ProportionDto) {
    return this.proportionService.create(dto);
  }

  @Get()
  findAll() {
    return this.proportionService.findAll();
  }
  @HttpCode(200)
  @Get('by-type')
  findOne(@Query('type') type: TypeProduct) {
    return this.proportionService.byType(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProportionDto: UpdateProportionDto) {
    return this.proportionService.update(+id, updateProportionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proportionService.remove(+id);
  }
}
