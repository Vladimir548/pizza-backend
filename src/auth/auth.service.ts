import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {

	constructor (
		private readonly usersService:UsersService,
		private readonly cartService:CartService,
		private readonly jwtService:JwtService,
		private readonly configService:ConfigService
	){}
 async register({ email, password,fullName,role }: RegisterDto, res: Response) {
    const hashedPassword = await hash(password)

		const createdUser = await this.usersService.createOne({
			 email:email, 
			 hashedPassword:hashedPassword,
			 fullName:fullName,
			 role:role,
			 })

			const getCartId = await this.cartService.findOne(createdUser.id)
		
				return await this.generateTokens(createdUser.id, res,getCartId.id)
			
		
  }
	async googleAuth(email: string,provider:string, res: Response) {
		const userByEmail = await this.usersService.getOne({ email })

		if (userByEmail) {
			 return  await this.generateTokens(userByEmail.id, res,userByEmail.id)
		}

		const createdUser = await this.usersService.createOne({ 
			email:email,
			provider:provider
		 })

		
		return await this.generateTokens(createdUser.id, res,createdUser.cart.id)
	}
  async generateTokens(userId: number, res: Response,cartId:number) {
	
		const accessToken = await this.jwtService.signAsync(
			{ userId,cartId },
			{
				secret: this.configService.getOrThrow("JWT_ACCESS_SECRET"),
				expiresIn: this.configService.getOrThrow("JWT_ACCESS_EXPIRES")
			}
		)

		const refreshToken = await this.jwtService.signAsync(
			{ userId },
			{
				secret: this.configService.getOrThrow("JWT_REFRESH_SECRET"),
				expiresIn: this.configService.getOrThrow("JWT_REFRESH_EXPIRES")
			}
		)
		const currentDate = new Date()
		const expiresRefresh = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
		const expiresAccess =  new Date(currentDate.getTime() + 1 * 60 * 60 * 1000)
		
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge:expiresRefresh.getTime() - currentDate.getTime()
		})
		
		res.cookie("accessToken", accessToken,{
			maxAge:expiresAccess.getTime() - currentDate.getTime()
		})

		return accessToken
	}

	async validateUser(email: string, password: string) {
		const userByEmail = await this.usersService.getOne({ email })

		if (!userByEmail) {
			return null
		}

		if (!userByEmail.password) {
			throw new BadRequestException(
				"Вы зарегистрированы через одну из сетей"
			)
		}

		const isValidPw = await verify(userByEmail.password, password)

		if (!isValidPw) {
			return null
		}

		return userByEmail
	}
}
