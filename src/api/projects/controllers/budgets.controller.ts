import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/api/auth/decorators/auth-user.decorator';
import { Roles } from 'src/api/auth/decorators/roles.decorator';
import { FirebaseGuard } from 'src/api/auth/guards/firebase.guard';
import { RolesGuard } from 'src/api/auth/guards/roles.guard';
import { User } from 'src/api/users/entities/user.entity';
import { USER_ROLE } from 'src/api/users/types/user-roles.type';
import { Budget } from '../entities/budget.entity';
import { Project } from '../entities/project.entity';
import { BudgetSerializeInterceptor } from '../interceptors/budget-serialize.interceptor';
import { CreateBudgetInterface } from '../interfaces/create-budget.interface';
import { BudgetValidationPipe } from '../pipes/budget.pipe';
import { ProjectValidationPipe } from '../pipes/project.pipe';
import { CreateBudgetRequestDto } from '../requests/create-budget.request.dto';
import { BudgetsService } from '../services/budgets.service';

@ApiTags('Budgets')
@UseInterceptors(BudgetSerializeInterceptor)
@Roles(USER_ROLE.PRO)
@UseGuards(FirebaseGuard, RolesGuard)
@Controller('budgets')
export class BudgetsController {
  constructor(public budgetsService: BudgetsService) {}

  @Get('/')
  async getBudgets(
    @AuthUser() authUser: User,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Budget>> {
    return await this.budgetsService.getBudgets(authUser.id, query);
  }

  @Get('/:id')
  async getBudget(
    @AuthUser() authUser: User,
    @Param('id', BudgetValidationPipe) budget: Budget,
  ): Promise<Budget> {
    await this.checkBudgetPermission(authUser.id, budget.id);
    return budget;
  }

  @Post('/')
  async createBudget(
    @AuthUser() authUser: User,
    @Body() dto: CreateBudgetRequestDto,
    @Body('project', ProjectValidationPipe) project: Project,
  ): Promise<Budget> {
    await this.checkIsUniqueBudgetForProjectByPro(project.id, authUser.id);

    // TODO: find better way
    const createBudgetData: CreateBudgetInterface = {
      ...dto,
      project,
      pro: authUser.proProfile,
    };

    return await this.budgetsService.createBudget(createBudgetData);
  }

  private async checkBudgetPermission(
    userId: string,
    budgetId: string,
  ): Promise<void> {
    const budget = await Budget.findOne(budgetId, {
      join: {
        alias: 'budget',
        leftJoin: {
          pro: 'budget.pro',
          user: 'pro.user',
        },
      },
      where: { pro: { user: { id: userId } } },
    });

    if (!budget)
      throw new ForbiddenException(
        `You have no permissions to view the requested budget with ID '${budgetId}'`,
      );
  }

  private async checkIsUniqueBudgetForProjectByPro(
    projectId: string,
    userId: string,
  ): Promise<void> {
    const budget = await Budget.findOne({
      join: {
        alias: 'budget',
        leftJoin: {
          pro: 'budget.pro',
          user: 'pro.user',
        },
      },
      where: {
        project: {
          id: projectId,
        },
        pro: {
          user: {
            id: userId,
          },
        },
      },
    });

    if (budget) {
      throw new BadRequestException(
        'Pro has already send a budget to the requested project',
      );
    }
  }
}
