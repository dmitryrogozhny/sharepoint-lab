import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

import * as strings from 'LinksTreeWebPartStrings';
import JsonDataProvider from '../../data/JsonDataProvider';
import LinksTree from './components/LinksTree';
import { ILinksTreeProps } from './components/ILinksTreeProps';
import { BreadcrumbsVisibility } from './components/BreadcrumbsVisibility';
import { ContentViewerType } from './components/ContentViewerType';

export interface ILinksTreeWebPartProps {
  jsonCategories: string;
  title: string;
  showBreadcrumbs: BreadcrumbsVisibility;
  contentViewerType: ContentViewerType;
}

export default class LinksTreeWebPart extends BaseClientSideWebPart<ILinksTreeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILinksTreeProps> = React.createElement(
      LinksTree,
      {
        dataProvider: new JsonDataProvider(this.properties.jsonCategories),
        title: this.properties.title,
        displayMode: this.displayMode,
        onTitleUpdate: this.handleTitleUpdate,
        onConfigure: this.handleConfigure,
        showBreadcrumbs: this.properties.showBreadcrumbs,
        contentViewerType: this.properties.contentViewerType,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Handles the event that updates the title property.
   */
  private handleTitleUpdate = (newTitle: string) => {
    this.properties.title = newTitle;
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
                PropertyPaneDropdown('showBreadcrumbs', {
                  label: strings.ShowBreadcrumbFieldLabel,
                  options: [
                    {
                      index: 0,
                      text: strings.ShowBreadcrumbFieldOptionOn,
                      key: BreadcrumbsVisibility.On,
                    },
                    {
                      index: 1,
                      text: strings.ShowBreadcrumbFieldOptionOnMobile,
                      key: BreadcrumbsVisibility.OnForMobile,
                    },
                    {
                      index: 2,
                      text: strings.ShowBreadcrumbFieldOptionOff,
                      key: BreadcrumbsVisibility.Off,
                    },
                  ]
                }),
                PropertyPaneDropdown('contentViewerType', {
                  label: strings.ContentViewerTypeFieldLabel,
                  options: [
                    {
                      index: 0,
                      text: strings.ContentViewerTypeFieldIframe,
                      key: ContentViewerType.Iframe,
                    },
                    {
                      index: 1,
                      text: strings.ContentViewerTypeFieldLinksList,
                      key: ContentViewerType.LinksList,
                    },
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
