import { Module } from '@nestjs/common';
import { ProportionService } from './proportion.service';
import { ProportionController } from './proportion.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProportionController],
  providers: [ProportionService,PrismaService],
})
export class ProportionModule {}
