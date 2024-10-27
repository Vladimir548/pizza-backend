import { Injectable } from '@nestjs/common';
import { ParameterDto } from './dto/parameter.dto';

import { PrismaService } from 'src/prisma.service';
import { EnumTypeProduct } from 'src/enums/ETypeProduct';


@Injectable()
export class ParameterService {
	constructor (private prisma:PrismaService){}
  create(dto: ParameterDto) {
    return this.prisma.parameters.create({
			data:{
				parameter:dto.parameter,
				typeProduct:dto.typeProduct
			}
		});
  }

  findAll() {
    return this.prisma.parameters.findMany();
  }
	findByType(type:EnumTypeProduct) {
    return this.prisma.parameters.findMany({
			where:{
				typeProduct:{
					has:type
				}
			}
		});
  }
  findOne(id: number) {
    return `This action returns a #${id} parameter`;
  }

  update(id: number, dto: ParameterDto) {
    return `This action updates a #${id} parameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} parameter`;
  }
}
