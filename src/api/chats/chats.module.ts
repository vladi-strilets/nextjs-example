import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './controllers/room.controller';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { RoomService } from './services/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class ChatsModule {}
