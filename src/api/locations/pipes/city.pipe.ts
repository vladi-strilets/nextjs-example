import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { City } from '../entities/city.entity';

export const CityValidationPipe = new EntityValidationPipe(City);
