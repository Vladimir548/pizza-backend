import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { CartService } from './../cart/cart.service'

import { AuthMethod } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  public constructor(
    private readonly PrismaService: PrismaService,
    private readonly CartService: CartService

  ) {}

  public async findById(id: number) {
    const user = await this.PrismaService.user.findUnique({
      where: {
        id:Number(id),
      },
      include: {
        accounts: true,
        cart:{
          select:{
            id:true
          }
        },
        deliveryAddress:true
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенные данные.',
      );
    }
    return user;
  }

  public async findByEmail(email: string) {
    return await this.PrismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
        cart:true,
        deliveryAddress:true
      },
    });
  }

  public async create(
    email: string,
    password: string,
    fullName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const createUser =  await this.PrismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        fullName,
        picture,
        method,
        isVerified,
        cart:{
          create:{}
        },
      },
      include: {
        accounts: true,
        cart:true,
        deliveryAddress:true
      },
    });

    return createUser

  }
  public async update(userId: number, dto: UpdateUserDto) {
    return await this.PrismaService.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        email: dto.email,
        fullName: dto.fullName,
        phone:String(dto.phone),
      },
    });
  }
}
