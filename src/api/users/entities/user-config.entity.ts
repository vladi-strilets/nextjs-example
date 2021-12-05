import { MainEntity } from 'src/api/shared/entities/main.entity';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserConfig extends MainEntity {
  @Column({ default: true })
  sendPushNotifications: boolean;

  @Column({ default: true })
  sendMailNotifications: boolean;

  @Column({ default: true })
  sendSmsNotifications: boolean;

  // NOTE: this value (userId) should be unique, cannot prevent it by typeorm, so we check it inside controller
  @OneToOne(() => User, (user) => user.config)
  user: User;
}
