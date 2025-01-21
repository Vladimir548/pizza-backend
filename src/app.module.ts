import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ProductModule } from './product/product.module';
import { ProductVariantModule } from './product-variant/product-variant.module';

import { ParameterModule } from './parameter/parameter.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';
import { ProportionModule } from './proportion/proportion.module';
import { VariantTypesModule } from './variant-types/variant-types.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),CategoryModule, IngredientModule, ProductModule, ProductVariantModule, ParameterModule, UsersModule, AuthModule, CartModule, CartItemModule, OrderModule, ProportionModule, VariantTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
