import { User } from '../entities/user.entity';

export interface CreateClientProfileInterface {
  displayName: string;
  description?: string;
  user: User;
  image?: string;
}
