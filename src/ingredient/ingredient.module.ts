import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService,PrismaService],
	exports:[IngredientService]
})
export class IngredientModule {}
