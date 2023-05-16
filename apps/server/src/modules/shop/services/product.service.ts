import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types, Document } from 'mongoose';
import { ItemI, ProductI } from 'pointes';
import { Item, Product } from '../models';
import { ProductListArgs } from '../validation/ProductArgs';

export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getProducts(option?: { filter?: Partial<ProductI>; limit?: ProductListArgs }) {
    const items = await this.productModel
      .find(option?.filter, {}, option?.limit)
      .sort({ status: 'asc', createdAt: 'desc' })
      .populate(['supplier', 'categories']);
    const count = await this.productModel.count(option?.filter);
    return {
      items,
      count,
    };
  }

  async getOneProductById(id: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw { code: 'FORMAT', message: 'Check product id carefully' };
    const product = await this.productModel.findById(id).populate(['supplier', 'categories', 'items']);
    if (!product) throw { code: 'NOT_FOUND_DATA', message: 'Product not found' };
    return product;
  }

  modifyModel(model: Document & Product, { key, value }: { key: keyof Product | string; value: any }) {
    if (value) model[key] = value;
    else if (key === 'status' && (value === 0 || Number.isInteger(value))) model[key] = value;
    return model;
  }

  async updateProduct(product: Document & Product, productData: Partial<Product>) {
    Object.keys(productData).forEach((e) => {
      this.modifyModel(product, { key: e, value: productData[e] });
    });
    await product.save();
    return product;
  }

  async createProduct({
    title,
    image,
    description,
    bgColor,
    categories,
    brand,
    price,
    discount,
    status,
    supplier, // from token
    images,
    items,
  }: ProductI) {
    if (!Types.ObjectId.isValid(supplier as any)) throw { code: 'FORMAT', message: 'Supplier is not valid ID' };
    const product = new this.productModel({
      title,
      image,
      description,
      bgColor,
      categories,
      brand,
      price,
      discount,
      status,
      supplier,
      images,
    });
    const newItems = items.map((item) => new this.itemModel(item));
    product.items = newItems.map((it) => it._id);

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      await product.save({ session });
      await this.itemModel.bulkSave(newItems, { session });
      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }

    return product;
  }

  async productCatchupItemData(id: string | Types.ObjectId) {
    const product = await this.getOneProductById(id);
    const items = product.items;
    let quantity = 0;
    items.forEach((item: ItemI) => {
      quantity += item.stock;
      product.price = Math.min(product.price, item.price);
    });
    product.quantity = quantity;
    await product.save();

    return product;
  }
}
