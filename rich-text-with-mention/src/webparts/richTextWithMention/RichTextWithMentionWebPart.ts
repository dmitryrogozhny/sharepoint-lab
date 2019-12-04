import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';

import RichTextWithMention from './components/RichTextWithMention';
import { IRichTextWithMentionProps } from './components/IRichTextWithMentionProps';

import { Providers, SharePointProvider } from '@microsoft/mgt/dist/commonjs';

import SPPeopleSearchService from '@pnp/spfx-controls-react/lib/services/PeopleSearchService';
import { PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';

export interface IRichTextWithMentionWebPartProps {
  /**
   * Storing content in Quill Delta format
   */
  deltaContent: string;
  /**
   * Storing content in Html format
   */
  htmlContent: string;
}

export default class RichTextWithMentionWebPart extends BaseClientSideWebPart<IRichTextWithMentionWebPartProps> {
  private peopleSearchService: SPPeopleSearchService;

  protected onInit(): Promise<void> {
    // Initialize SharePoint provider for Microsoft Graph Toolkit
    Providers.globalProvider = new SharePointProvider(this.context);
    // Initialize service for people search
    this.peopleSearchService = new SPPeopleSearchService(this.context);

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IRichTextWithMentionProps> = React.createElement<IRichTextWithMentionProps>(
      RichTextWithMention,
      {
        isEditing: this.displayMode === DisplayMode.Edit,
        deltaContent: this.properties.deltaContent,
        onChange: this.handleContentChange,
        htmlContent: this.properties.htmlContent,
        onSearch: this.handleSearch,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Return users list for a search query.
   */
  private handleSearch = async (searchQuery: string): Promise<Array<{ email: string, name: string }>> => {
    return await this.peopleSearchService.searchPeople(searchQuery, 100, [PrincipalType.User]).then((users) => {
      // return id and email
      return users.map((user) => ({
        email: user.secondaryText,
        name: user.text,
      }));
    });
  }

  /**
   * Saves the updated content to the web part properties
   */
  private handleContentChange = (newDeltaContent: string, newHtmlContent: string) => {
    this.properties.deltaContent = newDeltaContent;
    this.properties.htmlContent = newHtmlContent;
    this.render();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
