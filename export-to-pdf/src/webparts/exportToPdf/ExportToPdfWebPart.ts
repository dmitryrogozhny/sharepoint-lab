import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { sp } from "@pnp/sp";

import * as strings from 'ExportToPdfWebPartStrings';
import ExportToPdf from './components/ExportToPdf';
import { IExportToPdfProps } from './components/IExportToPdfProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IExportToPdfWebPartProps {
  listTitle: string;
}

export default class ExportToPdfWebPart extends BaseClientSideWebPart<IExportToPdfWebPartProps> {
  protected onInit() {
    // initialize the PnP Js
    sp.setup({
      spfxContext: this.context
    });

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IExportToPdfProps> = React.createElement<IExportToPdfProps>(
      ExportToPdf,
      {
        listTitle: this.properties.listTitle,
        httpGet: this.httpGet,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Wraps the http get function.
   */
  private httpGet = (url: string): Promise<HttpClientResponse> => { return this.context.httpClient.get(url, HttpClient.configurations.v1); };

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
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('listTitle', {
                  label: strings.ListTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
