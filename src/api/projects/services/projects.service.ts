import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ProjectCreatedEvent } from 'src/triggers/events/projects.event';
import { EventType } from 'src/triggers/types/event.types';
import { Project } from '../entities/project.entity';
import { CreateProjectData } from '../interfaces/create-project.interface';
import { UpdateProjectRequestDto } from '../requests/update-project.request.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async getProject(id: string): Promise<Project> {
    return await Project.findOne(id);
  }

  async getUserProjects(
    userId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Project>> {
    const queryBuilder = Project.createQueryBuilder('project')
      .leftJoin('project.client', 'client')
      .leftJoin('client.user', 'user')
      .where('user.id = :userId', { userId });

    try {
      return await paginate(query, queryBuilder, {
        sortableColumns: ['title', 'createdAt'],
        searchableColumns: ['title', 'description'],
        defaultSortBy: [['createdAt', 'DESC']],
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createProject(dto: CreateProjectData): Promise<Project> {
    const project = await Project.create(dto).save();

    const projectCreatedData: ProjectCreatedEvent = { project };
    this.eventEmitter.emit(EventType.PROJECT_CREATED, projectCreatedData);

    return project;
  }

  async updateProject(
    projectId: string,
    dto: UpdateProjectRequestDto,
  ): Promise<Project> {
    await Project.update(projectId, dto);
    return Project.findOne(projectId);
  }

  async deleteProject(project: Project): Promise<void> {
    await Project.softRemove(project);
  }
}
