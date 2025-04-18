import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { VariantTypesController } from './variant-types.controller'
import { VariantTypesService } from './variant-types.service'

@Module({
  controllers: [VariantTypesController],
  providers: [VariantTypesService,PrismaService],
})
export class VariantTypesModule {}
