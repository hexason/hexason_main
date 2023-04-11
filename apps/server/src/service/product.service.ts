import { Product } from "@/lib/schema/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {} 


  async getProducts() {
    const product = await this.productModel.find({});
    return product;
  }

  async createProduct() {
    
  }
}