import { Province } from 'src/api/locations/entities/province.entity';
import { Budget } from 'src/api/projects/entities/budget.entity';
import { Category } from 'src/api/projects/entities/category.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PRO_ROLE } from '../types/pro-roles.type';

import { User } from './user.entity';

@Entity()
export class ProProfile extends MainEntity {
  @Column()
  displayName: string;

  @Column({ type: 'enum', enum: PRO_ROLE })
  proRole: PRO_ROLE;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  avarageRating: number;

  // Work provinces
  @ManyToMany(() => Province, (province) => province.pros)
  @JoinTable()
  provinces: Province[];

  // Active categories
  @ManyToMany(() => Category, (category) => category.pros)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Budget, (budget) => budget.pro)
  budgets: Budget[];

  // NOTE: this value (userId) should be unique, cannot prevent it by typeorm, so we check it inside controller
  @OneToOne(() => User, (user) => user.proProfile)
  user: User;
}
