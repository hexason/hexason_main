export type BasketProviderProps = { children: React.ReactNode };

export type Product = {
  info: {
    id: string;
    title: string;
    image: string;
  };
  price: string;
  quantity: number;
};

export type UpdateProduct = {
  productId: string;
  quantity: number;
};

export type Actions = "update" | "open" | "close";

export type Action = {
  type: Actions;
  products?: Array<Product>;
};

export type Basket = {
  products: Array<Product>;
  isOpen: boolean;
};

export interface BasketContextInterface {
  basket: Basket;
  loading: boolean;
  updateLoading: boolean;
  basketController: (action: Actions) => void;
  updateProduct: (product: UpdateProduct) => void;
  onClose: () => void;
  onOpen: () => void;
  count: number;
}
