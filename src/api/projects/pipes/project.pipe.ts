import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { Project } from '../entities/project.entity';

export const ProjectValidationPipe = new EntityValidationPipe(Project);
