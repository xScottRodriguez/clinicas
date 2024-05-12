import React, { useMemo } from 'react';
import { TablePlugin } from '../../../plugins/components/TablePlugin';
import { useSubEspecialidadesQuery } from '../../../services/rtk-query/clinicalApi';
import { ModalSubOptions } from './ModalSubOptions';

export const TableSubEspecialidades = () => {
  // const [filtering, setFiltering] = useState('');
  const { data, isFetching } = useSubEspecialidadesQuery();
  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'Sub Especialidad',
        accessorKey: 'nombre',
      },
      {
        header: 'Opciones',
        accessorKey: 'id',
        cell: ({ row: { original } }) => <ModalSubOptions cell={original} />,
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
