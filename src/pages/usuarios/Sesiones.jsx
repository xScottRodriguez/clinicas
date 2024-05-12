import React, { Fragment, useState, useEffect } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import Tabla from '../../components/listados/Listado';
import PeticionesAxios from '../../services/peticionesAxios.js';
import Cabecera from '../../services/AxiosCabeceras';
import Alertas from '../../services/Alertas';

export const Sesiones = () => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    sessionesActivas();
  }, []);

  const columnDefs = [
    { text: 'nombre de usuario', dataField: 'username' },
    { text: 'Fecha y hora', dataField: 'hora' },
    { text: 'Direccion ip', dataField: 'ipAddress' },
    {
      dataField: 'actions',
      text: 'ACCIONES',
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  const sessionesActivas = async () => {
    try {
      const activas = await PeticionesAxios.find(
        '/administracion/user/sesiones/all',
        { headers: Cabecera.getHeader() }
      );
      setDatos(activas.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSesion = (id) => {
    try {
      Alertas.informacion('¿Estas seguro?').then((result) => {
        if (result) {
          datos.filter((item) => item.item !== id);
          const dataUpdate = {
            activo: 0,
            id: id,
          };
          PeticionesAxios.update('/administracion/user/sesiones', dataUpdate, {
            headers: Cabecera.getHeader(),
          }).then((up) => {
            if (up.status === 200) {
              Alertas.alertSuccessUpdate('Sesion finalizada con éxito');
              sessionesActivas();
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //definimos columnas para la tablas

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          id='dropdownMenuButton'
          type='button'
          data-bs-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          Acciones
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <button
            onClick={() => handleUpdateSesion(row.idSession)}
            className='dropdown-item'
            type='button'
          >
            <span className='fa fa-ban' style={{ marginRight: '10px' }}></span>
            Bloquear sesion
          </button>
        </div>
      </div>
    );
  }

  return (
    <LayoutForm title='Sesione activas'>
      <div className='card mb-4 shadow-none'>
        <div className='card-header'>
          Listado de Usuarios
          <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-6'></div>
        </div>
        <div className='card-body'>
          <Tabla id={'idSession'} data={datos} columns={columnDefs} />
        </div>
      </div>
    </LayoutForm>
  );
};
