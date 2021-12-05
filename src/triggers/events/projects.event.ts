import { Project } from 'src/api/projects/entities/project.entity';

export interface ProjectCreatedEvent {
  project: Project;
}
