import { TypeProduct } from '@prisma/client';
import { IsEnum, IsString, } from 'class-validator'

export class CategoryDto {
	@IsString()
  name: string;
  @IsString()
  slug: string;
	@IsEnum(TypeProduct)
	type:TypeProduct
}
