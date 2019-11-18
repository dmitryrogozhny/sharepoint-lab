import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

import * as strings from 'LinksListWebPartStrings';
import LinksList from './components/LinksList';
import { ILinksListProps } from './components/ILinksListProps';
import JsonDataProvider from '../../data/JsonDataProvider';

export interface ILinksListWebPartProps {
  jsonCategories: string;
  baseUrl: string;
}

export default class LinksListWebPart extends BaseClientSideWebPart<ILinksListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILinksListProps> = React.createElement(
      LinksList,
      {
        dataProvider: new JsonDataProvider(this.properties.jsonCategories),
        baseUrl: this.properties.baseUrl,
        displayMode: this.displayMode,
        onConfigure: this.handleConfigure,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
 * Opens the property pane on the configure event.
 */
  private handleConfigure = () => {
    this.context.propertyPane.open();
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
                PropertyFieldCodeEditor('jsonCategories', {
                  label: strings.JsonCategoriesFieldLabel,
                  panelTitle: strings.JsonCategoriesFieldLabel,
                  initialValue: this.properties.jsonCategories,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'jsonCategories',
                  language: PropertyFieldCodeEditorLanguages.JSON,
                }),
                PropertyPaneTextField('baseUrl', {
                  label: strings.BaseUrlFieldLabel,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
