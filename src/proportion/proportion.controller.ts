import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProportionService } from './proportion.service';
import { ProportionDto } from './dto/proportion.dto';
import { UpdateProportionDto } from './dto/update-proportion.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proportionService.findOne(+id);
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
