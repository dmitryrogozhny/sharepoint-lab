import { ICategory } from "../../../../data/ICategory";

export interface IBreadcrumbProps {
  path: ICategory[];
  onClick: (selectedPath: ICategory[]) => void;
}
