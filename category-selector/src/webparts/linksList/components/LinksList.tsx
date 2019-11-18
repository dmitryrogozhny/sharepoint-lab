import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import styles from './LinksList.module.scss';
import { ILinksListProps } from './ILinksListProps';
import { ILinksListState } from './ILinksListState';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ICategory } from '../../../data/ICategory';

/**
 * Renders a list of links. Clicking on an link navigates to a new page.
 * Url of the page is defined by the baseUrl and a particular path defined by the category's key.
 */
export default class LinksList extends React.Component<ILinksListProps, ILinksListState> {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  /**
   * Gets a list of categories to display
   */
  private getData() {
    this.props.dataProvider.getRoot().then((categories) => {
      this.setState({
        categories,
      });
    });
  }

  public componentDidMount() {
    this.getData();
  }

  public componentDidUpdate(oldProps: ILinksListProps) {
    // If the data provider has been changed (e.g. web part properties have been updated), render the component
    if (oldProps.dataProvider !== this.props.dataProvider) {
      this.getData();
    }
  }

  private getUrl(category: ICategory) {
    if (category.url !== '') {
      return category.url;
    } else {
      return `${this.props.baseUrl}#path=${category.key}`;
    }
  }

  private renderCategories(categories: ICategory[]) {
    return categories.map((category) => {
      return (
        <li key={category.key} className={styles.listItem}>
          <h3 className={styles.title}>
            <Link href={this.getUrl(category)}>
              {category.name}
            </Link>
          </h3>
          <p className={styles.description}>{category.description}</p>
        </li>
      );
    });
  }

  public render(): React.ReactElement<ILinksListProps> {
    if (this.state.categories.length !== 0) {
      return (
        <div className={styles.linksList}>
          <ul className={styles.list}>
            {this.renderCategories(this.state.categories)}
          </ul>
        </div>
      );
    } else {
      return (
        <Placeholder
          iconName='Edit'
          iconText='Configure links to display'
          description='Please configure the list of links to display.'
          buttonLabel='Configure'
          onConfigure={this.props.onConfigure}
          hideButton={this.props.displayMode === DisplayMode.Read}
        />
      );
    }
  }
}
