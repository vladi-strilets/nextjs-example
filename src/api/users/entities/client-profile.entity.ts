import { Project } from 'src/api/projects/entities/project.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ClientProfile extends MainEntity {
  @Column()
  displayName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];

  @OneToOne(() => User, (user) => user.clientProfile)
  user: User;
}
