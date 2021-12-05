import { Exclude, Expose, Transform } from 'class-transformer';
import config from 'src/config';
import { PROJECT_STATUS } from '../types/project-status.type';

@Exclude()
export class ProjectResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: PROJECT_STATUS;

  @Transform(({ value }) =>
    value === null || (Array.isArray(value) && !value.length)
      ? [config.entities.project.defaultImage]
      : value,
  )
  @Expose()
  images: string[];
}
