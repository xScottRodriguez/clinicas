import React, { Fragment } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import LayoutPanel from '../../containers/layouts/LayoutPanel';
import { CalendarScreen } from './components/CalendarScreen';
import { SelectDoctor } from './components/SelectDoctor';
import { useDatesQuery } from '../../services/rtk-query/clinicalApi';
import { Loader } from '../../components/ui/Loader';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

export default function AgendaCitas() {
  const { doctorFilter } = useSelector((state) => state.ui);
  const { data, isLoading, isError } = useDatesQuery({ medicoId: doctorFilter });
  return (
    <>
      <LayoutForm
        title={
          <>
            <h2>Administracion de Citas</h2>
          </>
        }
      >
        <>
          <SelectDoctor />
          {isLoading && <Loader />}
          {isError && <p>Error al cargar los datos</p>}
          <Badge bg='secondary' className='m-2'>
            Doble click para ver detalles de cita
          </Badge>
          <CalendarScreen events={data} isLoadingEvents={isLoading} />
        </>
      </LayoutForm>
    </>
  );
}
