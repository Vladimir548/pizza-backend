import { TypeProduct } from '@prisma/client'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDto {
	@IsString()
  name: string;
	@IsEnum(TypeProduct)
	type:TypeProduct
  @IsString()
  image: string;
	@IsOptional()
  @IsString()
  description?: string;
	@IsNumber()
  categoryId: number;
	@IsOptional()
	@IsArray()
  ingredientIds: number[];
  @IsNumber()
  @IsOptional()
  parentId:number;

}