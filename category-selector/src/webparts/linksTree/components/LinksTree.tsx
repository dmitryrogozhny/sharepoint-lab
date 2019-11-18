import * as React from 'react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { ILinksTreeProps } from './ILinksTreeProps';
import { ILinksTreeState } from './ILinksTreeState';
import { IDataProvider } from '../../../data/IDataProvider';
import CategoryBrowser from './CategoryBrowser/CategoryBrowser';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ICategory } from '../../../data/ICategory';
import { IContent } from '../../../data/IContent';

/**
 * The stateful component responsible for the state and data management.
 * Renders CategoryBrowser representational compenent to display data.
 */
export default class LinksTree extends React.Component<ILinksTreeProps, ILinksTreeState> {
  constructor(props: ILinksTreeProps) {
    super(props);

    this.state = {
      categories: [],
      selectedCategories: [],
      content: undefined,
    };
  }

  /**
   * Returns a list of categories for the provided path.
   *
   * @param dataProvider Data provider.
   * @param selectedCategories List of categories for the selected path.
   */
  private getCategories(dataProvider: IDataProvider, selectedCategories: ICategory[]): Promise<ICategory[][]> {
    return new Promise<ICategory[][]>((resolve, reject) => {
      const promises = [];

      // get the list of categories for the root-level
      promises.push(dataProvider.getRoot());

      // for every selected category, get the list of its sub-categories
      for (let i = 0; i < selectedCategories.length; i++) {
        promises.push(dataProvider.getByPath(selectedCategories.slice(0, i + 1)));
      }

      // return all the data at once
      Promise.all(promises).then((categories) => {
        resolve(categories);
      });
    });
  }

  /**
   * Returns the content for the selected path.
   *
   * @param dataProvider Data provider to request data.
   * @param selectedCategories List of selected categories.
   */
  private getContent(dataProvider: IDataProvider, selectedCategories: ICategory[]): Promise<IContent | undefined> {
    return new Promise<IContent | undefined>((resolve, reject) => {
      dataProvider.getContent(selectedCategories).then((content) => {
        resolve(content);
      });
    });
  }

  /**
   * Sets the currently selected path to the hash part of the Url.
   */
  private setLocationHash = (newPath: ICategory[]) => {
    const hash = newPath.map((path) => encodeURIComponent(path.key)).join('&');
    window.location.hash = `path=${hash}`;
  }

  /**
   * Gets the path from the hash part of the Url and returns the categories for the specified path.
   * the hash looks like: #path=Category&Sub-category&Sub-sub-category
   */
  private restoreSelectedCategories(): Promise<ICategory[]> {
    return new Promise<ICategory[]>((resolve, reject) => {
      const pathParts = window.location.hash.split('path=');
      const path = (pathParts.length > 1) ? pathParts[1] : '';

      if (path !== '') {
        const keys = path.split('&').map((key) => decodeURIComponent(key));
        this.props.dataProvider.getCategoriesByKeys(keys).then((categories) => {
          resolve(categories);
        });
      } else {
        resolve([]);
      }
    });
  }

  /**
   * Retrieves data for the selected categories and updates the state.
   *
   * @param dataProvider Data provider.
   * @param selectedCategories List of selected categories.
   */
  private setCategoriesAndContent(dataProvider: IDataProvider, selectedCategories: ICategory[]) {
    Promise.all([
      this.getCategories(dataProvider, selectedCategories),
      this.getContent(dataProvider, selectedCategories),
    ]).then(([categories, content]) => {
      this.setState({
        categories,
        selectedCategories,
        content,
      });
    });
  }

  public componentDidMount() {
    const { dataProvider } = this.props;

    this.restoreSelectedCategories().then((selectedCategories) => {
      this.setCategoriesAndContent(dataProvider, selectedCategories);
    });
  }

  public componentDidUpdate(oldProps: ILinksTreeProps) {
    // If the data provider has been changed (e.g. web part properties have been updated), render the component
    if (oldProps.dataProvider !== this.props.dataProvider) {
      const { dataProvider } = this.props;
      const selectedCategories = [];

      this.setCategoriesAndContent(dataProvider, selectedCategories);
    }
  }

  /**
   * Sets the newly selected path in the state and updates the content.
   */
  private setSelectedCategories = (newPath: ICategory[]) => {
    this.setState({ selectedCategories: [...newPath] }, () => {
      const { dataProvider } = this.props;
      const { selectedCategories } = this.state;

      this.setCategoriesAndContent(dataProvider, selectedCategories);
    });
  }

  /**
   * Handles the selection of a category
   */
  private handleCategorySelected = (newPath: ICategory[]) => {
    this.setSelectedCategories(newPath);
    this.setLocationHash(newPath);
  }

  /**
   * If the data is available, renders the CategoryBrowser component; otherwise renders the Placeholder asking for the configuration.
   */
  private renderBrowser(): React.ReactElement<ILinksTreeProps> {
    if (this.state.categories.length !== 0 && this.state.categories[0].length !== 0) {
      return (
        <div>
          <WebPartTitle
            displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.onTitleUpdate}
          />
          <CategoryBrowser
            selectedCategories={this.state.selectedCategories}
            categories={this.state.categories}
            onCategorySelect={this.handleCategorySelected}
            content={this.state.content}
            breadcrumbsVisibility={this.props.showBreadcrumbs}
            contentViewerType={this.props.contentViewerType}
          />
        </div>);
    } else {
      return (
        <Placeholder
          iconName='Edit'
          iconText='Configure categories to display'
          description='Please configure the categories and links to display.'
          buttonLabel='Configure'
          onConfigure={this.props.onConfigure}
          hideButton={this.props.displayMode === DisplayMode.Read}
        />
      );
    }
  }

  public render(): React.ReactElement<ILinksTreeProps> {
    return (
      <div>
        {this.renderBrowser()}
      </div>
    );
  }
}
