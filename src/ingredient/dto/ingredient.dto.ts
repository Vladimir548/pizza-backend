
import { IsString,  IsNumber, IsArray, IsInt } from 'class-validator'

export class IngredientDto {
	@IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

	@IsArray()
  @IsInt({ each: true })
	categories:number[]
}
