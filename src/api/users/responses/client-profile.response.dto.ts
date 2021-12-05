import { Exclude, Expose, Transform } from 'class-transformer';
import config from 'src/config';

@Exclude()
export class ClientProfileResponseDto {
  @Expose()
  id: string;

  @Expose()
  displayName: string;

  @Expose()
  description: string;

  @Transform(({ value }) =>
    value === null ? config.entities.clientProfile.defaultImage : value,
  )
  @Expose()
  image: string;
}
