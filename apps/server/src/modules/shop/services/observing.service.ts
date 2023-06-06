import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductView } from '../models';
import { Model, Types } from 'mongoose';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

export class ObservingService {
  constructor(
    @InjectModel(ProductView.name) private readonly prodVModel: Model<ProductView>,
    @InjectModel(Product.name) private readonly prodModel: Model<Product>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: any,
  ) {}

  async observeProductById({ productId, userId }: { productId: string | Types.ObjectId; userId: string }) {
    try {
      const check = await this.prodVModel.findOne({
        product: productId,
        userId,
      });
      if (check) return;
      const model = new this.prodVModel({
        product: productId,
        userId,
      });
      await model.save();

      const highestView = await this.prodVModel.aggregate([
        {
          $group: {
            _id: '$product',
            count: { $sum: 1 },
          },
        },
        {
          $limit: 5,
        },
      ]);
      await this.cacheManager.set(
        'highest_product_view',
        highestView.map((prod) => prod._id.toString()),
      );

      return model;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getHighestViewProducts(limit = 5) {
    const ids = await this.cacheManager.get('highest_product_view');
    const products = await this.prodModel.find({ _id: ids }).limit(limit);
    return products;
  }
}
