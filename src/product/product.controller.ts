import { Body, Controller, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { TypeProduct } from 'prisma/__generated__'
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
  @Get('type/:type')
  findByType(@Param('type') type: TypeProduct, ) {
    return this.productService.findByType(type);
  }
 
  @HttpCode(200)
  @Get('sub-product')
  findSubProduct() {
    return this.productService.findAllSubProducts();
  }
  @HttpCode(200)
  @Get('by-ids')
  findIds(@Query('ids') ids: number[]) {
    return this.productService.getProductsByIds(ids);
  }
	@HttpCode(200)
  @Get('by-variant-and-size')
   findByVariantAndSize(@Query('productData') productData: {productId:number,variantId:number,sizeId:number}[]) {
    return  this.productService.findByVariantAndSizeProduct(productData);
  }
	@HttpCode(200)
  @Get('list-by-size-variant')
   getListBySizeAndVariant(@Param('params') params:{type:TypeProduct,size:number,variant:number}) {
    console.log('product controller', params)
    return  this.productService.getListBySizeAndVariant(params);
  }
	@HttpCode(200)
  @Get(':id')
  findId(@Param('id') id: string) {
    return this.productService.findId(+id);
  }
  

}
