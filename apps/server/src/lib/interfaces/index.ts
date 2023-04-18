export interface ProductI {
  title: string;
  image: string;
  description?: string;
  bgColor?: string;
  brand?: string;
  price: number;
  discount?: number;
  sold: number;
  quantity: number;
  status: number;
  supplier: any;
  category: {
    id: string;
    description: string;
    parent: string;
    children: string[];
    name: string;
  }[];
  options: {
    configName: string;
    value: string;
  }[];
  images: {
    url: string;
    blurHash: string;
  }[];
  items: any[];
}

export interface ItemI {
  configName: string;
  altTxt: string;
  image?: string;
  sku: string;
  upc?: string;
  price: number;
  status: number;
  stock: number;
  product?: any;
}

export interface SupabaseJWTPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
  };
  role: string;
  aal: string;
  amr: {
    method: string;
    timestamp: number;
  }[];
  session_id: string;
}
