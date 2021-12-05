import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  placeholder: string;

  @Expose()
  image: string;

  @Expose()
  isHidden: boolean;

  @Expose()
  isActive: boolean;
}
