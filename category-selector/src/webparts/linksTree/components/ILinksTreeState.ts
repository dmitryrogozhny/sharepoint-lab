import { ICategory } from "../../../data/ICategory";
import { IContent } from "../../../data/IContent";

export interface ILinksTreeState {
  categories: ICategory[][];
  selectedCategories: ICategory[];
  content?: IContent;
}
