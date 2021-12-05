import { MainEntity } from 'src/api/shared/entities/main.entity';
import { ProProfile } from 'src/api/users/entities/pro-profile.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Category extends MainEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: false })
  isActive: boolean;

  @ManyToMany(() => ProProfile, (pro) => pro.categories)
  pros: ProProfile[];

  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}
