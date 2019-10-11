declare interface IExportToPdfCommandSetStrings {
  ExportItem: string;
  ExportList: string;
  GenerateTravelList: string;
}

declare module 'ExportToPdfCommandSetStrings' {
  const strings: IExportToPdfCommandSetStrings;
  export = strings;
}
