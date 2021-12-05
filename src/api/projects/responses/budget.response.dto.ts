import { Exclude, Expose, Type } from 'class-transformer';
import { Project } from '../entities/project.entity';
import { BUDGET_STATUS } from '../types/budget-status.type';
import { ProjectResponseDto } from './project.response.dto';

@Exclude()
export class BudgetResponseDto {
  @Expose()
  id: string;

  @Expose()
  status: BUDGET_STATUS;

  @Expose()
  price: number;

  @Expose()
  @Type(() => ProjectResponseDto)
  project: Project;
}
