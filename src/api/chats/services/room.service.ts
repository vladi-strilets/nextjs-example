import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Budget } from 'src/api/projects/entities/budget.entity';
import { User } from 'src/api/users/entities/user.entity';
import { USER_ROLE } from 'src/api/users/types/user-roles.type';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  //constructor() {}

  async getRooms(user: User, query: PaginateQuery): Promise<Paginated<Room>> {
    const queryBuilder = Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.budget', 'budget')
      .leftJoinAndSelect('budget.project', 'project');

    user.role === USER_ROLE.CLIENT
      ? queryBuilder
          .leftJoin('project.client', 'client')
          .leftJoin('client.user', 'user')
      : queryBuilder.leftJoin('budget.pro', 'pro').leftJoin('pro.user', 'user');

    queryBuilder.where('user.id = :userId', { userId: user.id });

    try {
      return await paginate(query, queryBuilder, {
        sortableColumns: ['createdAt'],
        defaultSortBy: [['createdAt', 'DESC']],
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getRoom(roomId: string): Promise<Room> {
    return await Room.findOne(roomId);
  }

  async createRoom(budget: Budget): Promise<Room> {
    const room = Room.create({ budget });
    return await room.save();
  }
}
