import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types, Document } from 'mongoose';
import { ItemI, ProductI } from 'pointes';
import { Item, Product } from '../models';
import { SortArgs } from '../validation/ProductArgs';
import { Inject, Optional } from '@nestjs/common';

type getProductType = { filter?: Partial<ProductI>; skip?: number; take?: number; sort?: SortArgs[] };
export class ProductService {
  constructor(
    @Optional() @Inject('TAOBAO_INTEGRAION') private readonly TaobaoIntegration: any,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getProducts(option?: Partial<getProductType>) {
    const items = await this.productModel
      .find(
        option?.filter || {},
        {},
        {
          skip: option?.skip,
          take: option?.take,
          sort: option?.sort?.reduce((att, itt) => ({ ...att, [itt.key]: itt.value }), {}),
        },
      )
      .sort({ status: 'asc', createdAt: 'desc' })
      .populate(['supplier', 'categories']);

    const count = await this.productModel.count(option?.filter);
    return {
      items,
      count,
    };
  }

  async getOneProductBy(query: any) {
    const product = await this.productModel.findOne(query).populate(['supplier', 'categories', 'items']);
    if (!product) throw { code: 'NOT_FOUND_DATA', message: 'Product not found' };
    return product;
  }

  async getOneProductById(id: string | Types.ObjectId) {
    let product: any;
    if (Types.ObjectId.isValid(id))
      product = await this.productModel.findById(id).populate(['supplier', 'categories', 'items']);
    if (!product) {
      if (this.TaobaoIntegration) product = await this.getIntegratedProduct(id as string);
      else throw { code: 'NOT_FOUND', message: 'Not found product' };
    }
    return product;
  }

  async getIntegratedProduct(id: string) {
    let product;
    try {
      product = await this.getOneProductBy({
        integratedId: id,
      });
    } catch (e) {
      const taoproduct = await this.TaobaoIntegration.getItemByTaoId(id);
      console.log(taoproduct.Id);
      if (!taoproduct) throw { code: 'NOT_FOUND', message: 'Not found product' };
      console.log(taoproduct.Price.ConvertedPriceList.Internal.Price);
      const created = await this.createProduct({
        title: taoproduct.Title,
        integratedId: id,
        image: taoproduct.MainPictureUrl,
        description: taoproduct.Description,
        bgColor: '#f57c00',
        categories: [],
        brand: 'taobao',
        price: taoproduct.Price.ConvertedPriceList.Internal.Price,
        discount: 0,
        status: 12,
        supplier: '64364d4829aeda71de8a6fa6',
        images: taoproduct.Images.map((el: string) => ({ url: el })),
        items: [],
      });
      product = await this.productModel.findById(created._id.toString()).populate(['supplier', 'categories', 'items']);
    }
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
    integratedId,
    categories,
    brand,
    price,
    discount,
    status,
    supplier, // from token
    images,
    items,
  }: Partial<Product> & { items: any[] }) {
    if (!Types.ObjectId.isValid(supplier as any)) throw { code: 'FORMAT', message: 'Supplier is not valid ID' };
    const product = new this.productModel({
      title,
      image,
      description,
      bgColor,
      categories,
      integratedId,
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
      throw e;
    } finally {
      session.endSession();
    }

    return product;
  }

  async productCatchupItemData(id: string | Types.ObjectId) {
    const product = await this.productModel.findById(id);
    if (!product) return;
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
