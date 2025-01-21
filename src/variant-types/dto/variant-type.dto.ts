import { TypeProduct } from '@prisma/client'
export class VariantTypeDto {
	value:string
	categories:number[]
	typeProduct:TypeProduct
}
