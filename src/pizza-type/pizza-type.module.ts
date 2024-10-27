import { Module } from '@nestjs/common';
import { PizzaTypeService } from './pizza-type.service';
import { PizzaTypeController } from './pizza-type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PizzaTypeController],
  providers: [PizzaTypeService,PrismaService],
})
export class PizzaTypeModule {}
