import { InjectModel } from '@nestjs/mongoose';
import { Backpack } from '../models';
import { Model } from 'mongoose';

export class FavoriteService {
  constructor(@InjectModel(Backpack.name) private readonly BPModel: Model<Backpack>) {}

  async getFavoriteProducts(userId: string) {
    const backpack = await this.BPModel.findOne({
      userId,
    }).populate('favorite');
    if (!backpack) return [];
    return backpack.favorite;
  }

  async updateFavorite(userId: string, { productIds }: { productIds: any[] }) {
    const bp = (await this.BPModel.findOne({ userId })) || new this.BPModel({ favorite: [], basket: [], userId });
    bp.favorite = productIds;
    await bp.save();
    await bp.populate('favorite');
    return bp.favorite;
  }
}
