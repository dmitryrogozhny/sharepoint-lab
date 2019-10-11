import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

import { exportList, exportItem, generateTravelList } from '../../services/ExportService';

enum Commands {
  exportList = 'EXPORT_LIST',
  exportItem = 'EXPORT_ITEM',
  generateTravelList = 'GENERATE_TRAVEL_LIST',
}

export interface IExportToPdfCommandSetProperties {
}

const LOG_SOURCE: string = 'ExportToPdfCommandSet';

export default class ExportToPdfCommandSet extends BaseListViewCommandSet<IExportToPdfCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ExportToPdfCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const exportItemCommand: Command = this.tryGetCommand(Commands.exportItem);
    const generateTravelListCommand: Command = this.tryGetCommand(Commands.generateTravelList);

    const isSingleItemSelected = event.selectedRows.length === 1;

    if (exportItemCommand && generateTravelListCommand) {
      exportItemCommand.visible = generateTravelListCommand.visible = isSingleItemSelected;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const listTitle = this.context.pageContext.list.title;

    switch (event.itemId) {
      case Commands.exportList:
        // export selected items to Pdf
        const selectedIdList = event.selectedRows.map((row) => row.getValueByName('ID') as string);
        exportList(listTitle, selectedIdList);
        break;
      case Commands.exportItem:
        // export single item to Pdf
        exportItem(listTitle, event.selectedRows[0].getValueByName('ID') as string);
        break;
      case Commands.generateTravelList:
        // generate a travel list for the selected item
        generateTravelList(listTitle, event.selectedRows[0].getValueByName('ID') as string, this.httpGet);
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  /**
   * Wraps the http get function.
   */
  private httpGet = (url: string): Promise<HttpClientResponse> => { return this.context.httpClient.get(url, HttpClient.configurations.v1); };
}
