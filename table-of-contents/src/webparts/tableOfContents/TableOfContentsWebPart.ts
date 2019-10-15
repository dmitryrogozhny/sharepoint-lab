import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'TableOfContentsWebPartStrings';
import TableOfContents from './components/TableOfContents';
import { ITableOfContentsProps } from './components/ITableOfContentsProps';

export interface ITableOfContentsWebPartProps {
  title: string;
  showHeading1: boolean;
  showHeading2: boolean;
  showHeading3: boolean;
  hideInMobileView: boolean;
}

export default class TableOfContentsWebPart extends BaseClientSideWebPart<ITableOfContentsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ITableOfContentsProps> = React.createElement(
      TableOfContents,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: this.handleUpdateProperty,

        showHeading2: this.properties.showHeading1,
        showHeading3: this.properties.showHeading2,
        showHeading4: this.properties.showHeading3,

        hideInMobileView: this.properties.hideInMobileView,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Saves new value for the title property.
   */
  private handleUpdateProperty = (newValue: string) => {
    this.properties.title = newValue;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneCheckbox('showHeading1', {
                  text: strings.ShowHeading1FieldLabel
                }),
                PropertyPaneCheckbox('showHeading2', {
                  text: strings.ShowHeading2FieldLabel
                }),
                PropertyPaneCheckbox('showHeading3', {
                  text: strings.ShowHeading3FieldLabel
                })
              ]
            },
            {
              groupFields: [
                PropertyPaneToggle('hideInMobileView', {
                  label: strings.HideInMobileViewLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
