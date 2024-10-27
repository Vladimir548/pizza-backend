import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UsersService } from "src/users/users.service"
import { JwtPayload } from "../utils/types/jwt-payload"
import { Request } from "express"


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: (req:Request)=>{
						return req.cookies['refreshToken']
			},
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow("JWT_REFRESH_SECRET")
		})
	}

	async validate({ userId }: JwtPayload) {
	
		const user = await this.usersService.getOne({ id: userId })
		if (!user) {
			throw new UnauthorizedException()
		}

		return user
	}
}