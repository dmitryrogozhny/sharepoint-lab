import { IContent } from "../../../../data/IContent";
import { ContentViewerType } from "../ContentViewerType";

export interface IContentViewProps {
  content: IContent | undefined;
  contentViewerType: ContentViewerType;
}
