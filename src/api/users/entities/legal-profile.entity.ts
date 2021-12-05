import { MainEntity } from 'src/api/shared/entities/main.entity';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class LegalProfile extends MainEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  legalName: string;

  @Column({ nullable: true })
  document: string;

  @Column({ nullable: true })
  phone: string;

  // NOTE: this value (userId) should be unique, cannot prevent it by typeorm, so we check it inside controller
  @OneToOne(() => User, (user) => user.legalProfile)
  user: User;
}
