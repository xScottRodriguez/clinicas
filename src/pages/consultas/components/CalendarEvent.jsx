import { formatInTimeZone } from 'date-fns-tz';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Menu, Item, useContextMenu } from 'react-contexify';
import { CiTrash } from 'react-icons/ci';
import 'react-contexify/dist/ReactContexify.css';
import '../styles.module.css';
import { alertConfirm } from '../../../plugins';
import { useDispatch } from 'react-redux';
import { deleteDate, eventClearActiveEvent } from '../../../store/slices/uiSlice';
import { BADGE_COLORS, ZONE } from '../../../constants';

const MENU_ID = 'menu-id';

export const CalendarEvent = ({ event }) => {
  const dispatch = useDispatch();
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  const { title, start, end, id, estado } = event;

  const horaInicio = formatInTimeZone(start, ZONE, 'HH:mm');
  const horaFin = formatInTimeZone(end, ZONE, 'HH:mm');

  const handleClick = (date) => {
    alertConfirm({
      title: 'Eliminar Cita',
      text: '¿Estas seguro de eliminar la cita?',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result) {
        dispatch(deleteDate(event?.id));
        return;
      } else {
        dispatch(eventClearActiveEvent());
      }
    });
  };

  // const handleChangeStatus = (date) => {};

  return (
    <>
      <div
        key={id}
        onContextMenu={show}
        style={{
          fontSize: '12px',
        }}
      >
        <div className='d-flex justify-content-space-around flex-wrap'>
          <strong className='text-break'>{title}</strong>
        </div>
        <div className='d-flex justify-content-between'>
          <small className='px-1'>
            hora: {horaInicio} - {horaFin}
          </small>
          <small className='px-1'>
            <Badge bg={BADGE_COLORS[estado.nombre]} className='text-wrap'>
              {estado.nombre}
            </Badge>
          </small>
        </div>
      </div>
      <Menu id={MENU_ID} animation={{ enter: 'scale', exit: 'flip' }} theme='light'>
        <Item onClick={() => handleClick(event)}>
          <CiTrash /> Eliminar
        </Item>
        {/* <Item onClick={() => handleChangeStatus(event)}>
          <LiaExchangeAltSolid /> Cambiar Estado
        </Item> */}
      </Menu>
    </>
  );
};
