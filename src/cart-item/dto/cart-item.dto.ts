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
  @IsInt()
  productId: number;
  @IsInt()
  productVariantId: number;
	@IsInt()
  sizeId: number;
  @IsOptional()
	@IsArray()
  ingredientIds: number[];
  @IsOptional()
	@IsArray()
  customSubProduct:CartSubProduct[]
}
export class CartSubProduct {
	@IsInt()
  subProductId: number;
  @IsInt()
  variantId: number;
	@IsInt()
  sizeId: number;
	@IsInt()
  @IsOptional()
  cartItemId?: number;
	@IsInt()
  index: number;
}




