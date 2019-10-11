// Pushpin styles for the static Bing Map.
// Available styles are listed at: https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/pushpin-syntax-and-icon-styles#icon-styles
const fromIcon = 66;
const toIcon = 64;

const staticMapUrlPrefix = 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes';
const mapUrlPrefix = 'https://www.bing.com/maps';

/**
 * The key in the exntity storage that contains the Bing Maps API key.
 */
export const BingApiKey = 'DroBingMapsApiKey';

/**
 * Describes the location with a title, latitude and longitude.
 */
export interface Location {
  Title: string;
  Latitude: number;
  Longitude: number;
}

/**
 * Returns the url for the static map route for the specified locations.
 * @param from Starting point location
 * @param to Destination point location
 * @param apiKey Bing Maps API key
 */
export function getStaticMapUrl(from: Location, to: Location, apiKey: string) {
  return `${staticMapUrlPrefix}?${getLocationInfo(0, from, fromIcon)}&${getLocationInfo(1, to, toIcon)}&key=${apiKey}`;
}

/**
 * Retuns the url that opens the Bing Maps site with a route between the specified locations.
 * @param from Starting point location
 * @param to Destination point location
 */
export function getMapUrl(from: Location, to: Location): string {
  const fromPosition = `pos.${from.Latitude}_${from.Longitude}_${from.Title}`;
  const toPosition = `pos.${to.Latitude}_${to.Longitude}_${to.Title}`;
  const centerPosition = `cp=${(from.Latitude + to.Latitude) / 2}~${(from.Longitude + to.Longitude) / 2}`;

  return `${mapUrlPrefix}?${centerPosition}&rtp=${fromPosition}~${toPosition}&rtop=0~1~0`;
}

/**
 * Returns the formatted string with the location info.
 * @param id Id of the location point.
 * @param location Location
 * @param iconId Pushpin icon style
 */
function getLocationInfo(id: number, location: Location, iconId: number): string {
  const title = (id + 1).toString();
  const { Latitude, Longitude } = location;
  return `wp.${id}=${Latitude},${Longitude};${iconId};${title}`;
}
