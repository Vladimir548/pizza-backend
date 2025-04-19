import { ConflictException, Injectable } from '@nestjs/common'

import { SubProduct, TypeProduct } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductVariantDto } from './dto/product-variant.dto'

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductVariantDto) {
    const productsSub = typeof dto.subProduct === 'string'
      ? JSON.parse(dto.subProduct)
      : dto.subProduct;

    let totalPriceKit = 0

    if(productsSub) {
    const calcSubProduct = await Promise.all(
      (Array.isArray(productsSub) ? productsSub : []).map(async (product) => {
        const priceProduct = await this.prisma.productVariant.findFirst({
          where: {
            productId: +product.productId,
            productAttribute: {
              productVariantId: +product.variantId,
            },
          },
          select: {
            sizes: {
              where: {
                id: +product.subSizeId,
              },
              select: {
                price: true,
              },
            },
          },
        });
        return Number(priceProduct?.sizes?.[0]?.price || 0) * product.quantity;
      })
    )
    totalPriceKit = calcSubProduct.reduce((acc, val) => acc + val, 0);
  }

    if(dto.parentType === TypeProduct.PIZZA_HALF) {
      const minPrice = await this.prisma.productVariant.findMany({
        include:{
          sizes:{
            orderBy:{
              price:'asc'
            },
            take:1
          },
        },
        take:2
      });

      totalPriceKit = minPrice.reduce((acc,val) => {
          return acc + (val.sizes[0].price / 2)
        },0)
    }

    const findProduct =  await this.prisma.productVariant.findFirst({
      where:{
        Product:{
          image:dto.image
        },
        productId:+dto.productId,
        productAttribute:{
          variantTypesId:Number(dto.variantTypesId),
          name:dto.attributeName
        },
        
        sizes:{
         some:{
          proportionId:{
            in:dto.sizes.map(size => Number(size.proportionId))
          }
         }
        }
      }
    })

    if(findProduct) {
      throw new ConflictException("Продукт с такими параметрами уже существует!");
    }

    const createdVariant = await this.prisma.productVariant.create({
      data: {
        productId: +dto.productId,
        parameterId: +dto.parameterId,
        quantity: +dto.quantity,
        image: dto.image,
        sizes: {
          create: Array.isArray(dto.sizes)
            ? dto.sizes.map((size) => ({
                price: Number(size.price),
                weight: String(size.weight),
                proportionId: Number(size.proportionId),
                ingredients: {
                  connect: Array.isArray(size.ingredients)
                    ? size.ingredients.map((id) => ({ id: Number(id) }))
                    : [],
                },
              }))
            : [],
        },
        subProduct: {
          create: Array.isArray(productsSub)
            ? productsSub.map((product: SubProduct) => ({
                productId: Number(product.productId),
                subSizeId: Number(product.subSizeId),
                variantId: Number(product.variantId),
                isReplace: product.isReplace,
                quantity: Number(product.quantity),
              }))
            : [],
        },
        priceKit: totalPriceKit,
      },
    });

    const createAttribute = await this.prisma.productAttribute.create({
      data: {
        name: dto?.attributeName,
        productVariantId: createdVariant.id,
        variantTypesId: Number(dto.variantTypesId),
      },
    });

    return { createdVariant, createAttribute };
  }
  async findByVariantAndSizeProduct (params:{productId:number,variantId:number,sizeId:number}[]){
    const products = await this.prisma.productVariant.findMany({
      where:{
        OR:params.map(product => ({
          productAttribute:{
            variantTypesId:Number(product.variantId),

          },
          Product:{
            id:Number(product.productId)
          }
        }))
      },
        include:{
            sizes:{
              include:{
                ingredients:true,
                proportion:true
              }
            },
            productAttribute:{
              include:{
                variantTypes:true,
              }
            },
        }
    })

    const filteredProducts = products.map(product => ({
      ...product,
      sizes: product.sizes.filter(size =>
        params.some(param => param.sizeId === size.proportionId)
      ),
    }));

    return filteredProducts
  }

}
