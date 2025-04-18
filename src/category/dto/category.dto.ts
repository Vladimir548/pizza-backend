
import { IsEnum, IsString, } from 'class-validator';
import { TypeProduct } from 'prisma/__generated__';

export class CategoryDto {
	@IsString()
  name: string;
  @IsString()
  slug: string;
	@IsEnum(TypeProduct)
	type:TypeProduct
}
