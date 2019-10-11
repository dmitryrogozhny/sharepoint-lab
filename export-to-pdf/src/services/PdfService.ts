import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import 'jspdf-autotable';

/**
 * Information about a travel.
 */
export interface TravelItem {
  Id: number;
  Title: string;

  Date: string;

  // From display name
  DispName: string;
  // From geo location
  GeoLoc: { Latitude: number; Longitude: number; };

  // To display name
  DispName0: string;
  // To geo location
  GeoLoc0: { Latitude: number; Longitude: number; };

  Driver: string;
  Vehicle: string;
}

/**
 * Describes the label and value pair of a field.
 */
interface Field {
  label: string;
  value: string;
}

/**
 * Creates and saves the PDF document for the specified travel item.
 * @param item Travel item.
 */
export function exportItemToPdf(item: TravelItem) {
  const doc = generatePdf(item.Title, getFields(item));
  doc.save(`Travel ${item.Id}.pdf`);
}

/**
 * Creates and saves the travel list for the specified travel item.
 * The travel list contains a list of items' fields, a static map for a route and a link to a dynamic Bing map for the route.
 * @param item Travel item.
 * @param image Static map image.
 * @param url Link for a dynamic map.
 */
export function generateTravelListToPdf(item: TravelItem, image: string | ArrayBuffer | undefined, url: string) {
  // create a pdf doc with a list of fields
  const doc = generatePdf(item.Title, getFields(item));

  const imageSize = 170;

  // add an image to the doc
  if (image !== undefined) {
    doc.addImage(image, 'JPEG', 20, 100, imageSize, imageSize);
    doc.link(20, 100, imageSize, imageSize, { url });
  }

  // if the image is available, render the link under the image, otherwise, render it right after properties.
  const linkOffset = (image !== undefined) ? (110 + imageSize) : (110);
  // add a link
  doc.setTextColor(0, 69, 120);
  doc.textWithLink('View this route in Bing Maps', 20, linkOffset, { url });

  doc.save(`Travel ${item.Id}.pdf`);
}

/**
 * Creates and saves a PDF document with a list of specified travel items rendered as a table.
 * @param items List of travel items.
 */
export function exportListToPdf(items: TravelItem[]) {
  // get a list of headers for table rows
  const head: string[][] = [getFields(items[0]).map((field) => field.label)];
  // get a list of columns
  const body: string[][] = items.map((item) => getFields(item).map((field) => field.value as string));

  const doc = new jsPDF();
  doc.autoTable({ head: head, body: body });
  doc.save('Travels.pdf');
}

/**
 * Returns the list of fields for the specified travel item.
 * Each field contains a label and a formatted value.
 * @param item Travel item.
 */
function getFields(item: TravelItem): Field[] {
  return [
    { label: 'Title', value: item.Title },
    { label: 'Date', value: moment(item.Date).format('MMMM D, YYYY') },
    { label: 'From', value: item.DispName },
    { label: 'To', value: item.DispName0 },
    { label: 'Driver', value: item.Driver },
    { label: 'Vehicle', value: item.Vehicle },
  ];
}

/**
 * Returns the generated PDF document that contains a header and a list of fields.
 * @param title Header for the file.
 * @param fields List of fields to render.
 */
function generatePdf(title: string, fields: Field[]): jsPDF {
  const offset = 20;
  const start = 40;
  const h1FontSize = 22;
  const textFontSize = 14;
  const margin = 10;

  const doc = new jsPDF();

  // Render a header
  doc.setFontSize(h1FontSize);
  doc.setFontType('bold');
  doc.text(offset, offset, title);

  doc.setFontSize(textFontSize);
  doc.setFontType('normal');

  // Render a list of fields (label and value pairs)
  fields.forEach((field, index) => {
    doc.text(offset, start + margin * index, field.label + ':');
    doc.text(offset * 2, start + margin * index, field.value);
  });

  return doc;
}
