import { Module } from '@nestjs/common'
import { MailService } from 'src/libs/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { TwoFactorAuthService } from './two-factor-auth.service'

@Module({
  providers: [TwoFactorAuthService, MailService,PrismaService],
})
export class TwoFactorAuthModule {}
