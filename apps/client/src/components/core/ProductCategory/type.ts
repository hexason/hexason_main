import { type } from "os";

export type HomeHighlightType = {
	name1: string;
	name2: string;
	color: string;
	size: number;
	data: Array<HighlightCard>;
};
export type HighlightCard = {
	id: number;
	name: string;
	imgUrl: string;
};

export type CategoryItem = {
	id: string;
	name: string;
};

export type SubCategory = CategoryItem & {
	CategoryItems: Array<CategoryItem>;
};

export type Category = CategoryItem & {
	SubCategories: Array<SubCategory>;
};