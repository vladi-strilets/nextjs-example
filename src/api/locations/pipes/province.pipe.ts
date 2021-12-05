import { Province } from 'src/api/locations/entities/province.entity';
import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';

export const ProvinceValidationPipe = new EntityValidationPipe(Province);
