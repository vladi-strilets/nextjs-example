import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_ROLE } from '../types/user-roles.type';

export class CreateUserRequestDto {
  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  role: USER_ROLE;
}

export class D_CreateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  role: USER_ROLE;

  @IsNotEmpty()
  @IsString()
  firebaseUid: string;
}
