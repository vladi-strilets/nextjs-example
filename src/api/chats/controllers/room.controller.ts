import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/api/auth/decorators/auth-user.decorator';
import { FirebaseGuard } from 'src/api/auth/guards/firebase.guard';
import { User } from 'src/api/users/entities/user.entity';
import { USER_ROLE } from 'src/api/users/types/user-roles.type';
import { FindOneOptions } from 'typeorm';
import { Room } from '../entities/room.entity';
import { RoomSerializeInterceptor } from '../interceptors/room-serialize.interceptor';
import { RoomValidationPipe } from '../pipes/room.pipe';
import { RoomService } from '../services/room.service';

@ApiTags('Room')
@UseInterceptors(RoomSerializeInterceptor)
@UseGuards(FirebaseGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  async getRooms(
    @AuthUser() authUser: User,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Room>> {
    return await this.roomService.getRooms(authUser, query);
  }

  @Get('/:id')
  async getRoom(
    @AuthUser() authUser: User,
    @Param('id', RoomValidationPipe) room: Room,
  ): Promise<Room> {
    await this.checkRoomPermission(authUser, room.id);
    return await this.roomService.getRoom(room.id);
  }

  private async checkRoomPermission(user: User, roomId: string): Promise<void> {
    const findOneOptions: FindOneOptions<Room> =
      user.role === USER_ROLE.CLIENT
        ? {
            join: {
              alias: 'room',
              leftJoin: {
                budget: 'room.budget',
                project: 'budget.project',
                client: 'project.client',
                user: 'client.user',
              },
            },
            where: {
              budget: {
                project: {
                  client: {
                    user: {
                      id: user.id,
                    },
                  },
                },
              },
            },
          }
        : {
            join: {
              alias: 'room',
              leftJoin: {
                budget: 'room.budget',
                pro: 'budget.pro',
                user: 'pro.user',
              },
            },
            where: {
              budget: {
                pro: {
                  user: {
                    id: user.id,
                  },
                },
              },
            },
          };

    const room = await Room.findOne(roomId, findOneOptions);

    if (!room)
      throw new ForbiddenException(
        `You have no permissions to view the requested room with ID '${roomId}'`,
      );
  }
}
