import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProportionDto } from './dto/proportion.dto'


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

  async findAll()  {
    return await this.prisma.proportions.findMany({
      include:{
        categories:true
      }
    })
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

 async update(id: number, dto: ProportionDto) {
  console.log(dto)
    return await this.prisma.proportions.update({
      where:{
        id:Number(id)
      },
      data:{
        categories:{
          connect:dto.categories?.map(id => ({id}))
      },
     value:dto.value

      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} proportion`;
  }
}
