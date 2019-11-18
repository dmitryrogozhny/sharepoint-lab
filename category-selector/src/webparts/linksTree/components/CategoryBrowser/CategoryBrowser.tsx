import * as React from 'react';
import { css } from "@uifabric/utilities/lib/css";

import styles from './CategoryBrowser.module.scss';
import { ICategoryBrowserProps } from './ICategoryBrowserProps';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import CategoryNav from '../CategoryNav/CategoryNav';
import ContentView from '../ContentView/ContentView';
import { ICategory } from '../../../../data/ICategory';
import { IContent } from '../../../../data/IContent';
import { BreadcrumbsVisibility } from '../BreadcrumbsVisibility';
import { ContentViewerType } from '../ContentViewerType';

/**
 * Renders a categories browser component.
 *
 * @param props Component's properties.
 */
const CategoryBrowser: React.FunctionComponent<ICategoryBrowserProps> = ({ selectedCategories, categories, onCategorySelect, content, breadcrumbsVisibility, contentViewerType }) => {

  /**
   * Returns a function that will handle click events for a particular CategoryNav component.
   * The returned function will receive the selected category, add it to the path and propagate to the handler specified in properties.
   *
   * @param path Path of categories from the root up to the current level.
   */
  function handleItemClick(path: ICategory[]) {
    return (selectedCategory: ICategory) => {
      const selectedPath = [...path];
      selectedPath.push(selectedCategory);

      onCategorySelect(selectedPath);
    };
  }

  /**
   * Returns a list of CategoryNav components to render.
   * Each component corresponds to the category list in the currently selected path.
   */
  function getNavs() {
    return categories.map((subCategories, index) => {
      if (subCategories.length === 0) {
        return null;
      }

      const path = selectedCategories.slice(0, index);
      const clickHandler = handleItemClick(path);
      const selectedCategory = selectedCategories[index];

      // header of the current CategoryNav is the name of the previous category
      const previousSelectedCategory = selectedCategories[index - 1];
      const header = previousSelectedCategory ? previousSelectedCategory.name : '';

      const isRoot = index === 0;
      const isSelected = !isRoot && (selectedCategory !== undefined);
      const isLastNotSelected = !isRoot && (selectedCategory === undefined);

      // styles for the current category list.
      // styles.shifted - style for the selected categories, except the first one (shifts the rendered category list to the left with an animation)
      const navStyle = css(styles.list,
        isSelected ? styles.shifted : '',
        isRoot ? styles.noBorder : '',
        isLastNotSelected ? styles.current : '');


      return (
        <div
          key={index}
          className={navStyle}
        >
          <CategoryNav
            categories={subCategories}
            header={header}
            selectedCategory={selectedCategory}
            onCategoryClick={clickHandler}
          />
        </div>
      );
    });
  }

  /**
   * Renders the content using the ContentView component. If the content is not provided returns an empty div.
   *
   * @param contentData content to render
   */
  function renderContent(contentData: IContent | undefined, viewerType: ContentViewerType) {
    if (contentData === undefined) {
      return (<div className={css(styles.content, styles.list, styles.noBorder)}>&nbsp;</div>);
    } else {
      return (
        <div className={css(styles.content, styles.appear, styles.list)}>
          <ContentView content={content} contentViewerType={viewerType} />
        </div>);
    }
  }

  /**
   * Renders the breadcrumb component depending on the properties.
   */
  function renderBreadcrumbs() {
    const visibilityStyle = (breadcrumbsVisibility === BreadcrumbsVisibility.OnForMobile) ? styles.visibleOnMobile : '';

    if (breadcrumbsVisibility === BreadcrumbsVisibility.Off) {
      return null;
    } else {
      return (
        <div className={visibilityStyle}>
          <Breadcrumb path={selectedCategories} onClick={onCategorySelect} />
        </div>
      );
    }
  }

  return (
    <div className={styles.categoryBrowser}>
      <div className={styles.container}>
        {renderBreadcrumbs()}
        <div className={styles.stack}>
          {getNavs()}
          {renderContent(content, contentViewerType)}
        </div>
      </div>
    </div>);
};

export default CategoryBrowser;
