import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'VideoWebPartStrings';
import Video from './components/Video';
import { IVideoProps } from './components/IVideoProps';

export interface IVideoWebPartProps {
  title: string;
  videoLink: string;
  posterLink: string;
  link: string;
  addFilter: boolean;
  addTextOver: boolean;
}

export default class VideoWebPart extends BaseClientSideWebPart<IVideoWebPartProps> {

  public render(): void {
    const { videoLink, posterLink, link, addTextOver, title, addFilter } = this.properties;

    const element: React.ReactElement<IVideoProps> = React.createElement(
      Video, {
      videoLink,
      posterLink,
      link,
      addTextOver,
      title,
      addFilter,
      onConfigure: this.handleConfigure,
      isEditing: this.displayMode === DisplayMode.Edit
    }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Opens the configuration pane.
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
                PropertyPaneTextField('videoLink', {
                  label: strings.VideoLinkFieldLabel
                }),
                PropertyPaneTextField('posterLink', {
                  label: strings.PosterLinkFieldLabel
                }),
                PropertyPaneTextField('link', {
                  label: strings.LinkFieldLabel
                }),
                PropertyPaneToggle('addTextOver', {
                  label: strings.AddTextOverFieldLabel, checked: this.properties.addTextOver
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneToggle('addFilter', {
                  label: strings.AddFilterFieldLabel, checked: this.properties.addFilter
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
