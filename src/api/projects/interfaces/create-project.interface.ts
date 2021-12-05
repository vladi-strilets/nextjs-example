import { City } from 'src/api/locations/entities/city.entity';
import { ClientProfile } from 'src/api/users/entities/client-profile.entity';
import { Category } from '../entities/category.entity';

export interface CreateProjectData {
  title: string;
  description?: string;
  city: City;
  category: Category;
  client: ClientProfile;
}
