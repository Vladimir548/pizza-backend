import { Injectable } from '@nestjs/common'
import { DeliveryAddress } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class DeliveryAddressService {
  constructor (private prismaService:PrismaService) {}

  async create(dto:DeliveryAddress,userId:number) {
    const addressArray = await this.prismaService.deliveryAddress.findMany({
      where:{
        userId:Number(userId)
      }
    })
    if(dto.isDefault === true) {
     addressArray.map(async address => {
      if(address.isDefault === true){
        return await this.prismaService.deliveryAddress.updateMany({
          where:{
            userId:Number(userId)
          },
          data:{
            isDefault:false
          }
        })
      }
    })
  }
    return await this.prismaService.deliveryAddress.create({
      data:{
        address:dto.address,
        isDefault:dto.isDefault,
        userId:Number(userId)
      }
    });
  }

  async findById(userId:number) {
    return await this.prismaService.deliveryAddress.findMany({
      where:{
        userId:Number(userId)
      },
      orderBy:{
        id:'desc'
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryAddress`;
  }

  async changeDefaultAddress(userId: number,id:number) {
    const addressArray = await this.prismaService.deliveryAddress.findMany({
      where:{
        userId:Number(userId)
      }
    })

     await  Promise.all(addressArray.map( async address => {
      if(address.isDefault === true){
         return await this.prismaService.deliveryAddress.updateMany({
          where:{
            userId:Number(userId)
          },
          data:{
            isDefault:false
          }
        })
      }
    }))

      return await this.prismaService.deliveryAddress.update({
        where:{
          id:Number(id),
          userId:Number(userId)
        },
        data:{
          isDefault:true,
        }
      });
    }

 async update(userId: number,id:number, dto: DeliveryAddress) {
    return await this.prismaService.deliveryAddress.update({
      where:{
        id:Number(id),
        userId:Number(userId)
      },
      data:{
        address:dto.address,
      }
    });
  }

 async remove(id: number) {
    return await this.prismaService.deliveryAddress.delete({
      where:{
        id
      }
    })
  }
}
