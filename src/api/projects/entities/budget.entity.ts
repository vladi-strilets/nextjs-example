import { Room } from 'src/api/chats/entities/room.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { ProProfile } from 'src/api/users/entities/pro-profile.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BUDGET_STATUS } from '../types/budget-status.type';
import { Project } from './project.entity';
import { Review } from './review.entity';

@Entity()
export class Budget extends MainEntity {
  @Column({
    type: 'enum',
    enum: BUDGET_STATUS,
    default: BUDGET_STATUS.ACTIVE,
  })
  status: BUDGET_STATUS;

  @Column()
  price: number;

  @Column()
  projectId: string;

  @JoinColumn()
  @ManyToOne(() => Project, (project) => project.budgets)
  project: Project;

  @Column()
  proId: string;

  @JoinColumn()
  @ManyToOne(() => ProProfile, (pro) => pro.budgets)
  pro: ProProfile;

  @JoinColumn()
  @OneToOne(() => Review)
  review: Review;

  @JoinColumn()
  @OneToOne(() => Room, (room) => room.budget, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
  })
  room: Room;
}
