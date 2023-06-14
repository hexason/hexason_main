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

  async getItemBySKU(sku: string) {
    const item = await this.itemModel.findOne({ SKU: sku }).populate('product');
    return item;
  }

  async getItemsBySKU(skus: string[]) {
    const items = await this.itemModel.find({ SKU: { $in: skus } }).populate('product');
    return items;
  }

  async createItemModel(data: Partial<Item>) {
    const item = new this.itemModel(data);
    await item.populate('product');
    const product = item.product as Document & Product;
    product.items.push(item);
    const variationHash = item.variations.reduce((acc, itt) => {
      acc[`${itt.configId}${itt.valueId}`] = itt;
      return acc;
    }, {});
    product.variations = Object.values(variationHash);
    await item.save();
    await product.save();

    return item;
  }
}
