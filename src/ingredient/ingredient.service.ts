import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IngredientDto } from './dto/ingredient.dto'



@Injectable()
export class IngredientService {
	constructor (private prisma :PrismaService){}
  create(dto: IngredientDto) {
	
    return this.prisma.ingredient.create({
			data: {
					name:dto.name,
					price:+dto.price,
					image:dto.image,
					categories:{
						connect:JSON.parse(String(dto.categories)).map((id: number) => ({ id }))
					}
			},
	})
  }

  findAll() {
    return this.prisma.ingredient.findMany();
  }

	async findByType(type:number) {
    	return await this.prisma.ingredient.findMany({
			where:{
				categories:{
					some:{
						id:Number(type)
					}
				}
			},
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
