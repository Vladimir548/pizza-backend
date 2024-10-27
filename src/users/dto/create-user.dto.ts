import {  UserRole } from "@prisma/client"

export class CreateUserDto {
	email: string
	fullName?:string
	hashedPassword?: string
	role?:UserRole
	provider?:string
}