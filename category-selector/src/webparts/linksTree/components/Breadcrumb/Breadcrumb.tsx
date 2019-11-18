import * as React from 'react';
import { Breadcrumb as BreadcrumbUIFabric, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';

import styles from './Breadcrumb.module.scss';
import { IBreadcrumbProps } from './IBreadcrumbProps';
import { ICategory } from '../../../../data/ICategory';

/**
 * Renders a breadrumb for a currently selected path.
 *
 * @param props Component's properties.
 */
const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = ({ path, onClick }) => {

  /**
   * Returns the function that will handle the click event for the specified breadcrumb part.
   * The event handler will propagate the click event to the handler specified in the properties with the right parameters.
   *
   * @param selectedPath
   */
  function handleBreadcrumbClick(selectedPath: ICategory[]): (event?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void {
    return (event?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => {
      onClick(selectedPath);
    };
  }

  /**
   * Returns a list of breadcrumb items to render.
   *
   * @param categories List of categories currently selected.
   * @param homeLabel Label for a Home breadcrumb.
   */
  function getCategories(categories: ICategory[], homeLabel: string): IBreadcrumbItem[] {
    const breadcrumbItems = categories.map((category, index, allCategories) => {
      // take selected categories from the begining up to the current category
      const breadcrumbPath = allCategories.slice(0, index + 1);
      // get the function that will propagate the path of the selected category when clicked
      const clickHandler = handleBreadcrumbClick(breadcrumbPath);
      const isLastItem = (index === allCategories.length - 1) ? true : false;

      return {
        text: category.name,
        key: category.key,
        isCurrentItem: isLastItem,
        onClick: isLastItem ? undefined : clickHandler,
      };
    });

    // insert the Home breadcrumb as the first item
    breadcrumbItems.unshift({ text: homeLabel, 'key': '', isCurrentItem: false, onClick: handleBreadcrumbClick([]) });

    return breadcrumbItems;
  }

  return (
    <BreadcrumbUIFabric
      className={styles.breadcrumb}
      items={getCategories(path, 'Home')}
      overflowIndex={0}
      ariaLabel={'Selected path breadcrumb'}
    />
  );

};

export default Breadcrumb;
