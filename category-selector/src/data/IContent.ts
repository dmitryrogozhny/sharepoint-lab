/**
 * Interface that describes a content. The content has got a name and a list of sections.
 * Every section has got a name and a set of links.
 */
export interface IContent {
  name: string;
  sections: IContentSection[];
}

/**
 * Interface for a content section.
 */
export interface IContentSection {
  name: string;
  links: IContentLink[];
}

/**
 * Interface for a content link.
 */
export interface IContentLink {
  name: string;
  url: string;
}
