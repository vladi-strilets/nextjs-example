import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/api/auth/decorators/auth-user.decorator';
import { Roles } from 'src/api/auth/decorators/roles.decorator';
import { FirebaseGuard } from 'src/api/auth/guards/firebase.guard';
import { RolesGuard } from 'src/api/auth/guards/roles.guard';
import { City } from 'src/api/locations/entities/city.entity';
import { CityValidationPipe } from 'src/api/locations/pipes/city.pipe';
import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { User } from 'src/api/users/entities/user.entity';
import { USER_ROLE } from 'src/api/users/types/user-roles.type';
import { Category } from '../entities/category.entity';
import { Project } from '../entities/project.entity';
import { ProjectSerializeInterceptor } from '../interceptors/project-serialize.interceptor';
import { CreateProjectData } from '../interfaces/create-project.interface';
import { CategoryValidationPipe } from '../pipes/category.pipe';
import { ProjectValidationPipe } from '../pipes/project.pipe';
import { CreateProjectRequestDto } from '../requests/create-project.request.dto';
import { UpdateProjectRequestDto } from '../requests/update-project.request.dto';
import { ProjectsService } from '../services/projects.service';

@Roles(USER_ROLE.CLIENT)
@UseGuards(RolesGuard)
@UseGuards(FirebaseGuard)
@UseInterceptors(ProjectSerializeInterceptor)
@Controller('projects')
export class ProjectsController {
  constructor(public projectsService: ProjectsService) {}

  @Get()
  async getProjects(
    @AuthUser() authUser: User,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Project>> {
    return await this.projectsService.getUserProjects(authUser.id, query);
  }

  @Get('/:id')
  async getProject(
    @AuthUser() authUser: User,
    @Param('id', ProjectValidationPipe) project: Project,
  ): Promise<Project> {
    await this.checkProjectPermissions(project.id, authUser.id);
    return project;
  }

  @Post()
  async createProject(
    @AuthUser() authUser: User,
    @Body() dto: CreateProjectRequestDto,
    @Body('city', CityValidationPipe) city: City,
    @Body('category', CategoryValidationPipe) category: Category,
  ): Promise<Project> {
    const createProjectData: CreateProjectData = {
      ...dto,
      city,
      category,
      client: authUser.clientProfile,
    };

    return await this.projectsService.createProject(createProjectData);
  }

  @Put('/:id')
  async updateProject(
    @AuthUser() authUser: User,
    @Param('id', ProjectValidationPipe) project: Project,
    @Body() dto: UpdateProjectRequestDto,
  ): Promise<Project> {
    await this.checkProjectPermissions(project.id, authUser.id);
    return await this.projectsService.updateProject(project.id, dto);
  }

  @Delete('/:id')
  async deleteProject(
    @AuthUser() authUser: User,
    @Param('id', ProjectValidationPipe) project: Project,
  ): Promise<void> {
    await this.checkProjectPermissions(project.id, authUser.id);
    await this.projectsService.deleteProject(project);
  }

  private async checkProjectPermissions(
    projectId: string,
    userId: string,
  ): Promise<void> {
    const project = await Project.findOne(projectId, {
      join: {
        alias: 'project',
        leftJoinAndSelect: {
          client: 'project.client',
          user: 'client.user',
        },
      },
      where: {
        client: {
          user: {
            id: userId,
          },
        },
      },
    });

    if (!project) {
      throw new ForbiddenException(
        `You have no permissions to view the requested project with ID '${projectId}'`,
      );
    }
  }
}
