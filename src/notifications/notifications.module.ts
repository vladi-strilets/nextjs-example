import { Module } from '@nestjs/common';
import { BeamsService } from './services/beams.service';
import { EmailService } from './services/email.service';

@Module({
  providers: [BeamsService, EmailService],
  exports: [BeamsService],
})
export class NotificationsModule {}
