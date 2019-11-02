import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";

import * as strings from 'CalendarWebPartStrings';
import Calendar from './components/Calendar';
import { ICalendarProps } from './components/ICalendarProps';
import { IEvent } from './IEvent';

export interface ICalendarWebPartProps {
  title: string;
  listId: string;
}

interface IEventListItem {
  Title: string;
  EventDate: string;
  EndDate: string;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {

  private events: IEvent[] = [];

  protected onInit() {
    return super.onInit().then(() => {
      // init pnp
      pnpSetup({ spfxContext: this.context });

      // get events from the list
      this.getEvents(this.properties.listId);
    });
  }

  public render(): void {
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        onUpdateTitle: this.handleTitleUpdate,
        events: this.events,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Gets events from the specified list
   */
  private getEvents = (listId: string) => {
    if (listId) {
      sp.web.lists.getById(listId).items.getAll().then((eventItems: IEventListItem[]) => {
        // convert list items to events, filter out items that cannot be converted
        // an item cannot be converted if it misses required fields for an event
        this.events = eventItems.map(this.toEvent).filter((event) => (event !== undefined));

        this.render();
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  /**
   * Creates an event from a list item
   */
  private toEvent: (item: IEventListItem) => IEvent | undefined = (item) => {
    if (item.Title && item.EventDate && item.EndDate) {
      return {
        title: item.Title,
        startDate: new Date(item.EventDate),
        endDate: new Date(item.EndDate),
      };
    } else {
      return undefined;
    }
  }

  private handleTitleUpdate = (newTitle: string) => {
    this.properties.title = newTitle;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // check if the events list has been changed
    if (propertyPath === 'listId' && newValue) {
      // get events from the list
      this.getEvents(this.properties.listId);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyFieldListPicker('listId', {
                  label: strings.ListIdFieldLabel,
                  selectedList: this.properties.listId,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  includeHidden: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  deferredValidationTime: 0,
                  key: 'listId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
