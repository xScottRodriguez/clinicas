/** @format */

import React, { useMemo, useState } from 'react';
import 'react-contexify/dist/ReactContexify.css';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import PeticionesAxios from '../../../services/peticionesAxios';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import Alertas from '../../../services/Alertas';
import { TablePlugin } from '../../../plugins/components/TablePlugin';
import { useGetPeoplesQuery } from '../../../services/rtk-query';
import ExportarYAgregar from '../../../components/botones/ExportarYAgregar';
export const Personas = () => {
  const [filtering, setFiltering] = useState('');
  const { data, isFetching, refetch } = useGetPeoplesQuery(filtering);

  const activado = ({ row: { original } }) => {
    return (
      <div>
        {original.status ? (
          <span className='badge bg-green-soft text-green'>Activado</span>
        ) : (
          <span className='badge bg-red-soft text-red'>Desactivado</span>
        )}
      </div>
    );
  };
  function rankFormatter({ row: { original } }) {
    return (
      <BontonesAcciones
        ruta={`/persona/update/${original.id}`}
        borrar={() => handleDelete(original.id, original.status)}
      />
    );
  }

  const columns = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id', sort: true },
      { header: 'NOMBRE', accessorKey: 'fullName', sort: true },
      { header: 'ESTADO CIVIL', accessorKey: 'personasEstadoCivil.descripcion', sort: true },
      { header: 'SEXO', accessorKey: 'personasSexo.nombre' },
      {
        header: 'DOCUMENTO DE IDENTIDAD',
        accessorKey: 'dui',
      },
      {
        header: 'ESTADO',
        accessorKey: 'status',
        cell: activado,
      },
      {
        accessorKey: 'actions',
        header: 'ACCIONES',
        isDummyField: true,
        csvExport: false,
        cell: rankFormatter,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDelete = (id, activo) => {
    if (!activo) {
      return Alertas.QuestionYesNo(
        '¿Deseas activar esta Persona?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, true);
          refetch();
        }
      });
    }
    return Alertas.QuestionYesNo(
      '¿Desea desativar esta Persona?',
      'Administración de proyectos'
    ).then((resp) => {
      if (resp) {
        Delete(id, false);
        refetch();
      }
    });
  };
  const Delete = (id, activo) => {
    Alertas.loading_reload(true);
    const data = {
      activo,
    };
    PeticionesAxios.PATCH(`personas/${id}`, data).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        if (result.status === 200) {
          if (activo === true) {
            Alertas.toast_success('¡Módulos activado con éxito!');
          } else if (activo === false) {
            Alertas.toast_success('¡Módulo anulado con éxito!');
          }
        }
      }
    });
  };

  const onFiltering = (data) => setFiltering(data);

  return (
    <LayoutForm>
      <h3>Lista de Personas</h3>
      <hr />
      <ExportarYAgregar nombre={'AGREGAR'} ruta={'/persona/nuevo'} />
      <TablePlugin
        columns={columns}
        data={data}
        isFetching={isFetching}
        filtering={filtering}
        onFilteringChange={onFiltering}
        isInternalFiltering={false}
      />
    </LayoutForm>
  );
};
