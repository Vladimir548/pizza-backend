
import { Injectable } from '@nestjs/common';
import { ProductVariantDto } from './dto/product-variant.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProductVariantService {
	constructor (private prisma :PrismaService){}
	async create(dto: ProductVariantDto) {
		const createdVariant = await this.prisma.productVariant.create({
				data: {
						productId: +dto.productId,
						parameterId: +dto.parameterId,
						quantity: +dto.quantity,
						doughName: dto.doughName,
						image: dto.image,
						sizes: {
								create: dto.sizes?.map(size => ({
										price: Number(size.price),
										weight:String(size.weight),
										sizeId:Number(size.sizeId),
										ingredients:{
											connect:size.ingredients?.map(id => ({id}))
										}
								})),
						},
						
				},
		});

		const createAttribute = await this.prisma.productAttribute.create({
			data:{
				name:dto.attributeName,
				productVariantId:createdVariant.id
			}
		})

		return {createdVariant,createAttribute};
  }

  findAll() {
    return `This action returns all productVariant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }

  update(id: number, dto: ProductVariantDto) {
    return `This action updates a #${id} productVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }
}
