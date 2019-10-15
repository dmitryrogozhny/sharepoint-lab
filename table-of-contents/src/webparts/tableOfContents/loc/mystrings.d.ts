declare interface ITableOfContentsWebPartStrings {
  PropertyPaneDescription: string;
  ShowHeading1FieldLabel: string;
  ShowHeading2FieldLabel: string;
  ShowHeading3FieldLabel: string;
  HideInMobileViewLabel: string;
}

declare module 'TableOfContentsWebPartStrings' {
  const strings: ITableOfContentsWebPartStrings;
  export = strings;
}
