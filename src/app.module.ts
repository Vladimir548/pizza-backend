import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ProductVariantModule } from './product-variant/product-variant.module'
import { ProductModule } from './product/product.module'

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module'
import { ProviderModule } from './auth/provider/provider.module'
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module'
import { CartItemModule } from './cart-item/cart-item.module'
import { CartModule } from './cart/cart.module'
import { DeliveryAddressModule } from './delivery-address/delivery-address.module'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { MailModule } from './libs/mail/mail.module'
import { OrderModule } from './order/order.module'
import { ParameterModule } from './parameter/parameter.module'
import { ProportionModule } from './proportion/proportion.module'
import { UserModule } from './user/user.module'
import { VariantTypesModule } from './variant-types/variant-types.module'

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,ignoreEnvFile: !IS_DEV_ENV,}),CategoryModule, IngredientModule, ProductModule, ProductVariantModule, ParameterModule, AuthModule, CartModule, CartItemModule, OrderModule, ProportionModule, VariantTypesModule,
      AuthModule,
      UserModule,
      ProviderModule,
      MailModule,
      PasswordRecoveryModule,
      TwoFactorAuthModule,
      DeliveryAddressModule,],
})
export class AppModule {}
