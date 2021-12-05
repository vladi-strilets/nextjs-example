import { City } from 'src/api/locations/entities/city.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { ClientProfile } from 'src/api/users/entities/client-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PROJECT_STATUS } from '../types/project-status.type';
import { Budget } from './budget.entity';
import { Category } from './category.entity';

@Entity()
export class Project extends MainEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.ACTIVE,
  })
  status: PROJECT_STATUS;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  images: string[];

  @Column({})
  clientId: string;

  @JoinColumn()
  @ManyToOne(() => ClientProfile, (client) => client.projects)
  client: ClientProfile;

  @OneToMany(() => Budget, (budget) => budget.project)
  budgets: Budget[];

  @Column({})
  categoryId: string;

  @JoinColumn()
  @ManyToOne(() => Category, (category) => category.projects)
  category: Category;

  @Column({ nullable: true })
  cityId: string;

  @JoinColumn()
  @ManyToOne(() => City, (city) => city.projects)
  city: City;
}
