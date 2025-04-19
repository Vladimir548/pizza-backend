import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from 'src/storage'
import { ProductVariantDto } from './dto/product-variant.dto'
import { ProductVariantService } from './product-variant.service'


@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}
	@HttpCode(200)
	@Post('create')
	@UseInterceptors(FileInterceptor('file', {
		storage:fileStorage
	}))
  create(@UploadedFile( new ParseFilePipe({
		validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
	})) file: Express.Multer.File,
  @Body() dto: ProductVariantDto
) {

	if (typeof dto.sizes === 'string') {
		dto.sizes = JSON.parse(dto.sizes);
}
	dto.image=file.path
  return this.productVariantService.create(dto);
}

   @HttpCode(200)
   @Get('by-variant-and-size')
    findByVariantAndSize(@Query('productData') productData: {productId:number,variantId:number,sizeId:number}[]) {
     return  this.productVariantService.findByVariantAndSizeProduct(productData);
   } 

}
