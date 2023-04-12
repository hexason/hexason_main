import { Supplier } from "@/lib/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>) { }

  async createSupplier({
    name,
    description,
    logo,
    location
  }:any) {
    if(await this.supplierModel.findOne({name})) throw {code: "DUPLICAPLE_DATA", message: "Supplier already there"}
    const supplier = new this.supplierModel({
      name,
      description,
      logo,
      location,
    });
    await supplier.save();

    return supplier;
  }
}