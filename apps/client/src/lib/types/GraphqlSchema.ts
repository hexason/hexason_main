/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ProductOptionArgs {
	sort?: Nullable<SortArgs[]>;
	skip?: Nullable<number>;
	take?: Nullable<number>;
}

export interface SortArgs {
	key: string;
	value: string;
}

export interface ProductFilterArgs {
	status?: Nullable<number>;
}

export interface SearchArg {
	query: string;
	page: number;
	limit: number;
	provider: string;
}

export interface BackpackBasketProductAdd {
	productId: string;
	quantity: number;
}

export interface OrderCreateArgument {
	username: string;
	address_city: string;
	address_district: string;
	address_street: string;
	address_info: string;
	contact_phone: string;
	contact_email: string;
	additional_info?: Nullable<string>;
	description?: Nullable<string>;
	items: ItemOrderCreate[];
}

export interface ItemOrderCreate {
	SKU: string;
	quantity: number;
}

export interface AddressInputQL {
	username: string;
	address_city: string;
	address_district: string;
	address_street: string;
	address_info: string;
	contact_phone: string;
	contact_email: string;
}

export interface Supplier {
	id: string;
	name: string;
	description: string;
	logo: string;
	location: string;
	supplierType: string;
	score: number;
}

export interface Category {
	id: string;
	title: string;
	icon?: Nullable<string>;
	slug: string;
	description?: Nullable<string>;
	parent?: Nullable<string>;
	score?: Nullable<number>;
}

export interface Variation {
	configId: string;
	valueId: string;
	configName: string;
	value: string;
	icon?: Nullable<string>;
	mainImage?: Nullable<string>;
}

export interface Product {
	id: string;
	integratedId?: Nullable<string>;
	title: string;
	image: string;
	description?: Nullable<string>;
	bgColor?: Nullable<string>;
	categories: Category[];
	brand?: Nullable<string>;
	price?: Nullable<number>;
	discount?: Nullable<number>;
	sold?: Nullable<number>;
	quantity?: Nullable<number>;
	status?: Nullable<number>;
	supplier: Supplier;
	vendorId?: Nullable<string>;
	vendorName?: Nullable<string>;
	vendorDisplayName?: Nullable<string>;
	vendorScore?: Nullable<number>;
	images: ProductImages[];
	items: Item[];
	variations: Variation[];
	createdAt: string;
}

export interface ProductImages {
	url: string;
	blurHash: string;
}

export interface Item {
	id: string;
	SKU: string;
	UPC?: Nullable<string>;
	variations: Variation[];
	price: number;
	stock: number;
	status: number;
	product: Product;
}

export interface Basket {
	info: Product;
	quantity: number;
	price: number;
	totalPrice: number;
}

export interface CategoryTree {
	id: string;
	title: string;
	icon?: Nullable<string>;
	description?: Nullable<string>;
	children: CategoryTree[];
	score: number;
}

export interface ProductList {
	count: number;
	items: Product[];
}

export interface SearchProductResult {
	count: number;
	items: SearchProduct[];
}

export interface SearchProduct {
	id: string;
	title: string;
	image: string;
	price: number;
	sold: number;
	discount: number;
}

export interface Order {
	id: string;
	shortId: string;
	userId: string;
	username: string;
	address_city: string;
	address_district: string;
	address_street: string;
	address_info: string;
	contact_phone: string;
	contact_email: string;
	additional_info?: Nullable<string>;
	description?: Nullable<string>;
	status: number;
	totalProductPrice: number;
	totalDeliveryPrice: number;
	totalPrice: number;
	paymentStatus: number;
	paidAt?: Nullable<string>;
	createdAt: string;
	updatedAt: string;
	goods: Goods[];
}

export interface Goods {
	id: string;
	order: Order;
	productId: string;
	productImage: string;
	SKU: string;
	productTitle: string;
	productPrice: number;
	productQuantity: number;
	productDetail: string;
	productUrl?: Nullable<string>;
	totalPrice: number;
	status: number;
}

export interface UserAddress {
	id: string;
	username: string;
	address_city: string;
	address_district: string;
	address_street: string;
	address_info: string;
	contact_phone: string;
	contact_email: string;
	createdAt: string;
	updatedAt: string;
}

export interface IQuery {
	getCategories(): Category[] | Promise<Category[]>;
	getCategoryTree(): CategoryTree[] | Promise<CategoryTree[]>;
	getProducts(
		options?: Nullable<ProductOptionArgs>,
		filter?: Nullable<ProductFilterArgs>
	): ProductList | Promise<ProductList>;
	getProductById(id: string): Product | Promise<Product>;
	getHighestViewedProduct(): Product[] | Promise<Product[]>;
	recommendProducts(): Product[] | Promise<Product[]>;
	sponsorProducts(): Product[] | Promise<Product[]>;
	getBasketProducts(): Basket[] | Promise<Basket[]>;
	searchProducts(
		data: SearchArg
	): SearchProductResult | Promise<SearchProductResult>;
	getOrders(): Order[] | Promise<Order[]>;
	getGoods(): Goods[] | Promise<Goods[]>;
	getAllAddress(): UserAddress[] | Promise<UserAddress[]>;
}

export interface IMutation {
	addToBasket(data: BackpackBasketProductAdd): Basket[] | Promise<Basket[]>;
	createOrder(data: OrderCreateArgument): Order | Promise<Order>;
	createAddress(data: AddressInputQL): UserAddress[] | Promise<UserAddress[]>;
	updateAddress(
		id: string,
		data: AddressInputQL
	): UserAddress[] | Promise<UserAddress[]>;
}

type Nullable<T> = T | null;
