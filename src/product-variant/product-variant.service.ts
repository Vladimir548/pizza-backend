
import { Injectable } from '@nestjs/common';
import { ProductVariantDto } from './dto/product-variant.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProductVariantService {
	constructor (private prisma :PrismaService){}
	async create(dto: ProductVariantDto) {
		console.log(dto)
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
										weight:Number(size.weight),
										sizeId:Number(size.sizeId)
								})),
						},
				},
		});

		return createdVariant;
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
