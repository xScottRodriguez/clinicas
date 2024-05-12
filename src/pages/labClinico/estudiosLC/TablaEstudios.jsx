import React, { Fragment, useState } from 'react';
import Listado from '../../../components/listados/Listado';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import Botones from '../../../components/botones/BotonesExportaryAgregar';
import Modales from '../../../components/modal/Modal';
import BotonesTablaEstudios from '../../../components/botones/BotonesTablaEstudios';
import EstudiosNuevos from './EstudiosNuevos';

export default function TablaEstudios() {
  const [estudios, setEstudios] = useState({});

  //definimos las columanas de nuestra tabla
  const columns = [
    { text: 'CÓDIGO', dataField: 'codigo' },
    { text: 'NOMBRE DEL ESTUDIO', dataField: 'model' },
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
      <BotonesTablaEstudios
        editar={'EDITAR'}
        agg={'AGREGAR FORMATO'}
        eliminar={'ELIMINAR'}
        acciones={'ACCIONES'}
        ruta={'/lab_clinico/estudios/formato'}
      />
    );
  }

  const datos = [
    { codigo: '524521', model: 'Glucosa' },
    { codigo: '5121', model: 'Colesterol' },
    { codigo: '456612', model: 'COLESTEROL H. D. L.' },
    { codigo: '54564', model: 'COLESTEROL L. D. L' },
    { codigo: '65653', model: 'TRIGLICERIDOS' },
    { codigo: '20230', model: 'LIPIDOS TOTALES' },
    { codigo: '1312', model: 'ACIDO URICO' },
    { codigo: '2155', model: 'CREATININA' },
    { codigo: '456456', model: 'NITROGENO UREICO' },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
    console.log(isOpen);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  //funcion que lee los estados de los input y almacena en state
  const handlechangesEstudios = (e) => {
    setEstudios({
      ...estudios,
      [e.target.id]: e.target.value,
    });
  };

  //funcion para enviar los datos y guardar en la DB
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Almacenando los datos');
  };

  return (
    <Fragment>
      <LayoutForm title='Administracion de estudios'>
        <div className='card mb-4'>
          <div className='card-header'>Listado de estudios L.C</div>

          <div className='card-body mt-auto'>
            <Botones agregar={showModal} nombre={'Agregar estudio'} />
            <Listado id={'codigo'} data={datos} columns={columns} />
          </div>
          <Modales
            agregar={handleSubmit}
            title={'Registro de estudios de Lab. Clínico'}
            cerrar={hideModal}
            abrir={isOpen}
          >
            <EstudiosNuevos enviar={handleSubmit} cambiar={handlechangesEstudios} />
          </Modales>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
