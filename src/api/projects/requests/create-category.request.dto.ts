import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryRequestDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @MaxLength(400)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  placeholder: string;
}
