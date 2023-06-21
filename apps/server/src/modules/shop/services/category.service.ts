import { Category } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CategoryCreateDto } from '../validation/CategoryControllerDto';

export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async createCategory({ title, icon, parent, slug }: CategoryCreateDto) {
    let category = await this.categoryModel.findOne({ slug: (slug || '').toLocaleLowerCase() });
    const countCategory = await this.categoryModel.count({});
    if (!category) category = new this.categoryModel({ title, icon, slug: slug || `category-${countCategory}` });
    category.title = title;
    category.icon = icon;
    const parentCategory = await this.categoryModel.findOne({ _id: { $eq: parent } }).catch(() => null);
    category.parent = parentCategory;

    await category.populate('parent');
    await category.save();
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
