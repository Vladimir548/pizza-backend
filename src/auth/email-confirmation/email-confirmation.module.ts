import { forwardRef, Module } from '@nestjs/common'
import { MailModule } from 'src/libs/mail/mail.module'
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailConfirmationService } from './email-confirmation.service'

import { CartService } from 'src/cart/cart.service'
import { MailService } from 'src/libs/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { AuthModule } from '../auth.module'

@Module({
  imports: [MailModule, forwardRef(() => AuthModule)],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, UserService, MailService,PrismaService,CartService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
