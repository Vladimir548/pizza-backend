import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Proportions, SubProduct, TypeProduct } from 'prisma/__generated__'
class SizesDto {
	@IsNumber()
	proportionId:Proportions
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

  quantity?: number;
  @IsOptional()
  parameterId?: number;

  image: string;  
  @IsOptional()
  sizes?: SizesDto[];  

  productId: number;
	@IsOptional()
	attributeName:string
	@IsOptional()

  subProduct: SubProduct[];
	@IsOptional()
	@IsNumber() 
	priceKit:number
  variantTypesId: number;
	@IsEnum(TypeProduct)
	@IsOptional()
  parentType?:TypeProduct ;
}
