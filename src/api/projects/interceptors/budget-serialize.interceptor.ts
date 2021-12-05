import { SerializeInterceptor } from 'src/api/shared/interceptors/serialize.interceptor';
import { BudgetResponseDto } from '../responses/budget.response.dto';

export const BudgetSerializeInterceptor = new SerializeInterceptor(
  BudgetResponseDto,
);
