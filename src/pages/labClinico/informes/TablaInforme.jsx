import React, { Fragment } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import Listado from '../../../components/listados/Listado';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';

export default function TablaInforme() {
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

  const datos = [{ codigo: '1', nombre: 'INFORME DE ESTUDIOS PENDIENTES' }];

  return (
    <Fragment>
      <LayoutForm ttitle='Administración de informes de Lab. Clínico'>
        <div className='card mb-4'>
          <div className='card-header'>Listado de Divisiones</div>
          <div className='card-body'>
            <Listado id={'codigo'} data={datos} columns={columns} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
