import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductVariantController } from './product-variant.controller'
import { ProductVariantService } from './product-variant.service'

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService,PrismaService],
})
export class ProductVariantModule {}
