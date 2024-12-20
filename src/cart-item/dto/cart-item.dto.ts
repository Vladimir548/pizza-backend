import { TypeProduct } from '@prisma/client'
import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator'
export enum StatusOrder {
  TRADITIONAL = "TRADITIONAL",
  THIN = "THIN",
	
}
export class CartItemDto {
	@IsInt()
  id: number;
	@IsInt()
  cartId: number;
	@IsEnum(TypeProduct)
	typeProduct:TypeProduct
  @IsInt()
  @IsOptional()
  quantity: number;
	subCartItem:SubCartItemDto[]

}

class SubCartItemDto {
	@IsInt()
  productId: number;
  @IsInt()
  productVariantId: number;
	@IsInt()
  sizeId: number;
	@IsInt()
  quantity: number;
  @IsOptional()
	@IsArray()
  ingredientIds: number[];
}
