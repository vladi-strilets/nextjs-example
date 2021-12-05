import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PRO_ROLE } from '../types/pro-roles.type';

export class CreateProProfileRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsEnum(PRO_ROLE)
  @IsNotEmpty()
  proRole: PRO_ROLE;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  provinces: string[];

  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  categories: string[];
}
