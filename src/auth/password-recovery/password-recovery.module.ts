import { Module } from '@nestjs/common'
import { CartService } from 'src/cart/cart.service'
import { MailService } from 'src/libs/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { PasswordRecoveryController } from './password-recovery.controller'
import { PasswordRecoveryService } from './password-recovery.service'

@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, UserService, MailService,PrismaService,CartService],
})
export class PasswordRecoveryModule {}
