import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';

import styles from './ContentView.module.scss';
import { IContentViewProps } from './IContentViewProps';
import { IContent } from '../../../../data/IContent';
import { ContentViewerType } from '../ContentViewerType';

/**
 * Renders the list of links passed in the content property.
 *
 * @param props Component's properties
 */
const ContentView: React.FunctionComponent<IContentViewProps> = ({ content, contentViewerType }) => {

  /**
   * Renders the header. If the contentData is undefined retuns null.
   *
   * @param contentData
   */
  function renderHeader(contentData: IContent | undefined) {
    if (contentData === undefined) {
      return null;
    } else {
      return (
        <div>
          <h3 className={styles.header}>
            {contentData.name}
          </h3>
        </div>
      );
    }
  }

  /**
   * Renders a header and a list of links.
   * The list consists of sections, each section may have a number of links in it.
   *
   * @param contentData
   */
  function renderLinks(contentData: IContent | undefined) {
    if (contentData === undefined) {
      return null;
    }

    const sections = contentData.sections.map((section, index) => {
      const links = section.links.map((link, linksIndex) => {
        return (
          <div key={linksIndex} className={styles.link}>
            <Link href={link.url}>{link.name}</Link>
          </div>
        );
      });

      return (
        <div key={index}>
          <h4 className={styles.sectionTitle}>{section.name}</h4>
          {links}
        </div>
      );
    });

    return (
      <div className={styles.contentView}>
        {renderHeader(contentData)}
        {sections}
      </div>
    );
  }

  switch (contentViewerType) {
    case ContentViewerType.Iframe:
      return (
        <div className={styles.contentView}>
          <iframe className={styles.iframe}
            src={content.name}
            allowFullScreen={true} frameBorder="0"
          >
          </iframe>
        </div>
      );
    case ContentViewerType.LinksList:
      return renderLinks(content);
    default:
      throw new Error('Unknown content viewer type: ' + contentViewerType);
  }
};

export default ContentView;
