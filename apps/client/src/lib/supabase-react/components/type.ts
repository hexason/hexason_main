export type AdminType = {
  id: string;
  name: string;
  username: string;
  email: string;
  credential: string;
  role?: any;
  supplier: {
    id: string;
    supplierId: string;
    role: {
      id: string;
      name: string;
      permissions: {
        id: number;
        key: string;
        code: number;
      }[];
    };
  }[];
};

export type UserType = {
  email: string;
  phone: string;
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
};
