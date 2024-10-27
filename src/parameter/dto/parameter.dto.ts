import { IsString,IsEnum } from "class-validator";
import { EnumTypeProduct } from "src/enums/ETypeProduct";

export class ParameterDto {
	@IsString()
	parameter:string
	@IsEnum(EnumTypeProduct)
	typeProduct:EnumTypeProduct[]
}
