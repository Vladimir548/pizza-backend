import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';

import { TypeProduct } from 'prisma/__generated__';
import { VariantTypeDto } from './dto/variant-type.dto';
import { VariantTypesService } from './variant-types.service';

@Controller('variant-types')
export class VariantTypesController {
  constructor(private readonly variantTypesService: VariantTypesService) {}
@HttpCode(200)
  @Post('create')
  create(@Body() createVariantTypeDto: VariantTypeDto) {
    return this.variantTypesService.create(createVariantTypeDto);
  }
  @HttpCode(200)
  @Get('by-type')
  findByType(@Query('type') type: TypeProduct) {
    return this.variantTypesService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantTypesService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantTypesService.remove(+id);
  }
}
