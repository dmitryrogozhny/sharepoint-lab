import { DisplayMode } from "@microsoft/sp-core-library";

export interface ITableOfContentsProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

  showHeading2: boolean;
  showHeading3: boolean;
  showHeading4: boolean;

  hideInMobileView: boolean;
}
