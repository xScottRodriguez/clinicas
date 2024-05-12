import React, { Fragment } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import Listado from '../../../components/listados/Listado';
import ExportarYAgregar from '../../../components/botones/ExportarYAgregar';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';

export default function TablaSucursalesLab() {
  // const navigate = useNavigate();

  const columns = [
    { text: 'CÓDIGO', dataField: 'codigo' },
    { text: 'NOMBRE TÉCNICO', dataField: 'nombre' },
    {
      dataField: 'actions',
      text: 'ACCIONES',
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return <BontonesAcciones />;
  }

  const datos = [
    { codigo: '524521', nombre: 'ALEYDA EMPERATRIZ ARGUETA OCHOA' },
    { codigo: '5121', nombre: 'CELINA DEL TRANSITO BATRES HERRERA' },
    { codigo: '51421', nombre: 'CINDY STEFHANY ZELAYA ROMERO' },
    { codigo: '51821', nombre: 'DIANA ALEXANDRA MORALES RAMIREZ' },
    { codigo: '51+21', nombre: 'EDITH MARINETH BENITEZ' },
    { codigo: '52121', nombre: 'ENA JEANNETTE ORELLANA CORTEZ' },
    { codigo: '55121', nombre: 'ETELVINA GUADALUPE VENTURA RUIZ' },
    { codigo: '51521', nombre: 'GABRIELA ABIGAIL SALGADO SALVADOR' },
    { codigo: '515121', nombre: 'GRECIA ZENAYDA LOPEZ' },
    { codigo: '512281', nombre: 'JENNY LILIBETH MEJIA SARAVIA' },
    { codigo: '865121', nombre: 'JOSUE ANTONIO ARGUETA CHAVEZ' },
    { codigo: '5194621', nombre: 'JUDITH ARELY ORDOÑES DE ORTIZ' },
    { codigo: '5444', nombre: 'KARLA GABRIELA AVELAR VIGIL' },
    { codigo: '89465', nombre: 'KEIRY MELISSA CRESPO PORTILLO' },
  ];

  return (
    <Fragment>
      <LayoutForm>
        <div className='card mb-4'>
          <div className='card-header'>
            Administracion medicos lectores de Lab.Clinico
          </div>
          <div className='card-body'>
            <ExportarYAgregar
              nombre={'Agregar tecnico'}
              ruta={'/lab_clinico/tecnico_lectores/nuevo'}
            />
            <Listado id={'codigo'} data={datos} columns={columns} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
