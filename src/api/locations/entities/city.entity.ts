import { Project } from 'src/api/projects/entities/project.entity';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GooglePlaceColumn } from './google-place.column';
import { Province } from './province.entity';

@Entity()
export class City extends MainEntity {
  @Column()
  title: string;

  @Column(() => GooglePlaceColumn)
  googlePlace: GooglePlaceColumn;

  @Column()
  provinceId: string;

  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  @OneToMany(() => Project, (project) => project.city)
  projects: Project[];
}
