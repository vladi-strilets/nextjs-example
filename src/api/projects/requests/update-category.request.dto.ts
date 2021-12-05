import { IsBoolean, IsOptional } from 'class-validator';
import { CreateCategoryRequestDto } from './create-category.request.dto';

export class UpdateCategoryRequestDto extends CreateCategoryRequestDto {
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsOptional()
  isHidden: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
