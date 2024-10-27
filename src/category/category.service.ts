import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CategoryService {
	constructor (private prisma:PrismaService){}
  create(dto: CategoryDto) {
    return this.prisma.category.create({
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
