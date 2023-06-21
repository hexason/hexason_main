import { Auth } from '@/modules/auth';
import { Category } from '../models';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryCreateDto } from '../validation/CategoryControllerDto';
import { CategoryService } from '../services';

@Auth()
@Controller('category')
export class CategoryController {
  constructor(
    @InjectModel(Category.name) private readonly cateModel: Model<Category>,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('list')
  async getAllCategories(@Query('s') s?: string) {
    const categories = await this.cateModel
      .find({
        $or: [
          {
            title: { $regex: s, $options: 'i' },
          },
          {
            slug: { $regex: s, $options: 'i' },
          },
        ],
      })
      .limit(5);
    return categories;
  }

  @Post('create')
  async createCategory(@Body() { title, icon, parent, slug }: CategoryCreateDto) {
    const category = await this.categoryService.createCategory({ title, icon, parent, slug });
    return category;
  }
}
