declare interface ILinksTreeWebPartStrings {
  PropertyPaneDescription: string;
  JsonCategoriesFieldLabel: string;
  ShowBreadcrumbFieldLabel: string;
  ShowBreadcrumbFieldOptionOn: string;
  ShowBreadcrumbFieldOptionOnMobile: string;
  ShowBreadcrumbFieldOptionOff: string;
  ContentViewerTypeFieldLabel: string;
  ContentViewerTypeFieldIframe: string;
  ContentViewerTypeFieldLinksList: string;
}

declare module 'LinksTreeWebPartStrings' {
  const strings: ILinksTreeWebPartStrings;
  export = strings;
}
