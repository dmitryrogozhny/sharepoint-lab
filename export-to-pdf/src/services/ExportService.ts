import { getItems, getItem, getStorageEntityValue } from "./SPService";
import { TravelItem, exportListToPdf, exportItemToPdf, generateTravelListToPdf } from "./PdfService";
import { getMapUrl, BingApiKey, getStaticMapUrl } from "./MapService";
import { HttpClientResponse } from "@microsoft/sp-http";

/**
 * Retrieves selected items from the specified list and generates a Pdf document.
 * @param listTitle List title
 * @param selectedIdList List of selected items' ids.
 */
export function exportList(listTitle: string, selectedIdList: string[]) {
  return new Promise((resolve, reject) => {
    getItems<TravelItem>(listTitle, selectedIdList).then((items) => {
      // skip Pdf rendering for empty lists
      if (items.length !== 0) {
        exportListToPdf(items);
      }
      resolve();
    });
  });
}

/**
 * Retrives the selected item and generates a Pdf document.
 * @param listTitle List title.
 * @param selectedId Selected item id.
 */
export function exportItem(listTitle: string, selectedId: string) {
  return new Promise((resolve, reject) => {
    getItem<TravelItem>(listTitle, selectedId)
      .then((item) => {
        console.log(item);

        exportItemToPdf(item);
        resolve();
      });
  });
}

/**
 * Retrieves the selected item, static map image for the item's route, and generates a Pdf travel list.
 * @param listTitle List title.
 * @param selectedId Selected item id.
 * @param httpGet Function that performs the http get request and returns the result. This function allows to abstract the export service from the context (i.e. a web part or an extension context).
 */
export function generateTravelList(listTitle: string, selectedId: string, httpGet: (url: string) => Promise<HttpClientResponse>) {
  getItem<TravelItem>(listTitle, selectedId)
    .then((item) => {
      const fromLocation = { Title: item.DispName, ...item.GeoLoc };
      const toLocation = { Title: item.DispName0, ...item.GeoLoc0 };

      // get a link to the Bing Map page with a route
      const mapUrl = getMapUrl(fromLocation, toLocation);

      // get Bing API Key from the storage
      getStorageEntityValue(BingApiKey).then((apiKey) => {
        // get the link to the static map with the route
        const staticMapUrl = getStaticMapUrl(fromLocation, toLocation, apiKey);

        // get the image for the static map
        httpGet(staticMapUrl)
          .then((response) => {
            // if the request for a static image failed, generate Pdf file without the image
            if (response.status === 401) {
              generateTravelListToPdf(item, undefined, mapUrl);
            } else {
              response.blob().then((blob) => {
                const reader = new FileReader();
                reader.addEventListener("loadend", () => {
                  generateTravelListToPdf(item, reader.result, mapUrl);
                });

                reader.readAsDataURL(blob);
              });
            }
          });
      });
    });
}
