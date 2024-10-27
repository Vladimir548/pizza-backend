import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PrismaService } from 'src/prisma.service';
import { CartModule } from 'src/cart/cart.module';
import { IngredientModule } from 'src/ingredient/ingredient.module';


@Module({
  controllers: [CartItemController],
  providers: [CartItemService,PrismaService],
	imports:[CartModule,IngredientModule]
})
export class CartItemModule {}
