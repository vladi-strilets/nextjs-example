import { Exclude, Expose, Type } from 'class-transformer';
import { Budget } from 'src/api/projects/entities/budget.entity';
import { BudgetResponseDto } from 'src/api/projects/responses/budget.response.dto';
import { Message } from '../entities/message.entity';

@Exclude()
export class RoomResponseDto {
  @Expose()
  id: string;

  @Expose()
  closedAt: Date;

  @Expose()
  messages: Message[];

  @Type(() => BudgetResponseDto)
  @Expose()
  budget: Budget;
}
