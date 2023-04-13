import { Role, SupplierAdmin } from "@/lib/models";
import { Supplier } from "@/lib/schema";
import { SupplierCreateType } from "@/lib/types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectDataSource } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SupplierService {
  supplierRepo: Repository<SupplierAdmin>
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
    this.supplierRepo = this.dataSource.getRepository(SupplierAdmin);
  }

  async createSupplier({
    name,
    description,
    logo,
    location
  }: SupplierCreateType) {
    if (await this.supplierModel.findOne({ name })) throw { code: "DUPLICAPLE_DATA", message: "Supplier already there" }
    const supplier = new this.supplierModel({
      name,
      description,
      logo,
      location,
    });
    await supplier.save();
    return supplier;
  }

  async addAdminToSupplier({ id, adminId, roleId }: any) {
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) throw { code: "NOT_FOUND_DATA", message: "SUPPLIER not found" }

    const role = await this.dataSource.getRepository(Role).findOneBy({id: roleId})
    if (!role) throw { code: "NOT_FOUND_DATA", message: "Role not found" }

    let adminSupplier = await this.supplierRepo.findOneBy({
      supplierId: id,
      id: adminId,
      role: role
    });
    if (!adminSupplier) adminSupplier = this.supplierRepo.create({
      supplierId: id,
      id: adminId,
      role: role
    })

    return adminSupplier;
  }
}