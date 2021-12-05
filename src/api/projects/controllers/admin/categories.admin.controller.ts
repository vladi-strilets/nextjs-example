import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '../../entities/category.entity';
import { CategorySerializeInterceptor } from '../../interceptors/category-serialize.interceptor';
import { CategoryValidationPipe } from '../../pipes/category.pipe';
import { CreateCategoryRequestDto } from '../../requests/create-category.request.dto';
import { UpdateCategoryRequestDto } from '../../requests/update-category.request.dto';
import { CategoryResponseDto } from '../../responses/category.response.dto';
import { CategoriesService } from '../../services/categories.service';

@ApiTags('Admin Categories')
@UseInterceptors(CategorySerializeInterceptor)
@Controller('/admin/categories')
export class CategoriesAdminController {
  constructor(public categoriesService: CategoriesService) {}

  @Post('/')
  async createCategory(
    @Body() dto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoriesService.createCategory(dto);
  }

  @Put('/:id')
  async updateCategory(
    @Param('id', CategoryValidationPipe) category: Category,
    @Body() dto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoriesService.updateCategory(category.id, dto);
  }
}
