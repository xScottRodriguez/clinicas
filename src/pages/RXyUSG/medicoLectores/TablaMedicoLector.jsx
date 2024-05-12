import React, { Fragment } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import Listado from '../../../components/listados/Listado';
import Botones from '../../../components/botones/ExportarYAgregar';

export default function TablaMedicoLector() {
  //definimos la data que pasaremos a la tabla
  const datos = [
    { codigo: '1', nombre: 'Dr. Hugo Pérez Rea Méndez' },
    { codigo: '2', nombre: 'D. Julián Ruíz Anguas' },
    { codigo: '3', nombre: 'QUIMICA SANGUINEA' },
    { codigo: '4', nombre: 'Dr Erik Bryam Ruiz de Esparza García  ' },
    { codigo: '5', nombre: 'Dr. Aarón Arturo Robles Ramírez' },
    { codigo: '6', nombre: 'Dr- Edgar Jesús Llovera Hernández' },
    { codigo: '7', nombre: 'Dr. Aarón Cohen Bravo' },
    { codigo: '8', nombre: 'Dr. Aarón Eduardo Hernández López' },
    { codigo: '9', nombre: 'Dr. Aarón Job Piña Cárdenas' },
    { codigo: '10', nombre: 'Dr. Aarón López Quiñonez' },
    { codigo: '11', nombre: 'Dr Erick Y. Saucedo Martínez' },
    { codigo: '12', nombre: 'Dr O. Benjamín González Manzo' },
    { codigo: '13', nombre: 'Dr. Aarón Arturo Robles Ramírez' },
  ];
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
    return <BontonesAcciones ruta={'EDITAR'} borrar={'ELIMINAR'} />;
  }
  return (
    <Fragment>
      <LayoutForm title='Administracion de medicos lectores RX y USG'>
        <div className='card mb-4'>
          <div className='card-header'>Registro de mdicos lectores Rx y USG</div>
          <div className='card-body'>
            <Botones
              nombre='Agregar nuevo medico'
              ruta={'/rx_usg/medicos_lectores/nuevo'}
            />
            <Listado columns={columns} data={datos} id={'codigo'} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
