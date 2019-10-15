import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AllControlsWithCalloutWebPart.module.scss';
import * as strings from 'AllControlsWithCalloutWebPartStrings';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
// PropertyFieldButtonWithCallout control
import { PropertyFieldButtonWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldButtonWithCallout';
// PropertyFieldCheckboxWithCallout control
import { PropertyFieldCheckboxWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldCheckboxWithCallout';
// PropertyFieldChoiceGroupWithCallout control
import { PropertyFieldChoiceGroupWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldChoiceGroupWithCallout';
// PropertyFieldDropDownWithCallout control
import { PropertyFieldDropdownWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldDropdownWithCallout';
// PropertyFieldLabelWithCallout control
import { PropertyFieldLabelWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLabelWithCallout';
// PropertyFieldLinkWithCallout control
import { PropertyFieldLinkWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLinkWithCallout';
// PropertyFieldSliderWithCallout control
import { PropertyFieldSliderWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldSliderWithCallout';
// PropertyFieldTextWithCallout control
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';
// PropertyFieldToggleWithCallout control
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';

export interface IAllControlsWithCalloutWebPartProps {
  checkboxWithCalloutValue: boolean;
  choiceGroupWithCalloutValue: string;
  dropdownInfoHeaderKey: string;
  sliderWithCalloutValue: number;
  textInfoHeaderValue: string;
  toggleInfoHeaderValue: boolean;
}

export default class AllControlsWithCalloutWebPart extends BaseClientSideWebPart<IAllControlsWithCalloutWebPartProps> {

  public render(): void {
    const { checkboxWithCalloutValue, choiceGroupWithCalloutValue, dropdownInfoHeaderKey,
      sliderWithCalloutValue, textInfoHeaderValue, toggleInfoHeaderValue,
    } = this.properties;

    this.domElement.innerHTML = `
    <div class="${ styles.allControlsWithCallout}">
      <div class="${ styles.container}">
        <div class="${ styles.row}">
          <div class="${ styles.column}">
            <p class="${ styles.title}">Reusable property pane controls with callout. Open the property pane to edit properties.</p>

            <p class="${ styles.description}">${checkboxWithCalloutValue !== undefined ? checkboxWithCalloutValue : ''}</p>
            <p class="${ styles.description}">${choiceGroupWithCalloutValue ? choiceGroupWithCalloutValue : ''}</p>
            <p class="${ styles.description}">${dropdownInfoHeaderKey ? dropdownInfoHeaderKey : ''}</p>
            <p class="${ styles.description}">${sliderWithCalloutValue ? sliderWithCalloutValue : ''}</p>
            <p class="${ styles.description}">${textInfoHeaderValue ? escape(textInfoHeaderValue) : ''}</p>
            <p class="${ styles.description}">${toggleInfoHeaderValue !== undefined ? toggleInfoHeaderValue : ''}</p>

          </div>
        </div>
      </div>
    </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getDropdownInfoHeaderCalloutContent(): JSX.Element {
    const selectedKey: string = this.properties.dropdownInfoHeaderKey;

    if (selectedKey) {
      return React.createElement('div', {}, `you have selected ${selectedKey}`);
    } else {
      return React.createElement('div', {}, `you haven't selected any version`);
    }
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
                // PropertyFieldButtonWithCallout control
                PropertyFieldButtonWithCallout('fakeProperty', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'buttonWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Tests connection to the database with the parameters listed above'),
                  calloutWidth: 150,
                  text: 'Test connection',
                  onClick: () => { /* Code to test db connection */ }
                }),
                // PropertyFieldCheckboxWithCallout control
                PropertyFieldCheckboxWithCallout('checkboxWithCalloutValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'checkboxWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Check the checkbox to accept Application Terms and Conditions'),
                  calloutWidth: 200,
                  text: 'Accept terms and conditions',
                  checked: this.properties.checkboxWithCalloutValue
                }),
                // PropertyFieldChoiceGroupWithCallout control
                PropertyFieldChoiceGroupWithCallout('choiceGroupWithCalloutValue', {
                  calloutContent: React.createElement('div', {}, 'Select preferrable mobile platform'),
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'choiceGroupWithCalloutFieldId',
                  label: 'Preferred mobile platform',
                  options: [{
                    key: 'iOS',
                    text: 'iOS',
                    checked: this.properties.choiceGroupWithCalloutValue === 'iOS'
                  }, {
                    key: 'Android',
                    text: 'Android',
                    checked: this.properties.choiceGroupWithCalloutValue === 'Android'
                  }, {
                    key: 'Other',
                    text: 'Other',
                    checked: this.properties.choiceGroupWithCalloutValue === 'Other'
                  }]
                }),
                // PropertyFieldDropDownWithCallout control
                PropertyFieldDropdownWithCallout('dropdownInfoHeaderKey', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'dropdownInfoHeaderFieldId',
                  label: 'Select the version',
                  options: [{
                    key: 'v1.0.0',
                    text: 'v1.0.0'
                  }, {
                    key: 'v1.0.1',
                    text: 'v1.0.1'
                  }, {
                    key: 'v1.0.2',
                    text: 'v1.0.2'
                  }, {
                    key: 'v2.0.0',
                    text: 'v2.0.0'
                  }],
                  selectedKey: this.properties.dropdownInfoHeaderKey,
                  calloutContent: this.getDropdownInfoHeaderCalloutContent
                }),
                // PropertyFieldLabelWithCallout control
                PropertyFieldLabelWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'LabelWithCalloutFieldId',
                  calloutContent: 'Use dropdowns below to select list and list\'s field to work with',
                  calloutWidth: 200,
                  text: 'Select List and Field'
                }),
                // PropertyFieldLinkWithCallout control
                PropertyFieldLinkWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'linkWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Click the link to open a new page with Application Terms & Conditions'),
                  calloutWidth: 200,
                  text: 'Terms & Conditions',
                  href: 'https://github.com/SharePoint/sp-dev-fx-property-controls',
                  target: '_blank'
                }),
                // PropertyFieldSliderWithCallout control
                PropertyFieldSliderWithCallout('sliderWithCalloutValue', {
                  calloutContent: React.createElement('div', {}, 'Select background image opacity'),
                  calloutTrigger: CalloutTriggers.Click,
                  calloutWidth: 200,
                  key: 'sliderWithCalloutFieldId',
                  label: 'Opacity',
                  max: 100,
                  min: 0,
                  step: 1,
                  showValue: true,
                  value: this.properties.sliderWithCalloutValue
                }),
                // PropertyFieldTextWithCallout control
                PropertyFieldTextWithCallout('textInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'textInfoHeaderFieldId',
                  label: 'Describe your PnP passion with few words',
                  calloutContent: React.createElement('span', {}, 'You can describe your passion with such words as strong, cosmic, all-absorbing, etc.'),
                  calloutWidth: 150,
                  value: this.properties.textInfoHeaderValue
                }),
                // PropertyFieldToggleWithCallout control
                PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleInfoHeaderFieldId',
                  label: 'Turn on the PnP feature',
                  calloutContent: React.createElement('p', {}, 'With this control you can enable or disable the PnP features in your web part'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.toggleInfoHeaderValue
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
