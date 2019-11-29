import Favico from 'favico.js';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';

export interface IFavicoNotificationApplicationCustomizerProperties { }

export default class FavicoNotificationApplicationCustomizer
  extends BaseApplicationCustomizer<IFavicoNotificationApplicationCustomizerProperties> {

  public onInit(): Promise<void> {

    const favico = new Favico({
      animation: 'slide',
      fontFamily: '"Segoe UI"',
      bgColor: '#ad0000',
    });

    let count = 1;

    setInterval(() => {
      if (count >= 100) {
        count = 1;
      }

      favico.badge(count++);
    }, 3000);

    return Promise.resolve();
  }
}
