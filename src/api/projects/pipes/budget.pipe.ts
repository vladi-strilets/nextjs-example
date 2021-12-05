import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { Budget } from '../entities/budget.entity';

export const BudgetValidationPipe = new EntityValidationPipe(Budget);
