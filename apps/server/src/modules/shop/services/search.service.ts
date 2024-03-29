import { Inject, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CacheProd, Product } from '../models';
import { Model } from 'mongoose';
import { SearchArg } from '../gql/SearchQL';
import * as moment from 'moment';
import { GoogleService } from '@/modules/support/services';

export class SearchService {
  constructor(
    @Optional() @Inject('TAOBAO_INTEGRAION') private readonly TaobaoIntegration: any,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(CacheProd.name) private readonly cacheProd: Model<CacheProd>,
    private readonly glService: GoogleService,
  ) {}

  async cleanCacheProds() {
    await this.cacheProd.deleteMany({
      $or: [{ createdAt: { $lte: moment().add(-48, 'hour').toISOString() } }],
    });
  }
  async cacheThirdPartyProds(query: string, page: number) {
    if (!this.TaobaoIntegration) return { err: 'not_connected', count: 0, items: [] };

    const inProducts = await this.TaobaoIntegration.batchSearchItems(query, {
      page,
      limit: 200,
    });
    const items = inProducts.Items.Content.map(
      (item: any) =>
        new this.cacheProd({
          integrateId: item.Id,
          title: item.Title,
          image: item.MainPictureUrl,
          price: +item.Price.ConvertedPriceWithoutSign,
          sold: 0,
          slug: query,
          discount: 0,
          items: [],
        }),
    );
    await this.cacheProd.bulkSave(items);
    return { items, count: inProducts.Items.TotalCount };
  }
  async searchFromTaobao({ query, page, limit }: SearchArg) {
    let prods;
    await this.cleanCacheProds();

    let slug = query;
    const translated = await this.glService.translate(query, 'en').catch(() => null);
    if (translated && translated.translations && translated.translations[0])
      slug = translated.translations[0].translatedText as string;

    let count = await this.cacheProd.count({ slug: { $eq: slug } });
    if (count === page * 200) {
      const extraProds = await this.cacheThirdPartyProds(slug, page);
      count = extraProds.count;
      prods = extraProds.items.slice(0, limit);
    } else {
      prods = await this.cacheProd
        .find({ slug: { $eq: slug } })
        .skip(page * limit)
        .limit(limit);
    }

    return {
      count,
      items: prods.map((item) => ({
        ...item.toJSON(),
        id: item.integrateId,
      })),
    };
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
