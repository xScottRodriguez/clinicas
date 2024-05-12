/** @format */

import React, { Fragment, useRef, useState } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import PeticionesAxios from '../../services/peticionesAxios.js';
import Alertas from '../../services/Alertas';
import BontonesAcciones from '../../components/botones/BontonesAcciones';
import ExportarYAgregar from '../../components/botones/ExportarYAgregar';
import 'react-contexify/dist/ReactContexify.css';
import { useGetUsersQuery } from '../../services/rtk-query';
import { TablePlugin } from '../../plugins/components/TablePlugin.jsx';

export default function Usuarios() {
  const [filtering, setFiltering] = useState('');
  const { data, isFetching } = useGetUsersQuery(filtering);
  const tablaRef = useRef();
  // const resetStore = useResetStore();

  //cambiamos el estado para que el usuario no vea esos datos en la vista(se boorara)
  const Delete = (id, activo) => {
    Alertas.loading_reload(true);
    const data = {
      activo,
    };
    PeticionesAxios.PATCH(`user/${id}`, data).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        if (result.status === 200) {
          tablaRef.current.clear();
          if (activo === true) {
            Alertas.toast_success('Usuario activado con éxito!');
          } else if (activo === false) {
            Alertas.toast_success('Usuario anulado con éxito!');
          }
        }
      }
    });
  };

  const handleDelete = (id, activo) => {
    if (activo === false) {
      Alertas.QuestionYesNo(
        '¿Deseas activar este usuario?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, true);
        }
      });
    } else if (activo === true) {
      Alertas.QuestionYesNo(
        '¿Desea desativar este usuario?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, false);
          this.refs.tabla.clear();
        }
      });
    }
  };

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

  //definimos columnas para la tablas
  const columnDefs = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'NOMBRE DE USUARIO', accessorKey: 'usuario' },
    { header: 'USUARIO', accessorKey: 'nombre' },
    { header: 'ROL ASIGNADO', accessorKey: 'rol.nombre' },
    {
      header: 'ESTADO',
      accessorKey: 'activo',
      cell: activado,
    },
    {
      accessorKey: '',
      header: 'ACCIONES',
      isDummyField: true,
      csvExport: false,
      cell: rankFormatter,
    },
  ];

  function rankFormatter({ row: { original } }) {
    return (
      <BontonesAcciones
        borrar={() => handleDelete(original.id, original.activo)}
        ruta={`/usuarios/update/${original.id}`}
      />
    );
  }

  // const updateUser = ({ event, props, row }) => {
  //   navigate(`/usuarios/update/${props[0].id}`);
  // };

  // const rowEvents = {
  //   onContextMenu: (e, row, rowIndex) => {
  //     e.preventDefault();
  //     contextMenu.show({
  //       id: 'id',
  //       event: e,
  //       props: [{ activo: row.activo, id: row.id }],
  //     });
  //   },
  // };
  // const estatusModul = ({ event, props, row }) => {
  //   const id = props[0].id;
  //   const activo = props[0].activo;
  //   handleDelete(id, activo);
  // };

  // function IconFont(props) {
  //   return <i {...props} style={{ marginRight: '10px' }} />;
  // }

  const handleFiltering = (data) => {
    setFiltering(data);
  };
  return (
    <Fragment>
      <LayoutForm title='Usuarios'>
        <h3>Lista de Usuarios</h3>
        <hr />
        <ExportarYAgregar ruta={'/usuarios/nuevo'} nombre={'AGREGAR NUEVO'} />
        <TablePlugin
          columns={columnDefs}
          data={data}
          isFetching={isFetching}
          isInternalFiltering={false}
          onFilteringChange={handleFiltering}
          filtering={filtering}
        />
      </LayoutForm>
    </Fragment>
  );
}
