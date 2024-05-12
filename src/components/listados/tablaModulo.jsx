/** @format */

import React, { Fragment, useRef } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import PeticionesAxios from '../../services/peticionesAxios';
import Alertas from '../../services/Alertas';
import Listado from '../../components/listados/Listado';
import ExportarYAgregar from '../../components/botones/ExportarYAgregar';
import BontonesAcciones from '../../components/botones/BontonesAcciones';
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS_LISTS } from '../../types';
import { useGetModulesQuery } from '../../services/rtk-query';
import { useEffect } from 'react';
export default function ModulosList() {
  const { data, isSuccess } = useGetModulesQuery();
  const navigate = useNavigate();
  const tablaRef = useRef();
  const [modules, setModules] = React.useState([]);

  useEffect(() => {
    if (isSuccess) {
      const result = data?.map((module) => ({
        id: module.id,
        nombre: module.nombre,
        activo: module.activo,
      }));

      setModules(result);
    }
  }, [data, isSuccess]);

  const Delete = (id, activo) => {
    Alertas.loading_reload(true);
    const data = {
      activo,
    };
    PeticionesAxios.PATCH(`modulo/${id}`, data).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        if (result.status === 200) {
          tablaRef.current.clear();
          if (activo === true) {
            Alertas.toast_success('¡Módulos activado con éxito!');
          } else if (activo === false) {
            Alertas.toast_success('¡Módulo anulado con éxito!');
          }
        }
      }
    });
  };
  const handleDelete = (id, activo) => {
    if (activo === false) {
      Alertas.QuestionYesNo(
        '¿Deseas activar este modulo?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, true);
        }
      });
    } else if (activo === true) {
      Alertas.QuestionYesNo(
        '¿Desea desativar este modulo?',
        'Administración de proyectos'
      ).then((resp) => {
        if (resp) {
          Delete(id, false);
        }
      });
    }
  };
  const activado = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {row.activo ? (
          <span className='badge bg-green-soft text-green'>Activado</span>
        ) : (
          <span className='badge bg-red-soft text-red'>Desactivado</span>
        )}
      </div>
    );
  };

  //definimos columnas para la tablas
  const columnDefs = [
    { text: 'ID', dataField: 'id', sort: true },
    { text: 'NOMBRE', dataField: 'nombre', sort: true },
    {
      text: 'MODULO PRINCIPAL',
      dataField: 'principal.nombre',
      sort: true,
    },
    {
      text: 'ESTADO',
      dataField: 'activo',
      isDummyFielcolumnsd: true,
      csvExport: false,
      formatter: activado,
    },
    {
      dataField: 'actions',
      text: 'ACCIONES',
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <BontonesAcciones
        ruta={`/modulos/update/${row.id}`}
        borrar={() => handleDelete(row.id, row.activo)}
      />
    );
  }
  const actualizarRol = ({ event, props, row }) => {
    navigate(`/modulos/update/${props[0].id}`);
  };

  const estatusModul = ({ event, props, row }) => {
    // const id = props[0].id;
    // const activo = props[0].activo;
    // handleDelete(id, activo);
  };
  const rowEvents = {
    onContextMenu: (e, row, rowIndex) => {
      e.preventDefault();
      contextMenu.show({
        id: 'id',
        event: e,
        props: [{ activo: row.activo, id: row.id }],
      });
    },
  };
  function IconFont(props) {
    return <i {...props} style={{ marginRight: '10px' }} />;
  }

  return (
    <Fragment>
      <LayoutForm title='Módulos'>
        <div className='card mb-4'>
          <div className='card-header border'>Lista de Módulos</div>

          <div className='card-body table-responsive'>
            <ExportarYAgregar
              dataToExport={modules}
              nombre={'AGREGAR NUEVO'}
              ruta={'/modulos/nuevo'}
            />
            <Listado
              id={'idModulo'}
              evento={rowEvents}
              ref={tablaRef}
              columns={columnDefs}
              endpoint={ENDPOINTS_LISTS.MODULES}
            />
          </div>
          <Menu id={'id'}>
            <Item onClick={actualizarRol}>
              <IconFont className='fas fa-edit' /> ACTUALIZAR
            </Item>
            <Item onClick={estatusModul}>
              <IconFont className='far fa-trash-alt' /> ELIMINAR
            </Item>
          </Menu>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
