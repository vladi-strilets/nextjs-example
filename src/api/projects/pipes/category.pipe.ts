import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { Category } from '../entities/category.entity';

export const CategoryValidationPipe = new EntityValidationPipe(Category);
