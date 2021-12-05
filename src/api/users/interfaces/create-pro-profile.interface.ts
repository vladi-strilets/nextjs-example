import { Province } from 'src/api/locations/entities/province.entity';
import { Category } from 'src/api/projects/entities/category.entity';
import { User } from '../entities/user.entity';
import { PRO_ROLE } from '../types/pro-roles.type';

export interface CreateProProfileInterface {
  displayName: string;
  proRole: PRO_ROLE;
  description?: string;
  image?: string;
  provinces?: Province[];
  categories?: Category[];
  user: User;
}
