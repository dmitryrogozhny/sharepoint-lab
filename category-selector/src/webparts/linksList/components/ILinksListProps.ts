import { IDataProvider } from "../../../data/IDataProvider";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface ILinksListProps {
  dataProvider: IDataProvider;
  baseUrl: string;
  displayMode: DisplayMode;
  onTitleUpdate: (newTitle: string) => void;
  onConfigure: () => void;
}
