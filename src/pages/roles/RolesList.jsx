/** @format */

import React, { useState } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import peticionesAxios from '../../services/peticionesAxios';
import Alertas from '../../services/Alertas';
import ExportarYAgregar from '../../components/botones/ExportarYAgregar';
import BontonesAcciones from '../../components/botones/BontonesAcciones';
import 'react-contexify/dist/ReactContexify.css';
import { TablePlugin } from '../../plugins/components/TablePlugin';
import { useGetRolesQuery } from '../../services/rtk-query';

export default function Roles() {
  const [filtering, setFiltering] = useState('');
  const { data, isFetching, refetch } = useGetRolesQuery(filtering);

  const activado = ({ row: { original } }) => {
    return (
      <div>
        {original.activo ? (
          <span className='badge bg-green-soft text-green'>Activado</span>
        ) : (
          <span className='badge bg-red-soft text-red'>Desactivado</span>
        )}
      </div>
    );
  };
  //definimos las columnas de la tabla
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'NOMBRE DEL ROL', accessorKey: 'nombre' },
    {
      header: 'ACTIVO',
      accessorKey: 'activo',
      cell: activado,
    },

    {
      accessorKey: 'actions',
      header: 'ACCIONES',
      cell: rankFormatter,
    },
  ];

  const onFiltering = (data) => {
    setFiltering(data);
  };
  function rankFormatter({ row: { original } }) {
    return (
      <BontonesAcciones
        ruta={`/roles/update/${original.id}`}
        borrar={() => handleDelete(original.id, original.activo)}
      />
    );
  }
  const estatusRol = ({ event, props, row }) => {
    const id = props[0].id;
    const activo = props[0].activo;

    handleDelete(id, activo);
  };

  const Delete = (id, activo) => {
    Alertas.loading_reload(true);
    const data = {
      activo,
    };
    peticionesAxios.PATCH(`roles/${id}`, data).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        if (result.status === 200) {
          if (activo === true) {
            refetch();
            Alertas.toast_success('Rol activado con éxito!');
          } else if (activo === false) {
            refetch();
            Alertas.toast_success('Rol anulado con éxito!');
          }
        }
      }
    });
  };

  const handleDelete = (id, activo) => {
    if (activo === false) {
      Alertas.QuestionYesNo(
        '¿Deseas activar este Rol?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, true);
        }
      });
    } else if (activo === true) {
      Alertas.QuestionYesNo(
        '¿Desea desativar este Rol?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, false);
        }
      });
    }
  };

  return (
    <LayoutForm title='Roles'>
      <h3>Lista de Roles</h3>
      <hr />
      <ExportarYAgregar ruta={'/roles/nuevo'} nombre={'AGREGAR NUEVO'} />
      <TablePlugin
        columns={columns}
        data={data}
        isFetching={isFetching}
        onFilteringChange={onFiltering}
        filtering={filtering}
        isInternalFiltering={false}
      />
    </LayoutForm>
  );
}
