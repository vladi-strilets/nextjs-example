import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { RoomService } from 'src/api/chats/services/room.service';
import { Budget } from '../entities/budget.entity';
import { CreateBudgetInterface } from '../interfaces/create-budget.interface';

@Injectable()
export class BudgetsService {
  constructor(private roomService: RoomService) {}

  async getBudgets(
    userId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Budget>> {
    const queryBuilder = Budget.createQueryBuilder('budget')
      .leftJoin('budget.pro', 'pro')
      .leftJoin('pro.user', 'user')
      .where('user.id = :userId', { userId });

    try {
      return await paginate(query, queryBuilder, {
        sortableColumns: ['createdAt'],
        defaultSortBy: [['createdAt', 'DESC']],
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createBudget(dto: CreateBudgetInterface): Promise<Budget> {
    const budget = Budget.create(dto);
    await budget.save();

    await this.roomService.createRoom(budget);

    return budget;
  }
}
