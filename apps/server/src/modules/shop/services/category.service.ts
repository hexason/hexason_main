import { Category } from '../models';
import { CategoryCreateType } from 'pointes';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

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
      if (!parentCategory) throw { code: 'NOT_FOUND_DATA', message: 'Category not found' };
      await parentCategory.save();
    }

    return category;
  }

  async getCategories(query?: any) {
    const categories = await this.categoryModel.find(query);
    return categories;
  }

  buildTree(data: any) {
    const tree: any = [];
    const nodes = {};

    // Create nodes and map IDs to nodes
    for (const item of data) {
      const node = {
        id: item.id,
        title: item.title,
        icon: item.icon,
        children: [],
      };
      nodes[item.id] = node;
    }

    // Build the tree by connecting parent and child nodes
    for (const item of data) {
      const node = nodes[item.id];
      if (item.parent) {
        const parentId = Types.ObjectId.isValid(item.parent) ? item.parent.toString() : 'empty';
        const parent = nodes[parentId];
        parent.children.push(node);
      } else {
        tree.push(node);
      }
    }

    return tree;
  }
}
