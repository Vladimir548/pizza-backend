
import { IsArray, IsInt, IsOptional } from 'class-validator'
import { TypeProduct } from 'prisma/__generated__'
export enum StatusOrder {
  TRADITIONAL = "TRADITIONAL",
  THIN = "THIN",
	
}
export class CartItemDto {
  id: number;
	@IsInt()
  cartId: number;

	typeProduct:TypeProduct
  @IsInt()
  @IsOptional()
  quantity: number;

  productId: number;

  productVariantId: number;

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




