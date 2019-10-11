import * as React from 'react';
import { ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import styles from './ExportToPdf.module.scss';
import { IExportToPdfState } from './IExportToPdfState';
import { IExportToPdfProps } from './IExportToPdfProps';
import { getItems} from '../../../services/SPService';
import { exportItem, exportList, generateTravelList } from '../../../services/ExportService';

/**
 * Component that shows a list of travel items and demonstrates the export to Pdf functionality.
 * List Title property should contain the title of a list with TravelItems.
  */
export default class ExportToPdf extends React.Component<IExportToPdfProps, IExportToPdfState> {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItems: [],
    };
  }

  public componentDidMount() {
    getItems(this.props.listTitle, []).then((items) => {
      this.setState({ items });
    });
  }

  private handleSeletedItems = (items: any[]) => {
    this.setState({ selectedItems: items });
  }

  private handleExportItemClick = () => {
    exportItem(this.props.listTitle, this.state.selectedItems[0].Id as string);
  }

  private handleExportItemsClick = () => {
    const selectedIdList = this.state.selectedItems.map((item) => item.Id);
    exportList(this.props.listTitle, selectedIdList);
  }

  private handleTravelListClick = () => {
    console.log(this.props.httpGet);

    generateTravelList(this.props.listTitle, this.state.selectedItems[0].Id as string, this.props.httpGet);
  }

  private getViewFields() {
    return [
      { displayName: "Id", name: "Id", sorting: true, maxWidth: 20 },
      { displayName: "From", name: "DispName", sorting: true, minWidth: 100, maxWidth: 250 },
      { displayName: "To", name: "DispName0", sorting: true, minWidth: 100, maxWidth: 250 },
      { displayName: "Driver", name: "Driver", sorting: true, minWidth: 100, maxWidth: 250 },
      { displayName: "Vehicle", name: "Vehicle", sorting: true, minWidth: 100, maxWidth: 250 },
    ];
  }

  public render(): React.ReactElement<IExportToPdfProps> {
    return (
      <div className={styles.exportToPdf} >
        <ActionButton
          iconProps={{ iconName: 'PDF' }}
          disabled={this.state.selectedItems.length !== 1}
          onClick={this.handleExportItemClick}
        >
          Export Item
        </ActionButton>
        <ActionButton
          iconProps={{ iconName: 'Car' }}
          disabled={this.state.selectedItems.length !== 1}
          onClick={this.handleTravelListClick}
        >
          Travel List
        </ActionButton>
        <ActionButton
          iconProps={{ iconName: 'Table' }}
          disabled={this.state.items.length === 0}
          onClick={this.handleExportItemsClick}
        >
          Export Items
        </ActionButton>
        <ListView
          items={this.state.items}
          viewFields={this.getViewFields()}
          compact={true}

          selectionMode={SelectionMode.multiple}
          selection={this.handleSeletedItems}

          showFilter={true}
          defaultFilter=""
          filterPlaceHolder="Search..."
        />
      </div>
    );
  }
}
