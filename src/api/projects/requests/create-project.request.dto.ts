import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
