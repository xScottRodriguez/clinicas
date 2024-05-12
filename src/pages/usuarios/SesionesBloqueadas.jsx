import React, { Fragment, useState, useEffect } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import Tabla from '../../components/listados/Listado';
import PeticionesAxios from '../../services/peticionesAxios.js';
import Cabecera from '../../services/AxiosCabeceras';
// import Alertas from "../../services/Alertas";

export const SesionesBloqueadas = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    consultaAPI();
  }, []);
  const consultaAPI = async () => {
    try {
      const api = await PeticionesAxios.find(
        '/administracion/user/bloqueados/all',
        { headers: Cabecera.getHeader() }
      );
      setDatos(api.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { text: 'ID', dataField: 'id', sort: true },
    { text: 'NOMBRE', dataField: 'username', sort: true },
  ];

  return (
    <Fragment>
      <LayoutForm title='Usuarios bloqueados'>
        <div className='card mb-4'>
          <div className='card-header'>
            Listado de Usuarios Bloqueados
            <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-6'></div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <Tabla id={'id'} data={datos} columns={columns} />
            </div>
          </div>
        </div>{' '}
      </LayoutForm>
    </Fragment>
  );
};
