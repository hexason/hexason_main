export type FavoriteProviderProps = { children: React.ReactNode };

export type Product = {
	id: string;
	title: string;
	image: string;
	price: string;
};

export type UpdateProduct = {
	productId: string;
	type: "add" | "remove";
};

export type Actions = "update" | "open" | "close";

export type Action = {
	type: Actions;
	products?: Array<Product>;
};

export type Favorite = {
	products: Array<Product>;
	isOpen: boolean;
};

export interface FavoriteContextInterface {
	favorite: Favorite;
	loading: boolean;
	updateLoading: boolean;
	favoriteController: (action: Actions) => void;
	updateProduct: (product: UpdateProduct) => void;
	onClose: () => void;
	onOpen: () => void;
	count: number;
}
