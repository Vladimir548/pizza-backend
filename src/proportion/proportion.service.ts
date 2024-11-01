import { Injectable } from '@nestjs/common';
import { ProportionDto } from './dto/proportion.dto';
import { UpdateProportionDto } from './dto/update-proportion.dto';
import { PrismaService } from 'src/prisma.service';
import { TypeProduct } from '@prisma/client';


@Injectable()
export class ProportionService {

	constructor (private prisma:PrismaService){}

 async create(dto: ProportionDto) {
    return await this.prisma.proportions.create({
			data:{
				proportion:dto.proportion,
				typeProduct:dto.typeProduct
			}
		})
  }

  findAll() {
    return `This action returns all proportion`;
  }

   async byType(type: TypeProduct) {
    return await this.prisma.proportions.findMany({
      where:{
        typeProduct:{
          has:type
        }
      }
    });
  }

  update(id: number, updateProportionDto: UpdateProportionDto) {
    return `This action updates a #${id} proportion`;
  }

  remove(id: number) {
    return `This action removes a #${id} proportion`;
  }
}
