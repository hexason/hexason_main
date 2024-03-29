import { SupplierState } from "../constant/TypeConstant";
import { CommentI } from "./Comment";

export interface SupplierI {
  name: string;
  bio: string;
  logo: string;
  slug: string;
  state: keyof typeof SupplierState;
  score: 0;
  comments: CommentI[];
}
