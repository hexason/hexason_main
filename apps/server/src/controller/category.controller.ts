import { Category } from '@/lib/schema';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(@InjectModel(Category.name) private readonly cateModel: Model<Category>) {}

  @Get('list')
  async getAllCategories(@Query('s') s: string) {
    const categories = await this.cateModel
      .find({
        name: { $regex: s, $options: 'i' },
      })
      .limit(5);
    return categories;
  }

  @Post('create')
  async createCategory(@Body() { name }: any) {
    let category = await this.cateModel.findOne({ name: name.toLowerCase() });
    if (!category) category = new this.cateModel({ name });
    await category.save();
    return category;
  }
}
