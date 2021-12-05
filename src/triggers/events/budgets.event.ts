import { Budget } from 'src/api/projects/entities/budget.entity';

export interface BudgetCreatedEvent {
  budget: Budget;
}
