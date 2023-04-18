import { ItemI } from '@/lib/interfaces';
import { Item } from '@/lib/schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async getItemsByProductId(id: string) {
    const items = await this.itemModel.find({ product: id });
    return items;
  }

  createItemModel(data: ItemI) {
    const item = new this.itemModel(data);
    return item;
  }
}
