import { IsString,  IsOptional,IsInt,IsArray, IsEnum, IsNumber } from 'class-validator'
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
export class CartItemDto {
	@IsInt()
  id: number;
	@IsInt()
  cartId: number;
	@IsInt()
  productId: number;
  @IsInt()
  productVariantId: number;
	@IsInt()
  sizeId: number;
	@IsInt()
  quantity: number;
	@IsEnum(TypeProduct)
	typeProduct:TypeProduct
	@IsOptional()
	@IsArray()
  ingredientIds: number[];

}
