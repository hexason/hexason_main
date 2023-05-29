import { Category, CategoryItem, SubCategory } from "./type";

const categoryItem1: CategoryItem = {
	id: "1",
	name: "Category Item 1",
};

const categoryItem2: CategoryItem = {
	id: "2",
	name: "Category Item 2",
};

const subCategory1: SubCategory = {
	id: "1",
	name: "Sub Category 1",
	CategoryItems: [categoryItem1, categoryItem2],
};

const subCategory2: SubCategory = {
	id: "2",
	name: "Sub Category 2",
	CategoryItems: [categoryItem1],
};

const category1: Category = {
	id: "1",
	name: "Category 1",
	SubCategories: [subCategory1, subCategory2],
};

const category2: Category = {
	id: "2",
	name: "Category 2",
	SubCategories: [subCategory1],
};

const category3: Category = {
	id: "3",
	name: "Category 3",
	SubCategories: [subCategory1, subCategory2],
};
const category4: Category = {
	id: "4",
	name: "Category 4",
	SubCategories: [subCategory1, subCategory2],
};
const category5: Category = {
	id: "5",
	name: "Category 5",
	SubCategories: [subCategory1, subCategory2],
};
const category6: Category = {
	id: "6",
	name: "Category 6",
	SubCategories: [subCategory1, subCategory2],
};
const category7: Category = {
	id: "7",
	name: "Category 7",
	SubCategories: [subCategory1, subCategory2],
};
const category8: Category = {
	id: "8",
	name: "Category 8",
	SubCategories: [subCategory1, subCategory2],
};
const category9: Category = {
	id: "9",
	name: "Category 9",
	SubCategories: [subCategory1, subCategory2],
};
const category10: Category = {
	id: "10",
	name: "Category 10",
	SubCategories: [subCategory1, subCategory2],
};

const category11: Category = {
	id: "11",
	name: "Category 11",
	SubCategories: [subCategory1, subCategory2],
};
const category12: Category = {
	id: "12",
	name: "Category 12",
	SubCategories: [subCategory1, subCategory2],
};
const category13: Category = {
	id: "13",
	name: "Category 13",
	SubCategories: [subCategory1, subCategory2],
};
const category14: Category = {
	id: "14",
	name: "Category 14",
	SubCategories: [subCategory1, subCategory2],
};
const category15: Category = {
	id: "15",
	name: "Category 15",
	SubCategories: [subCategory1, subCategory2],
};

export const testCategories: Category[] = [
	category1,
	category2,
	category3,
	category4,
	category5,
	category6,
	category7,
	category8,
	category9,
	category10,
	category11,
	category12,
	category13,
	category14,
	category15,
];
