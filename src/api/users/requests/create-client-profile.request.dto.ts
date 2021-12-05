import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClientProfileRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
