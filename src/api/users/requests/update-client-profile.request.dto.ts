import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateClientProfileRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  displayName: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
