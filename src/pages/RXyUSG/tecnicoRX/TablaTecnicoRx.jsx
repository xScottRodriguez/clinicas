import React, { Fragment } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import Listado from '../../../components/listados/Listado';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import Botones from '../../../components/botones/ExportarYAgregar';
export default function TablaTecnicoRx() {
  const columns = [
    { text: 'CÓDIGO', dataField: 'codigo' },
    { text: 'NOMBRE', dataField: 'nombre' },
    {
      dataField: 'actions',
      text: 'ACCIONES',
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    console.log(cell);
    return <BontonesAcciones ruta={'EDITAR'} borrar={'ELIMINAR'} />;
  }

  const datos = [
    { codigo: '1', nombre: 'María de los Ángeles' },
    { codigo: '2', nombre: 'Juan de Dios' },
    { codigo: '3', nombre: 'María del Carmen' },
    { codigo: '4', nombre: 'Camila de la Santísima Trinidad' },
    { codigo: '5', nombre: 'Jorge de la Cruz' },
    { codigo: '6', nombre: 'Patricia del Rosario' },
    { codigo: '7', nombre: 'Gabriel del Cristo' },
    { codigo: '8', nombre: 'Juana de la Santísima Cruz' },
    { codigo: '9', nombre: 'Jairo de Jesús' },
    { codigo: '10', nombre: 'Tatiana de las Mercedes' },
    { codigo: '11', nombre: 'Sara del Mar' },
    { codigo: '12', nombre: 'Pedro del Divino Niño' },
    { codigo: '13', nombre: 'Pedro del Divino Niño' },
  ];
  return (
    <Fragment>
      <LayoutForm title={'Administracion de tecnicos de RX y USG'}>
        <div className='card mb-4'>
          <div className='card-header'>Listado de tecnicos de RX y USG</div>
          <div className='card-body'>
            <Botones nombre={'Agregar un nuevo tecnico'} />
            <Listado id={'codigo'} data={datos} columns={columns} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
