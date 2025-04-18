import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ParameterController } from './parameter.controller'
import { ParameterService } from './parameter.service'

@Module({
  controllers: [ParameterController],
  providers: [ParameterService,PrismaService],
})
export class ParameterModule {}
