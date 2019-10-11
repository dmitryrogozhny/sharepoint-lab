import { HttpClientResponse } from "@microsoft/sp-http";

export interface IExportToPdfProps {
  /**
   * List with travel items.
   */
  listTitle: string;
  /**
   * Function that performs the http GET request.
   */
  httpGet: (url: string) => Promise<HttpClientResponse>;
}
