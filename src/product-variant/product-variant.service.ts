import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductVariantDto } from './dto/product-variant.dto'

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductVariantDto) {
    
      const productsSub = typeof dto.productsSub === 'string' 
  ? JSON.parse(dto.productsSub) 
  : dto.productsSub;

console.log('productsSub',productsSub);
console.log('dto',dto);
    const calcPriceKit =await Promise.all(
      productsSub?.map(async (product) => {
        const priceProduct = await this.prisma.productVariant.findFirst({
          where:{
                productId:+product.productId,
                productAttribute:{
                  productVariantId:+product.variantId
                },
                
          },
          select:{
            sizes:{
              where:{
                sizeId:+product.sizeId
              },
              select:{
                price:true
              }
            },
          }
        }) 
        return Number(priceProduct.sizes[0].price) * dto.quantity
      })
       
    )
    const totalPrice = calcPriceKit.reduce((acc,val) => acc + val,0)

    const createdVariant = await this.prisma.productVariant.create({
      data: {
        productId: +dto.productId,
        parameterId: +dto.parameterId,
        quantity: +dto.quantity,
        image: dto.image,
        sizes: {
          create: dto.sizes?.map((size) => ({
            price: Number(size.price),
            weight: String(size.weight),
            sizeId: Number(size.sizeId),
            ingredients: {
              connect: size.ingredients?.map((id) => ({id: Number(id) })),
            },
          })),
        },
        subProduct:{
          create:productsSub.map((product) => ({
            productId: Number(product.productId),
            subSizeId: Number(product.sizeId),
            variantId: Number(product.variantId),
            isReplace: product.isReplace,
            quantity: Number(product.quantity),
          }))
        },
        priceKit:totalPrice
      },
    });

    // await Promise.all(
    //   productsSub.map(async (product) =>
    //    await this.prisma.subProduct.create({
    //       data: {
    //         productId: Number(product.productId),
    //         sizeId: Number(product.sizeId),
    //         parentVariantId: createdVariant.id,
    //         variantId: Number(product.variantId),
    //         isReplace: product.isReplace,
    //         quantity: Number(product.quantity),
    //       },
    //     }),
    //   ),
    // );

    const createAttribute = await this.prisma.productAttribute.create({
      data: {
        name: dto?.attributeName,
        productVariantId: createdVariant.id,
      },
    });
    const variantWithSubProducts = await this.prisma.productVariant.findUnique({
      where: { id: createdVariant.id },
      include: {
        subProduct: true, 
      },
    });
    // console.log('variantWithSubProducts',variantWithSubProducts);
    return { variantWithSubProducts, createAttribute };
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
