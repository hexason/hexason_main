import { Category } from '../models';
import { CategoryCreateType } from 'pointes';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async createCategory({ name, description, parent }: CategoryCreateType) {
    if (await this.categoryModel.findOne({ name })) throw { code: 'DUPLICABLE_DATA', message: 'Category exist' };
    const category = new this.categoryModel({
      name,
      description,
      parent,
    });

    await category.save();
    if (parent) {
      const parentCategory = await this.categoryModel.findById(parent);
      if (!parent) throw { code: 'NOT_FOUND_DATA', message: 'Category not found' };
      await parentCategory.save();
    }

    return category;
  }
}
