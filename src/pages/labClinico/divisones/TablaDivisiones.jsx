import React, { Fragment, useState } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import Listado from '../../../components/listados/Listado';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import Botones from '../../../components/botones/BotonesExportaryAgregar';
import Modales from '../../../components/modal/Modal';
import NuevosDivisiones from './NuevosDivisiones';
export default function TablaDivisiones() {
  const [estudios, setEstudios] = useState({});
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
    return <BontonesAcciones ruta={'#'} borrar={() => 'ho'} />;
  }

  const datos = [
    { codigo: '1', nombre: 'INMUNOLOGIA' },
    { codigo: '2', nombre: 'HEMATOLOGIA' },
    { codigo: '3', nombre: 'QUIMICA SANGUINEA' },
    { codigo: '4', nombre: 'BACTERIOLOGIA' },
    { codigo: '5', nombre: 'UROANALISIS' },
    { codigo: '6', nombre: 'HECES' },
    { codigo: '7', nombre: 'CHEQUEOS MEDICOS' },
    { codigo: '8', nombre: 'CREATININA' },
    { codigo: '9', nombre: 'CHEQUEO MEDICO EXTRANJEROS' },
    { codigo: '10', nombre: 'COSTOS DE EXAMENES' },
    { codigo: '11', nombre: 'ENVIADOS A SAN SALVADOR' },
    { codigo: '12', nombre: 'NITROGENO UREICO' },
    { codigo: '13', nombre: 'NITROGENO UREICO' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const handlechangesDivisiones = (e) => {
    setEstudios({
      ...estudios,
      [e.target.id]: e.target.value,
    });
  };

  //funcion para enviar los datos y guardar en la DB
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <LayoutForm ttitle='Administracion de divisiones Lab. Clinico'>
        <div className='card mb-4'>
          <div className='card-header'>Listado de Divisiones</div>
          <div className='card-body'>
            <Botones agregar={showModal} nombre={'Agrega nueva division'} />
            <Listado id={'codigo'} data={datos} columns={columns} />
          </div>
        </div>
        <Modales
          agregar={handleSubmit}
          title={'Regresa listado de divisiones'}
          cerrar={hideModal}
          abrir={isOpen}
        >
          <NuevosDivisiones cambiar={handlechangesDivisiones} />
        </Modales>
      </LayoutForm>
    </Fragment>
  );
}
