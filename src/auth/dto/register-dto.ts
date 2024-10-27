import { UserRole } from "@prisma/client"
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegisterDto {
	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	password: string
	@IsString()
	fullName:string

	@IsEnum(UserRole)
	role:UserRole

}