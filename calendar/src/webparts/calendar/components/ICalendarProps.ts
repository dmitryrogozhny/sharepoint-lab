import { DisplayMode } from '@microsoft/sp-core-library';
import { IEvent } from '../IEvent';

export interface ICalendarProps {
  title: string;
  displayMode: DisplayMode;
  onUpdateTitle: (newTitle: string) => void;
  events: IEvent[];
}
