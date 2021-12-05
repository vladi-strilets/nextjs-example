import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ProjectListener } from './listeners/projects.listener';

@Module({
  imports: [NotificationsModule],
  providers: [ProjectListener],
})
export class ListenersModule {}
