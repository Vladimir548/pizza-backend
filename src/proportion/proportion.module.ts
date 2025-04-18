import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProportionController } from './proportion.controller'
import { ProportionService } from './proportion.service'

@Module({
  controllers: [ProportionController],
  providers: [ProportionService,PrismaService],
})
export class ProportionModule {}
