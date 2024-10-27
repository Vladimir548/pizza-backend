import {  IsEnum } from 'class-validator'
enum TypePizza {
  TRADITIONAL='TRADITIONAL',
  THIN='THIN'
}
export class PizzaTypeDto {
@IsEnum(TypePizza)
		name:TypePizza
}
