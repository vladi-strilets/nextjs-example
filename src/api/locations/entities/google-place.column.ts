import { Column } from 'typeorm';

export class GooglePlaceColumn {
  @Column()
  placeId: string;

  @Column()
  longName: string;

  @Column()
  shortName: string;
}
