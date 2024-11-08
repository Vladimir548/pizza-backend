
import {  Proportions, TypeDough } from '@prisma/client';
import { IsArray, IsEnum,  IsNumber, IsOptional, IsString  } from 'class-validator';
class SizesDto {
	@IsNumber()
	sizeId:Proportions
	@IsNumber()
	productVariantId:number;  
	@IsString()
	weight:string; 
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