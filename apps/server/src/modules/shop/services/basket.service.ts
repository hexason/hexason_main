import { InjectModel } from '@nestjs/mongoose';
import { Backpack } from '../models';
import { Model } from 'mongoose';
import { Product } from '@/modules/shop/models';

export class BasketService {
  constructor(@InjectModel(Backpack.name) private readonly BPModel: Model<Backpack>) {}

  async getBasket(userId: string) {
    const backpack = await this.BPModel.findOne({
      userId,
    }).populate('basket.info');
    if (!backpack) return [];
    return backpack.basket;
  }

  async updateBasket(userId: string, { product, quantity }: { product: Product; quantity: number }) {
    const inBasket = (await this.BPModel.findOne({ userId })) || new this.BPModel({ basket: [], favorite: [], userId });
    const newBasket = inBasket.basket.filter((el) => el.info.toString() !== product.id);
    if (quantity > 0)
      newBasket.push({ info: product.id, quantity, price: product.price, totalPrice: product.price * quantity });
    inBasket.basket = newBasket;
    await inBasket.save();
    await inBasket.populate('basket.info');
    return inBasket.basket;
  }

  async emptyBasket(userId: string) {
    const inBasket = (await this.BPModel.findOne({ userId })) || new this.BPModel({ basket: [], favorite: [] });
    inBasket.basket = [];
    await inBasket.save();
    return inBasket.basket;
  }
}
