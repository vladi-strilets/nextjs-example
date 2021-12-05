import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProjectRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;
}
