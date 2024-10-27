import { TypeProduct } from '@prisma/client';
import { IsString,  IsNumber,IsEnum, IsArray } from 'class-validator'
import { EnumTypeProduct } from 'src/enums/ETypeProduct';

export class IngredientDto {
	@IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
	@IsArray()
	@IsEnum(TypeProduct,{ each: true })
	typeProduct:TypeProduct
}
