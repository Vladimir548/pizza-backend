
import { IsString, IsArray } from "class-validator";


export class ParameterDto {
	@IsString()
	parameter:string
	@IsArray()
	categories:number[]
}
