
import { Proportions, SubProduct } from '@prisma/client'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'
class SizesDto {
	@IsNumber()
	sizeId:Proportions
	@IsNumber()
	productVariantId:number;  
	@IsString()
	weight:string; 
	@IsNumber()
  price: number;
	@IsArray()
  ingredients: number[];
}


export class ProductVariantDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;
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
	@IsString()
	@IsOptional()
	attributeName:string
	@IsOptional()
	@IsArray()
  productsSub: SubProduct[];
	@IsOptional()
	@IsNumber() 
	priceKit:number

}