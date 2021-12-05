import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Category } from '../entities/category.entity';
import { CreateCategoryRequestDto } from '../requests/create-category.request.dto';
import { UpdateCategoryRequestDto } from '../requests/update-category.request.dto';

@Injectable()
export class CategoriesService {
  //constructor() {}

  async getCategories(query: PaginateQuery): Promise<Paginated<Category>> {
    const queryBuilder = Category.createQueryBuilder('category')
      .where('category.isActive = :isActive', { isActive: true })
      .andWhere('category.isHidden = :isHidden', { isHidden: false });

    try {
      return await paginate(query, queryBuilder, {
        sortableColumns: ['title', 'createdAt'],
        searchableColumns: ['title', 'description'],
        defaultSortBy: [['title', 'ASC']],
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createCategory(dto: CreateCategoryRequestDto): Promise<Category> {
    const category = Category.create(dto);
    return await category.save();
  }

  async updateCategory(
    categoryId: string,
    dto: UpdateCategoryRequestDto,
  ): Promise<Category> {
    await Category.update(categoryId, dto);
    return await Category.findOne(categoryId);
  }
}
