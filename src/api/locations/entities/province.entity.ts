import { MainEntity } from 'src/api/shared/entities/main.entity';
import { ProProfile } from 'src/api/users/entities/pro-profile.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { City } from './city.entity';
import { GooglePlaceColumn } from './google-place.column';

@Entity()
export class Province extends MainEntity {
  @Column()
  title: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column(() => GooglePlaceColumn)
  googlePlace: GooglePlaceColumn;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];

  @ManyToMany(() => ProProfile, (pro) => pro.provinces)
  pros: ProProfile[];
}
