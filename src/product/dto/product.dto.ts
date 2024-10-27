import { IsString,  IsOptional,IsInt,IsArray, IsEnum } from 'class-validator'
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

  @IsString()
  image: string;
	@IsOptional()
  @IsString()
  description?: string;
  @IsInt()
  categoryId: number;
	@IsEnum(TypeProduct)
	typeProduct:TypeProduct
	@IsOptional()
	@IsArray()
  ingredientIds: number[];

}
