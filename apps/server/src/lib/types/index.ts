import { Types } from "mongoose";

export type CategoryCreateType = {
  name: string;
  description: string;
  parent?: string | Types.ObjectId;
}

export type SupplierCreateType = {
  name: string,
  description: string,
  logo: string,
  location?: string;
}