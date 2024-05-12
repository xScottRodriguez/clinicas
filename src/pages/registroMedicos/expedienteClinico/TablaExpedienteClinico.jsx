/** @format */

import React, { Fragment, useState } from 'react';
import ExportarYAgregar from '../../../components/botones/ExportarYAgregar';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import { useGetClinicalRecordsQuery } from '../../../services/rtk-query/clinicalApi';
import { OptionsColumns } from './components/OptionsColumns';
import { ModalPreviewReport } from '../../../components/modals/ModalPreviewReport';
import { TablePlugin } from '../../../plugins/components/TablePlugin';

const activado = ({ row: { original } }) => {
  return (
    <div>
      {!original.activo ? (
        <span className='badge bg-green-soft text-green'>Activado</span>
      ) : (
        <span className='badge bg-red-soft text-red'>Desactivado</span>
      )}
    </div>
  );
};
const columns = [
  { header: 'Id', accessorKey: 'id' },
  { header: 'Paciente', accessorKey: 'nombre' },
  { header: 'Expediente Valido', accessorKey: 'activo', cell: activado },
  {
    header: 'Opciones',
    accessorKey: 'id',
    cell: ({ row: { original } }) => <OptionsColumns id={original.id} />,
  },
];
export default function TablaExpedienteClinico() {
  const [filtering, setFiltering] = useState('');
  const { data, isFetching } = useGetClinicalRecordsQuery(filtering);

  const onFiltering = (data) => setFiltering(data);
  return (
    <Fragment>
      <LayoutForm title='Expedientes Clinicos'>
        <div className='card shadow-none mb-4'>
          <div className='card-body'>
            <div className='card-title display-6'>Listado Expedientes clinicos</div>
            <hr />
            <ExportarYAgregar
              ruta={'/expedientes-medicos/pacientes/nuevo'}
              nombre={'Nuevo Expediente'}
            />
            <TablePlugin
              data={data}
              isFetching={isFetching}
              columns={columns}
              onFilteringChange={onFiltering}
              isInternalFiltering={false}
              filtering={filtering}
            />
          </div>
        </div>
      </LayoutForm>
      <ModalPreviewReport />
    </Fragment>
  );
}
