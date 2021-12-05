import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { ChatsModule } from './api/chats/chats.module';
import { LocationsModule } from './api/locations/locations.module';
import { PingModule } from './api/ping/ping.module';
import { ProjectsModule } from './api/projects/projects.module';
import { UsersModule } from './api/users/users.module';
import config from './config';
import { NotificationsModule } from './notifications/notifications.module';
import { ListenersModule } from './triggers/listeners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.typeorm),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    ProjectsModule,
    LocationsModule,
    ChatsModule,
    PingModule,
    NotificationsModule,
    ListenersModule,
  ],
  controllers: [],
  providers: [...config.appProviders],
})
export class AppModule {}
