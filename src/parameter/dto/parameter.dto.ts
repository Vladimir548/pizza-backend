import { Category } from "@prisma/client";
import { IsString, IsArray } from "class-validator";


export class ParameterDto {
	@IsString()
	parameter:string
	@IsArray()
	categories:Category[]
}
