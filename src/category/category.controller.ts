import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
	@HttpCode(200)
  @Post('create')
  create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }
	@HttpCode(200)
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
