import { BadRequestException,  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user-dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

	constructor (private prismaService:PrismaService){}

  async createOne(dto: CreateUserDto) {

		const createdUser = await this.prismaService.user.create({
			data: {
				email:dto.email,
				password:dto?.hashedPassword,
				fullName:dto?.fullName,
			},
			include:{
				cart:{
					select:{
						id:true
					}
				}
			}
		})
		 await this.prismaService.cart.create({
			data:{
				userId:Number(createdUser.id)
			}
		})
		return createdUser
	}

	async getOne({ id, email }: GetUserDto) {
		if (!id && !email) {
			throw new BadRequestException()
		}

		const user = await this.prismaService.user.findFirst({
			where: { id, email }
		})

		return user
	}
}
