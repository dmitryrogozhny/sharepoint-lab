import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ExtendedEventSourceInput } from '@fullcalendar/core/structs/event-source';

import { IEvent } from '../IEvent';
import styles from './Calendar.module.scss';
import { ICalendarProps } from './ICalendarProps';

export default class Calendar extends React.Component<ICalendarProps, {}> {
  private static colors = ['#d29200', '#5c005c', '#32145a', '#002050', '#004b50', '#004b1c'];

  /**
   * Creates ExtendedEventSourceInput object from IEvent object
   */
  private toExtendedEventSourceInput: (event: IEvent) => ExtendedEventSourceInput = (event) => ({
    title: escape(event.title),
    start: event.startDate,
    end: event.endDate,
    allDay: true,
  })

  private sortByDate(event1: ExtendedEventSourceInput, event2: ExtendedEventSourceInput): number {
    return event1.start.getTime() - event2.start.getTime();
  }

  public render(): React.ReactElement<ICalendarProps> {
    const events: ExtendedEventSourceInput[] = this.props.events.map(this.toExtendedEventSourceInput).sort(this.sortByDate);

    events.forEach((event, index) => {
      event.backgroundColor = event.borderColor = Calendar.colors[index % Calendar.colors.length];
    });

    return (
      <div className={styles.calendar}>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.onUpdateTitle}
        />
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          firstDay={1}
        />
      </div>
    );
  }
}
