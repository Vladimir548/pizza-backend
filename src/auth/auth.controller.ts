import { CartService } from 'src/cart/cart.service';
import {
	Controller,
	Post,
	Body,
	ParseIntPipe,
	Res,
	UseGuards,
	Get,
	Req,
} from "@nestjs/common"
import { AuthService } from './auth.service';
import { RegisterDto } from "./dto/register-dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "./utils/decorators/current-user";
import { GoogleGuard } from "./guards/google.guard";
import { Profile } from "passport-google-oauth20"


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
							private readonly cartService:CartService
	) {}
	
	@Post("register")
	async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
		return await this.authService.register(dto, res)
	}

	@UseGuards(AuthGuard("local"))
	@Post("login")
	async login(
		@CurrentUser("id", ParseIntPipe) userId: number,
		
		@Res({ passthrough: true }) res: Response
	) {
		const getCartId = await this.cartService.findOne(userId)
		return await this.authService.generateTokens(userId, res,getCartId.id)
	}

	@UseGuards(AuthGuard("jwt-refresh"))
	@Post("refresh")
	async refresh(
		@CurrentUser("id", ParseIntPipe) userId: number,
		@Res({ passthrough: true }) res: Response
	) {
		const getCartId = await this.cartService.findOne(userId)
		return await this.authService.generateTokens(userId, res,getCartId.id)
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		res.cookie("refreshToken", "")
	}
	@UseGuards(GoogleGuard)
	@Get("google")
	google() {}

	@UseGuards(GoogleGuard)
	@Get("google/callback")
	async googleCallback(
		@Req() req: Request & { user: Profile },
		@Res({ passthrough: true }) res: Response
	) {
		return await this.authService.googleAuth(req.user._json.email,req.user.provider, res)
	}
}
