import { Exclude, Expose, Type } from 'class-transformer';
import { ClientProfile } from '../entities/client-profile.entity';
import { ProProfile } from '../entities/pro-profile.entity';
import { USER_ROLE } from '../types/user-roles.type';
import { ClientProfileResponseDto } from './client-profile.response.dto';
import { ProProfileResponseDto } from './pro-profile.response.dto';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  role: USER_ROLE;

  @Expose()
  @Type(() => ClientProfileResponseDto)
  clientProfile: ClientProfile;

  @Expose()
  @Type(() => ProProfileResponseDto)
  proProfile: ProProfile;
}
