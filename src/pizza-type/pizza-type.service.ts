import { Injectable } from '@nestjs/common';
import { PizzaTypeDto } from './dto/pizza-type.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class PizzaTypeService {
	constructor (private prisma :PrismaService){}
  create(dto: PizzaTypeDto) {
    return this.prisma.category.create({
			data:{
				name:dto.name
			}
		});
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} pizzaType`;
  }

  update(id: number, dto: PizzaTypeDto) {
    return `This action updates a #${id} pizzaType`;
  }

  remove(id: number) {
    return `This action removes a #${id} pizzaType`;
  }
}
