import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryDto } from './dto/category.dto'


@Injectable()
export class CategoryService {
	constructor (private prisma:PrismaService){}
 async create(dto: CategoryDto) {
    return await this.prisma.category.create({
			data:dto
		});
  }

  findAll() {
    return this.prisma.category.findMany({
			include:{
				products:{
					select:{
						id:true
					}
				}
			}
		});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, dto: CategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
