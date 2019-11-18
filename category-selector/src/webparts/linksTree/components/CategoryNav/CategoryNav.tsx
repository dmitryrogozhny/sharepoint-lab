import * as React from 'react';
import { Nav, INavStyleProps, INavStyles, INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import styles from './CategoryNav.module.scss';
import { ICategoryNavProps } from './ICategoryNavProps';
import { ICategory } from '../../../../data/ICategory';

/**
 * Renders a list of categories provided.
 *
 * @param props Component's properties
 */
const CategoryNav: React.FunctionComponent<ICategoryNavProps> = ({ selectedCategory, categories, header, onCategoryClick }) => {

  /**
   * Converts a category into a navigation link required by the UI Fabric Nav component.
   *
   * @param category Category
   */
  function toNavLink(category: ICategory): INavLink {
    const { key, name, description, icon, url } = category;
    return { key, name, description, icon, url };
  }

  /**
   * Sets custom styles for links.
   * By default links in the Nav component would render with a fixed height, center allignment, and no wrapping.
   *
   * @param props
   */
  function getStyles(props: INavStyleProps): Partial<INavStyles> {
    return {
      link: {
        height: 'auto',
        textAlign: 'left',
        whiteSpace: 'inherit',
        lineHeight: '125%',
        padding: '10px 10px 10px 15px',
        border: '0',
      }
    };
  }

  /**
   * Handles the link click by propagating event to the handler provided via the component's properties.
   *
   * @param event Click event
   * @param navLink INavLink clicked
   */
  function handleLinkClick(event?: React.MouseEvent<HTMLElement>, navLink?: INavLink) {
    if (navLink) {
      const newSelectedCategory = categories.filter((category) => category.key === navLink.key);

      if (newSelectedCategory.length !== 0) {
        onCategoryClick(newSelectedCategory[0]);
      }
    }
  }

  /**
   * Wraps the links into the format required by the UI Fabric Nav component.
   */
  function getGroups(): INavLinkGroup[] {
    return [{ links: categories.map(toNavLink) }];
  }

  /**
   * Custom rendering function for a link. Renders a title and a description, and an icon at the right.
   * If a description is available title is rendered in bold with a description underneath it.
   *
   * @param link INavLink with a link data.
   */
  function onRenderLink(link: any): JSX.Element | null {
    if (link.description) {
      return (
        <div className={styles.linkContainer}>
          <div>
            <div className={styles.linkBold}>
              {link.name}
            </div>
            <div className={styles.description}>{link.description}</div>
          </div>
          <div className={styles.icon}>
            <Icon iconName="ChevronRight" className="ms-ChevronRightSmall" />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.linkContainer}>
          <div className={styles.link}>
            {link.name}
          </div>
          <div className={styles.icon}>
            <Icon iconName="ChevronRight" className="ms-ChevronRightSmall" />
          </div>
        </div>
      );
    }
  }

  /**
   * Renders a header.
   *
   * @param title Title to render.
   */
  function renderHeader(title: string) {
    if (title === '') {
      return null;
    } else {
      return (<div>
        <h3 className={styles.header}>
          {title}
        </h3>
      </div>);
    }
  }

  return (
    <div className={styles.categoryNav}>
      {renderHeader(header)}
      <Nav
        onLinkClick={handleLinkClick}
        onRenderLink={onRenderLink}
        styles={getStyles}
        groups={getGroups()}
        selectedKey={selectedCategory ? selectedCategory.key : ''}
      />
    </div>
  );
};

export default CategoryNav;
