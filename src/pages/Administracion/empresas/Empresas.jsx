/** @format */

import React, { Fragment, useState, useEffect } from 'react';
import Tabla from '../../../components/listados/Listado';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import peticionesAxios from '../../../services/peticionesAxios';
import Cabeceras from '../../../services/AxiosCabeceras';
import Alertas from '../../../services/Alertas';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import ExportarYAgregar from '../../../components/botones/ExportarYAgregar';

export default function Empresas() {
  //state inicial
  const [datos, setDatos] = useState([]);

  //useEffect renderizar datos
  useEffect(() => {
    //llamos la peticion
    peticioneApi();
  }, []);

  //peticiones api
  const peticioneApi = async () => {
    try {
      const result = await peticionesAxios.find('/administracion/empresas', {
        headers: Cabeceras.getHeader(),
      });
      setDatos(result.data);
    } catch (error) {
      return error;
    }
  };

  //eliminar una comercial
  const handleDelete = async (id) => {
    Alertas.informacion(
      '¿Estas seguro?',
      'Una Empresa Eliminado no se puede recuperar!'
    ).then((res) => {
      if (res) {
        datos.filter((item) => item.item !== id);
        const deleteEmpresa = {
          id: id,
        };
        peticionesAxios
          .borrar('/administracion/empresa', deleteEmpresa, {
            headers: Cabeceras.getHeader(),
          })
          .then((result) => {
            if (result.status === 200) {
              Alertas.alertSuccessDelete('Empresa Eliminado!');
              peticioneApi();
            }
          });
      } else {
        return false;
      }
    });
  };

  //columnas
  const columnDefs = [
    { text: 'ID', dataField: 'id' },
    { text: 'NOMBRE EMPRESA', dataField: 'nombre_comercial_empresa' },
    { text: 'PREFIJO', dataField: 'id_prefijo' },
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
        ruta={`/administracion/empresas/update/${row.id}`}
        borrar={() => handleDelete(row.id)}
      />
    );
  }

  return (
    <Fragment>
      <LayoutForm title='Empresas'>
        <div className='card mb-4'>
          <div className='card-header'>Lista de Empresas</div>
          <div className='card-body'>
            <ExportarYAgregar
              nombre={'Agregar nueva empresa'}
              ruta={'/administracion/empresas/nuevo'}
            />
            <Tabla id={'id'} data={datos} columns={columnDefs} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
