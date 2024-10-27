import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterDto } from './dto/parameter.dto';
import { EnumTypeProduct } from 'src/enums/ETypeProduct';


@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}
	@HttpCode(200)
  @Post('create')
  create(@Body() dto: ParameterDto) {
    return this.parameterService.create(dto);
  }
	@HttpCode(200)
  @Get('all')
  findAll() {
    return this.parameterService.findAll();
  }
	@HttpCode(200)
  @Get('by-type')
  findByType(@Query('type') type:EnumTypeProduct) {
    return this.parameterService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parameterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ParameterDto) {
    return this.parameterService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parameterService.remove(+id);
  }
}
