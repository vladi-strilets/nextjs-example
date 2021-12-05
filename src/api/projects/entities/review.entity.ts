import { MainEntity } from 'src/api/shared/entities/main.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Review extends MainEntity {
  @Column({ nullable: true })
  text: string;

  @Column({
    type: 'int',
  })
  rating: number;
}
