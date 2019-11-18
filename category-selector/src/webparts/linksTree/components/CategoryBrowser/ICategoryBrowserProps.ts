import { ICategory } from "../../../../data/ICategory";
import { IContent } from "../../../../data/IContent";
import { BreadcrumbsVisibility } from "../BreadcrumbsVisibility";
import { ContentViewerType } from "../ContentViewerType";

export interface ICategoryBrowserProps {
  selectedCategories: ICategory[];
  categories: ICategory[][];
  content?: IContent;
  onCategorySelect: (selectedCategories: ICategory[]) => void;
  breadcrumbsVisibility: BreadcrumbsVisibility;
  contentViewerType: ContentViewerType;
}
