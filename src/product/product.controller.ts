import { Body, Controller, Delete, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ParamsDto } from 'src/params-dto'
import { fileStorage } from 'src/storage'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
	@HttpCode(200)
  @Post('create')
  @UseInterceptors(FileInterceptor('file', {
		storage:fileStorage
	}))
  create(@UploadedFile( new ParseFilePipe({
		validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
	})) file: Express.Multer.File,@Body() dto: ProductDto) {

		dto.image = file.path
    return this.productService.create(dto);
  }
	@HttpCode(200)
  @Get('all')
  findAll() {
    return this.productService.findAll();
  }
	@HttpCode(200)
  @Get('search')
  search(@Query('query') query:string) {
    return this.productService.search(query);
  }
	@HttpCode(200)
  @Get('max-price')
  findMaxPrice(@Query('categoryId') categoryId:number) {
    return this.productService.findMaxPrice(categoryId);
  }
	@HttpCode(200)
  @Get('category/:id')
  findByCategory(@Param('id') id: string, @Query('params') params?: ParamsDto) {
    return this.productService.findByCategory(+id,params);
  }
	@HttpCode(200)
  @Get(':id')
  findId(@Param('id') id: string) {
    return this.productService.findId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
