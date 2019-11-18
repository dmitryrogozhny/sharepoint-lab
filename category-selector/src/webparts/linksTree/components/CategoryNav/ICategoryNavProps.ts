import { ICategory } from "../../../../data/ICategory";

export interface ICategoryNavProps {
  categories: ICategory[];
  selectedCategory?: ICategory;
  header: string;
  onCategoryClick: (selectedCategory: ICategory) => void;
}
