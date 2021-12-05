import { SerializeInterceptor } from 'src/api/shared/interceptors/serialize.interceptor';
import { CategoryResponseDto } from '../responses/category.response.dto';

export const CategorySerializeInterceptor = new SerializeInterceptor(
  CategoryResponseDto,
);
