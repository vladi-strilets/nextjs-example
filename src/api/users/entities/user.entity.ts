import { Auth } from 'src/api/auth/entities/auth.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { USER_ROLE } from '../types/user-roles.type';
import { ClientProfile } from './client-profile.entity';
import { LegalProfile } from './legal-profile.entity';
import { ProProfile } from './pro-profile.entity';
import { UserConfig } from './user-config.entity';

@Entity()
export class User extends MainEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: USER_ROLE, nullable: true })
  role: USER_ROLE;

  @JoinColumn()
  @OneToOne(() => Auth, (auth) => auth.user, {
    // nullable: false,
    cascade: ['insert'],
    onDelete: 'SET NULL',
  })
  auth: Auth;

  @JoinColumn()
  @OneToOne(() => ProProfile, (proProfile) => proProfile.user, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
    eager: true,
  })
  proProfile: ProProfile;

  @JoinColumn()
  @OneToOne(() => LegalProfile, (legalProfile) => legalProfile.user, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
    eager: true,
  })
  legalProfile: LegalProfile;

  @JoinColumn()
  @OneToOne(() => ClientProfile, (clientProfile) => clientProfile.user, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
    eager: true,
  })
  clientProfile: ClientProfile;

  @JoinColumn()
  @OneToOne(() => UserConfig, (userConfig) => userConfig.user, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
    eager: true,
  })
  config: UserConfig;
}
