import { type } from "os";

export type HomeHighlightType = {
  name1: string;
  name2: string;
  color: string;
  size: number;
  data: Array<HighlightCard>;
};
export type HighlightCard = {
  id: string;
  name: string;
  imgUrl: string;
};

export type CategoryItem = {
  id: string;
  title: string;
  icon?: string;
  children?: Array<CategoryItem>;
};
