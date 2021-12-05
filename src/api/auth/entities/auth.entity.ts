import { MainEntity } from 'src/api/shared/entities/main.entity';
import { User } from 'src/api/users/entities/user.entity';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { REGISTER_PROVIDER } from '../types/register-providers.type';

@Entity()
export class Auth extends MainEntity {
  @Column({ unique: true })
  firebaseUid: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'enum', enum: REGISTER_PROVIDER })
  registerProvider: REGISTER_PROVIDER;

  @Column({ default: false })
  isVerifiedEmail: boolean;

  @OneToOne(() => User, (user) => user.auth)
  user: User;
}
