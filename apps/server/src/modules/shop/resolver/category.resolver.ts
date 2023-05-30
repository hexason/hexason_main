import { Query, Resolver } from '@nestjs/graphql';
import { Category } from '../models';
import { CategoryService } from '../services/category.service';
import { CategoryTree } from '../gql/CategoryQL';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Query(() => [CategoryTree])
  async getCategoryTree() {
    const categories = await this.categoryService.getCategories();
    const tree = this.categoryService.buildTree(categories);
    return tree;
  }
}
