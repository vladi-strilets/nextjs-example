import { ProProfile } from 'src/api/users/entities/pro-profile.entity';
import { Project } from '../entities/project.entity';

export interface CreateBudgetInterface {
  price: number;
  pro: ProProfile;
  project: Project;
}
