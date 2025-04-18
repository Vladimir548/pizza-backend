
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { TypeProduct } from 'prisma/__generated__'

export class ProductDto {
	@IsString()
  name: string;
	@IsEnum(TypeProduct)
	type:TypeProduct

  image: string;
	@IsOptional()
  @IsString()
  description?: string;

  categoryId: number;
	@IsOptional()
	@IsArray()
  ingredientIds: number[];
  @IsNumber()
  @IsOptional()
  parentId:number;

}