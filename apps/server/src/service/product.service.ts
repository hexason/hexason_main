import { ProductAddDTO } from "@/controller/dto/ProductControllerDto";
import { ProductI } from "@/lib/interfaces";
import { Item } from "@/lib/schema";
import { Product } from "@/lib/schema/product.model";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model, Types, Document } from "mongoose";

export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    @InjectConnection() private readonly connection: Connection
  ) { }

  async getProducts() {
    const product = await this.productModel.find({})
      .populate(["supplier", "category"]);
    return product;
  }

  async getOneProductById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw { code: "FORMAT", message: "Check product id carefully" }
    const product = await this.productModel.findById(id).populate(["supplier", "category", "items"]);
    if (!product) throw { code: "NOT_FOUND_DATA", message: "Product not found" }
    return product;
  }

  modifyModel(model: Document & Product, { key, value }: { key: keyof Product | string, value: any }) {
    if (value) model[key] = value;
    else if(key === "status" && (value === 0 || Number.isInteger(value))) model[key] = value;
    return model;
  }

  async updateProduct(product: Document & Product, productData: Partial<Product>) {
    Object.keys(productData).forEach(e => {
      this.modifyModel(product, { key: e, value: productData[e] })
    });
    await product.save();
    return product;
  }

  async createProduct({
    title,
    image,
    description,
    bgColor,
    category,
    brand,
    price,
    discount,
    status,
    options,
    supplier, // from token
    images,
    items
  }: ProductI) {
    if (!Types.ObjectId.isValid(supplier as any)) throw { code: "FORMAT", message: "Supplier is not valid ID" }
    let product = new this.productModel({
      title,
      image,
      description,
      bgColor,
      category,
      brand,
      price,
      discount,
      status,
      supplier,
      options,
      images,
    });
    const newItems = items.map(item => new this.itemModel(item));
    product.items = newItems.map(it => it._id);

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      await product.save({ session });
      await this.itemModel.bulkSave(newItems, { session });
      await session.commitTransaction()
    } catch (e) {
      await session.abortTransaction()
    } finally {
      session.endSession();
    }

    return product;
  }
}