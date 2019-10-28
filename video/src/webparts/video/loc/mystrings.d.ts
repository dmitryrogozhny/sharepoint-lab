declare interface IVideoWebPartStrings {
  PropertyPaneDescription: string;
  VideoLinkFieldLabel: string;
  PosterLinkFieldLabel: string;
  LinkFieldLabel: string;
  AddTextOverFieldLabel: string;
  TitleFieldLabel: string;
  AddFilterFieldLabel: string;
}

declare module 'VideoWebPartStrings' {
  const strings: IVideoWebPartStrings;
  export = strings;
}
