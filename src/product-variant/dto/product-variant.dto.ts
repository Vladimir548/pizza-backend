
import {  TypeDough } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString  } from 'class-validator';
class SizesDto {
	@IsArray()
	@IsString()
	size:string
	@IsNumber()
	productVariantId:number;  
	@IsNumber()
	weight:number; 
	@IsNumber()
  price: number;
}


export class ProductVariantDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;
	@IsEnum(TypeDough)
	doughName:TypeDough
  @IsOptional()
  @IsNumber()
  parameterId?: number;
	@IsString()
  image: string;  
  @IsOptional()
  @IsArray()
  sizes?: SizesDto[];  
  @IsNumber()
  productId: number;
}