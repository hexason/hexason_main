import { Item, Product } from '../models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}

  async getItemsByProductId(id: string) {
    const items = await this.itemModel.find({ product: id });
    return items;
  }

  async createItemModel(data: Partial<Item>) {
    const item = new this.itemModel(data);
    await item.populate('product');
    const product = item.product as Document & Product;
    product.items.push(item);
    await item.save();
    await product.save();
    // const productId = data.product as Types.ObjectId;

    return item;
  }
}
