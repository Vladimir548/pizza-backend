import { Controller, Post ,  UseInterceptors,
  UploadedFile, ParseFilePipe,HttpCode,Param,Get,
  MaxFileSizeValidator,Body,Patch,Delete, } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ProductVariantDto } from './dto/product-variant.dto';
import {  FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/storage';


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

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductVariantDto) {
    return this.productVariantService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(+id);
  }
}
