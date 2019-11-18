import { DisplayMode } from "@microsoft/sp-core-library";
import { IDataProvider } from "../../../data/IDataProvider";
import { BreadcrumbsVisibility } from "./BreadcrumbsVisibility";
import { ContentViewerType } from "./ContentViewerType";

export interface ILinksTreeProps {
  dataProvider: IDataProvider;
  title: string;
  displayMode: DisplayMode;
  onTitleUpdate: (newTitle: string) => void;
  onConfigure: () => void;
  showBreadcrumbs: BreadcrumbsVisibility;
  contentViewerType: ContentViewerType;
}
