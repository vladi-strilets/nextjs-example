import { Exclude, Expose, Transform } from 'class-transformer';
import config from 'src/config';
import { PRO_ROLE } from '../types/pro-roles.type';

@Exclude()
export class ProProfileResponseDto {
  @Expose()
  id: string;

  @Expose()
  displayName: string;

  @Expose()
  proRole: PRO_ROLE;

  @Expose()
  description: string;

  @Expose()
  isVerified: boolean;

  @Expose()
  avarageRating: number;

  @Transform(({ value }) =>
    value === null ? config.entities.proProfile.defaultImage : value,
  )
  @Expose()
  image: string;
}
