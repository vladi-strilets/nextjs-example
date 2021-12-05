import { SerializeInterceptor } from 'src/api/shared/interceptors/serialize.interceptor';
import { ProjectResponseDto } from '../responses/project.response.dto';

export const ProjectSerializeInterceptor = new SerializeInterceptor(
  ProjectResponseDto,
);
