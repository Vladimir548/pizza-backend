import { TypeDough } from '@prisma/client'

export class ParamsDto {
  sizes: number[];
	ingredients:number[]
  priceFrom: number;
  priceTo: number;
	dough:TypeDough[]

 

}
