import { Injectable } from '@nestjs/common'

import { TypeProduct } from 'prisma/__generated__'

import { PrismaService } from 'src/prisma/prisma.service'
import { VariantTypeDto } from './dto/variant-type.dto'

@Injectable()
export class VariantTypesService {
  constructor (private prisma:PrismaService){}
  create(dto: VariantTypeDto) {
    return this.prisma.variantTypes.create({
      data:
      {
        value:dto.value,
        categories:{
          connect:dto.categories.map(id => ({id}))
      },
      typeProduct:dto.typeProduct
      }
    })
  }

 async findByType(type:TypeProduct) {
    return await this.prisma.variantTypes.findMany({
      where:{
        typeProduct:type
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} variantType`;
  }


  remove(id: number) {
    return `This action removes a #${id} variantType`;
  }
}
