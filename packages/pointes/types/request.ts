export type CategoryCreateType = {
  name: string;
  description: string;
  parent?: string;
};

export type SupplierCreateType = {
  name: string;
  description: string;
  logo: string;
  location?: string;
};
