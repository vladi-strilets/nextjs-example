import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Category } from '../entities/category.entity';
import { CategorySerializeInterceptor } from '../interceptors/category-serialize.interceptor';
import { CategoryValidationPipe } from '../pipes/category.pipe';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@UseInterceptors(CategorySerializeInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(public categoriesService: CategoriesService) {}

  @Get('/')
  async getCategories(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Category>> {
    return await this.categoriesService.getCategories(query);
  }

  @Get('/:id')
  getCategory(
    @Param('id', CategoryValidationPipe) category: Category,
  ): Category {
    return category;
  }
}
