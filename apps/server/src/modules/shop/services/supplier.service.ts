import { Supplier } from '../models';
import { SupplierCreateType } from 'pointes';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectDataSource } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { DataSource } from 'typeorm';

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
}
