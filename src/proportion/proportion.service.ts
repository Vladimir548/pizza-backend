import { Injectable } from '@nestjs/common';
import { ProportionDto } from './dto/proportion.dto';
import { UpdateProportionDto } from './dto/update-proportion.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProportionService {

	constructor (private prisma:PrismaService){}

 async create(dto: ProportionDto) {
    return await this.prisma.proportions.create({
			data:{
				value:dto.value,
				categories:{
						connect:dto.categories.map(id => ({id}))
				}
			}
		})
  }

  findAll() {
    return `This action returns all proportion`;
  }

   async byType(categoryId: number) {
    return await this.prisma.proportions.findMany({
      where:{
        categories:{
          some:{
						id:categoryId
					}
        }
      },
			orderBy:{
				value:'asc'
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
