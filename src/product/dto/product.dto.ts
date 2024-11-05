import { Category } from '@prisma/client';
import { IsString,  IsOptional,IsInt,IsArray, IsEnum, IsNumber, isNumber } from 'class-validator'
export enum StatusOrder {
  TRADITIONAL = "TRADITIONAL",
  THIN = "THIN",
	
}
enum TypeProduct {
  PIZZA="PIZZA",
  DRINKS="DRINKS",
  SNACKS="SNACKS",
  DESSERTS="DESSERTS",
  COMBO="COMBO",
  SAUCES="SAUCES",
}
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

}
