import { Inject, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../models';
import { Model } from 'mongoose';
import { SearchArg } from '../gql/SearchQL';

export class SearchService {
  constructor(
    @Optional() @Inject('TAOBAO_INTEGRAION') private readonly TaobaoIntegration: any,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async searchFromTaobao({ query, page, limit }: SearchArg) {
    if (!this.TaobaoIntegration) return { err: 'not_connected', count: 0, items: [] };

    const inProducts = await this.TaobaoIntegration.batchSearchItems(query, {
      page,
      limit,
    });

    const items = inProducts.Items.Content.map((item: any) => ({
      id: item.Id,
      title: item.Title,
      image: item.MainPictureUrl,
      price: +item.Price.ConvertedPriceWithoutSign,
      sold: 0,
      discount: 0,
      items: [],
    }));

    return { count: inProducts.Items.TotalCount, items };
  }

  async searchFromLocal({ query, page, limit }: SearchArg) {
    const products = await this.productModel
      .find({ $text: { $search: query } })
      .skip(page * limit)
      .limit(limit);
    const count = await this.productModel.count({ $text: { $search: query } });

    return {
      count,
      items: products,
    };
  }
}
