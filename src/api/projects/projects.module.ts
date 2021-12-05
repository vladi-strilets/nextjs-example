import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from '../chats/chats.module';
import { CategoriesAdminController } from './controllers/admin/categories.admin.controller';
import { BudgetsController } from './controllers/budgets.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProjectsController } from './controllers/projects.controller';
import { Budget } from './entities/budget.entity';
import { Category } from './entities/category.entity';
import { Project } from './entities/project.entity';
import { Review } from './entities/review.entity';
import { BudgetsService } from './services/budgets.service';
import { CategoriesService } from './services/categories.service';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Budget, Category, Review]),
    ChatsModule,
  ],
  controllers: [
    ProjectsController,
    BudgetsController,
    CategoriesController,
    CategoriesAdminController,
  ],
  providers: [ProjectsService, BudgetsService, CategoriesService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
