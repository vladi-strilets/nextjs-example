import { Budget } from 'src/api/projects/entities/budget.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Room extends MainEntity {
  // last closed moment
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  closedAt: Date;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @OneToOne(() => Budget, (budget) => budget.room)
  budget: Budget;
}
