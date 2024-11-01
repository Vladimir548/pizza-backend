
import { Category } from '@prisma/client';
import { IsString,  IsNumber, IsArray } from 'class-validator'

export class IngredientDto {
	@IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

	@IsArray()
	categories:Category[]
}
