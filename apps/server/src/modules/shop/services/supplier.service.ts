import { SupplierCreateType } from 'pointes';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectDataSource } from '@nestjs/typeorm';
import { Model, Types, Document } from 'mongoose';
import { DataSource } from 'typeorm';
import { Supplier } from '../models/supplier.model';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async createSupplier({ name, description, logo, location }: SupplierCreateType) {
    if (await this.supplierModel.findOne({ name }))
      throw { code: 'DUPLICAPLE_DATA', message: 'Supplier already there' };
    const supplier = new this.supplierModel({
      name,
      description,
      logo,
      location,
    });
    await supplier.save();
    return supplier;
  }

  async getSupplier() {
    const suppliers = await this.supplierModel.find().sort({ createAt: 'desc' });
    const count = suppliers.length;
    return {
      suppliers,
      count,
    };
  }

  async getSupplierById(id: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw { code: 'FORMAT', message: 'Check supplier id carefully' };
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) throw { code: 'NOT_FOUND_DATA', message: 'Supplier not found' };
    return supplier;
  }
  modifyModel(model: Document & Supplier, { key, value }: { key: keyof Supplier | string; value: any }) {
    if (value) model[key] = value;
    return model;
  }
  async updateSupplier(supplier: Document & Supplier, data: Partial<Supplier>) {
    Object.keys(data).forEach((e) => {
      this.modifyModel(supplier, { key: e, value: data[e] });
    });
    await supplier.save();
    return supplier;
  }
  s;
}
