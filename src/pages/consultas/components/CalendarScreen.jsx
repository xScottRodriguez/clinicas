import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useDispatch } from 'react-redux';
import { messages } from '../../../utils';
import { CalendarEvent } from './CalendarEvent';

import { AddNewFab } from './AddNewFab';
import { CalendarModal } from './CalendarModal';
import {
  eventClearActiveEvent,
  eventSetActive,
  openModal,
} from '../../../store/slices/uiSlice';

import { format } from 'date-fns-tz';
import { startOfWeek, getDay, parse } from 'date-fns';
import esLocale from 'date-fns/locale/es';

import { STATUS_BORDER_DATES, STATUS_DATES } from '../../../constants';
import { toZonedTime } from 'date-fns-tz';
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { es: esLocale },
});

export function CalendarScreen({ events, isLoadingEvents }) {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onDoubleClick = (e) => {
    dispatch(openModal());
  };

  const onSelectEvent = (e) => {
    // TODO: activar el evento si  se usara el update de eventos

    dispatch(
      eventSetActive({
        ...e,
        start: toZonedTime(e.start),
        end: toZonedTime(e.end),
      })
    );
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = STATUS_DATES[event.estado.nombre];
    const border = STATUS_BORDER_DATES[event.estado.nombre];
    const style = {
      backgroundColor,
      opacity: 0.8,
      borderLeft: `3px dashed ${border}`,
      color: '#fcfcfc',
      padding: 0,
    };
    const eventCellStyle = {
      style: {
        background: '#FF0A06',
      },
    };
    return {
      style,
      eventCellStyle,
    };
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          height: '100vh',
        }}
      >
        <Calendar
          localizer={localizer}
          events={events?.map(
            ({ titulo, fechaHoraInicio, fechaHoraFin, ...rest }) => {
              return {
                title: titulo,
                start: toZonedTime(fechaHoraInicio),
                end: toZonedTime(fechaHoraFin),
                ...rest,
              };
            }
          )}
          startAccessor='start'
          endAccessor='end'
          messages={messages}
          culture='es'
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          dayLayoutAlgorithm={'overlap'}
          components={{
            event: CalendarEvent,
          }}
          popup
        />
      </div>
      <AddNewFab />

      <CalendarModal />
    </>
  );
}
