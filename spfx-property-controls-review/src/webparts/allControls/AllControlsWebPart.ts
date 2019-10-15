import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AllControlsWebPart.module.scss';
import * as strings from 'AllControlsWebPartStrings';

// PropertyFieldCodeEditor control
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
// PropertyFieldCollectionData control
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
// PropertyFieldColorPicker control
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
// PropertyFieldDateTimePicker control
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";
// PropertyFieldEnterpriseTermPicker control
import { PropertyFieldEnterpriseTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldEnterpriseTermPicker';
import { IPickerTerms as IEnterprisePickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldEnterpriseTermPicker";
// PropertyFieldListPicker control
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
// PropertyFieldMultiSelect control
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
// PropertyFieldNumber control
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
// PropertyFieldOrder control
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';
// PropertyFieldPeoplePicker control
import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
// PropertyFieldSpinButton control
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';
// PropertyFieldSwatchColorPicker control
import { PropertyFieldSwatchColorPicker, PropertyFieldSwatchColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldSwatchColorPicker';
// PropertyFieldTermPicker control
import { PropertyFieldTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { IPickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";
// PropertyPanePropertyEditor control
import { PropertyPanePropertyEditor } from '@pnp/spfx-property-controls/lib/PropertyPanePropertyEditor';
// PropertyPaneWebPartInformation control
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

export interface IAllControlsWebPartProps {
  htmlCode: string;
  collectionData: any[];
  color: string;
  datetime: IDateTimeFieldValue;
  enterpriseTerms: IEnterprisePickerTerms;
  lists: string | string[];
  multiSelect: string[];
  numberValue: number;
  orderedItems: Array<any>;
  people: IPropertyFieldGroupOrPerson[];
  spinValue: number;
  swatchColor: string;
  terms: IPickerTerms;
}

export default class AllControlsWebPart extends BaseClientSideWebPart<IAllControlsWebPartProps> {

  public render(): void {
    const separator = '; ';

    const {
      htmlCode, collectionData, color, datetime, enterpriseTerms, lists,
      multiSelect, numberValue, orderedItems, people,
      spinValue, swatchColor, terms,
    } = this.properties;

    this.domElement.innerHTML = `
    <div class="${ styles.allControls}">
      <div class="${ styles.container}">
        <div class="${ styles.row}">
          <div class="${ styles.column}">
            <p class="${ styles.title}">Reusable property pane controls. Open the property pane to edit properties.</p>

            <p class="${ styles.description}">${htmlCode ? escape(htmlCode) : ''}</p>
            <p class="${ styles.description}">${collectionData ? collectionData.map(item => item.Title + ' ' + item.Lastname).join(separator) : ''}</p>
            <p class="${ styles.description}">${color ? color : ''}</p>
            <p class="${ styles.description}">${datetime ? datetime.displayValue : ''}</p>
            <p class="${ styles.description}">${enterpriseTerms ? enterpriseTerms.map(item => item.name).join(separator) : ''}</p>
            <p class="${ styles.description}">${lists ? ((typeof lists === 'string') ? lists : lists.join(separator)) : ''}</p>
            <p class="${ styles.description}">${multiSelect ? multiSelect.join(separator) : ''}</p>
            <p class="${ styles.description}">${numberValue ? numberValue : ''}</p>
            <p class="${ styles.description}">${orderedItems ? orderedItems.map(item => item.text).join(separator) : ''}</p>
            <p class="${ styles.description}">${people ? people.map(item => item.fullName).join(separator) : ''}</p>
            <p class="${ styles.description}">${spinValue ? spinValue : ''}</p>
            <p class="${ styles.description}">${swatchColor ? swatchColor : ''}</p>
            <p class="${ styles.description}">${terms ? terms.map(item => item.name).join(separator) : ''}</p>

          </div>
        </div>
      </div>
    </div>`;
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                // PropertyFieldCodeEditor control
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML
                }),
                // PropertyFieldCollectionData control
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Title",
                      title: "Firstname",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "Lastname",
                      title: "Lastname",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "Age",
                      title: "Age",
                      type: CustomCollectionFieldType.number,
                      required: true
                    },
                    {
                      id: "City",
                      title: "Favorite city",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "antwerp",
                          text: "Antwerp"
                        },
                        {
                          key: "helsinki",
                          text: "Helsinki"
                        },
                        {
                          key: "montreal",
                          text: "Montreal"
                        }
                      ],
                      required: true
                    },
                    {
                      id: "Sign",
                      title: "Signed",
                      type: CustomCollectionFieldType.boolean
                    }
                  ],
                  disabled: false
                }),
                // PropertyFieldColorPicker control
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                // PropertyFieldDateTimePicker control
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  initialDate: this.properties.datetime,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId',
                }),
                // PropertyFieldEnterpriseTermPicker control
                PropertyFieldEnterpriseTermPicker('enterpriseTerms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.enterpriseTerms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  limitByGroupNameOrID: 'People',
                  limitByTermsetNameOrID: 'Location',
                  key: 'termSetsPickerFieldId',
                  includeLabels: true
                }),
                // PropertyFieldListPicker control
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                // PropertyFieldMultiSelect control
                PropertyFieldMultiSelect('multiSelect', {
                  key: 'multiSelect',
                  label: "Multi select field",
                  options: [
                    {
                      key: "EN",
                      text: "EN"
                    },
                    {
                      key: "FR",
                      text: "FR"
                    },
                    {
                      key: "NL",
                      text: "NL"
                    }
                  ],
                  selectedKeys: this.properties.multiSelect
                }),
                // PropertyFieldNumber control
                PropertyFieldNumber("numberValue", {
                  key: "numberValue",
                  label: "Number value only",
                  description: "Number field description",
                  value: this.properties.numberValue,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                }),
                // PropertyFieldOrder control
                PropertyFieldOrder("orderedItems", {
                  key: "orderedItems",
                  label: "Ordered Items",
                  items: this.properties.orderedItems,
                  textProperty: "text",
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                // PropertyFieldPeoplePicker control
                PropertyFieldPeoplePicker('people', {
                  label: 'PropertyFieldPeoplePicker',
                  initialData: this.properties.people,
                  allowDuplicate: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                }),
                // PropertyFieldSpinButton control
                PropertyFieldSpinButton('spinValue', {
                  label: 'Spin Value',
                  initialValue: this.properties.spinValue,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  suffix: 'px',
                  min: 0,
                  max: 5,
                  step: 0.25,
                  decimalPlaces: 2,
                  incrementIconName: 'CalculatorAddition',
                  decrementIconName: 'CalculatorSubtract',
                  key: 'spinButtonFieldId'
                }),
                // PropertyFieldSwatchColorPicker control
                PropertyFieldSwatchColorPicker('swatchColor', {
                  label: 'Swatch Color',
                  selectedColor: this.properties.swatchColor,
                  style: PropertyFieldSwatchColorPickerStyle.Inline,
                  colors: [
                    { color: '#ffb900', label: 'Yellow' },
                    { color: '#fff100', label: 'Light Yellow' },
                    { color: '#d83b01', label: 'Orange' },
                    { color: '#e81123', label: 'Red' },
                    { color: '#a80000', label: 'Dark Red' },
                    { color: '#5c005c', label: 'Dark Magenta' },
                    { color: '#e3008c', label: 'Light Magenta' },
                    { color: '#5c2d91', label: 'Purple' },
                    { color: '#0078d4', label: 'Blue' },
                    { color: '#00bcf2', label: 'Light Blue' },
                    { color: '#008272', label: 'Teal' },
                    { color: '#107c10', label: 'Green' },
                    { color: '#bad80a', label: 'Light Green' },
                    { color: '#eaeaea' },
                    { color: 'black', label: 'Black' },
                    { color: '#333333', label: 'Neutral' },
                    { color: 'rgba(102, 102, 102, 0.5)', label: 'Half Gray' }
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorFieldId'
                }),
                // PropertyFieldTermPicker control
                PropertyFieldTermPicker('terms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  limitByGroupNameOrID: 'People',
                  limitByTermsetNameOrID: 'Location',
                  key: 'termSetsPickerFieldId'
                }),
                // PropertyPanePropertyEditor control
                PropertyPanePropertyEditor({
                  webpart: this,
                  key: 'propertyEditor'
                }),
                // PropertyPaneWebPartInformation control
                PropertyPaneWebPartInformation({
                  description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
                  moreInfoLink: `https://sharepoint.github.io/sp-dev-fx-property-controls/`,
                  videoProperties: {
                    embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                    properties: { allowFullScreen: true }
                  },
                  key: 'webPartInfoId'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
