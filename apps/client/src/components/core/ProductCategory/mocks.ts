import { CategoryItem } from "./type";

const categoryItem1: CategoryItem = {
  id: "1",
  title: "Category Item 1",
};

const categoryItem2: CategoryItem = {
  id: "2",
  title: "Category Item 2",
};

const subCategory1: CategoryItem = {
  id: "1",
  title: "Sub Category 1",
  children: [categoryItem1, categoryItem2],
};

const subCategory2: CategoryItem = {
  id: "2",
  title: "Sub Category 2",
  children: [categoryItem1],
};

const category1: CategoryItem = {
  id: "1",
  title: "Category 1",
  children: [subCategory1, subCategory2],
};

const category2: CategoryItem = {
  id: "2",
  title: "Category 2",
  children: [subCategory1],
};

const category3: CategoryItem = {
  id: "3",
  title: "Category 3",
  children: [subCategory1, subCategory2],
};
const category4: CategoryItem = {
  id: "4",
  title: "Category 4",
  children: [subCategory1, subCategory2],
};
const category5: CategoryItem = {
  id: "5",
  title: "Category 5",
  children: [subCategory1, subCategory2],
};
const category6: CategoryItem = {
  id: "6",
  title: "Category 6",
  children: [subCategory1, subCategory2],
};
const category7: CategoryItem = {
  id: "7",
  title: "Category 7",
  children: [subCategory1, subCategory2],
};
const category8: CategoryItem = {
  id: "8",
  title: "Category 8",
  children: [subCategory1, subCategory2],
};
const category9: CategoryItem = {
  id: "9",
  title: "Category 9",
  children: [subCategory1, subCategory2],
};
const category10: CategoryItem = {
  id: "10",
  title: "Category 10",
  children: [subCategory1, subCategory2],
};

const category11: CategoryItem = {
  id: "11",
  title: "Category 11",
  children: [subCategory1, subCategory2],
};
const category12: CategoryItem = {
  id: "12",
  title: "Category 12",
  children: [subCategory1, subCategory2],
};
const category13: CategoryItem = {
  id: "13",
  title: "Category 13",
  children: [subCategory1, subCategory2],
};
const category14: CategoryItem = {
  id: "14",
  title: "Category 14",
  children: [subCategory1, subCategory2],
};
const category15: CategoryItem = {
  id: "15",
  title: "Category 15",
  children: [subCategory1, subCategory2],
};

export const testCategories: CategoryItem[] = [
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
