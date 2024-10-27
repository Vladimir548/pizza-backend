import { Injectable } from '@nestjs/common';
import { IngredientDto } from './dto/ingredient.dto';
import { PrismaService } from 'src/prisma.service';
import { EnumTypeProduct } from 'src/enums/ETypeProduct';


@Injectable()
export class IngredientService {
	constructor (private prisma :PrismaService){}
  create(dto: IngredientDto) {
		const typeProductArray = (typeof dto.typeProduct === 'string'
			? dto.typeProduct.split(',')
			: dto.typeProduct
	).map((type: string) => EnumTypeProduct[type as keyof typeof EnumTypeProduct]);
    return this.prisma.ingredient.create({
			data: {
					name:dto.name,
					price:+dto.price,
					image:dto.image,
					typeProduct: typeProductArray,
			},
	})
  }

  findAll() {
    return this.prisma.ingredient.findMany();
  }
	findByType(type:EnumTypeProduct) {
    return this.prisma.ingredient.findMany({
			where:{
				typeProduct:{
					has:type
				}
			}
		});
  }
 async priceByIds(ids: number[]) {
		const ingredients = await this.prisma.ingredient.findMany({
			where:{
				id:{
					in:ids
				}
			}
		})
		const totalPriceIngredient = ingredients.reduce((acc,ingredient) => Number(acc) + Number(ingredient.price),0)
    return totalPriceIngredient
  }

  update(id: number, dto: IngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
