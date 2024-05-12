import React, { useMemo, useState } from 'react';
import { TablePlugin } from '../../../plugins/components/TablePlugin';
import { useEspecialidadesQuery } from '../../../services/rtk-query/clinicalApi';
import { ModalOptions } from './ModalOptions';

export const TableEspecialidades = () => {
  // const [filtering, setFiltering] = useState('');
  const { data, isFetching } = useEspecialidadesQuery();
  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'Especialidad',
        accessorKey: 'nombre',
      },
      {
        header: 'Opciones',
        accessorKey: 'id',
        cell: ({ row: { original } }) => <ModalOptions cell={original} />,
      },
    ],
    []
  );
  return (
    <>
      <TablePlugin columns={columns} data={data} isFetching={isFetching} />
    </>
  );
};
