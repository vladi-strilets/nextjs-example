import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { User } from '../entities/user.entity';

export const CategoryValidationPipe = new EntityValidationPipe(User);
