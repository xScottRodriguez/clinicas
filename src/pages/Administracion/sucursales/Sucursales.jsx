import React, { Fragment, useEffect, useState } from 'react';
import Listado from '../../../components/listados/Listado';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import PeticionesAxios from '../../../services/peticionesAxios';
import headersAxios from '../../../services/AxiosCabeceras';
import Alertas from '../../../services/Alertas';
import BontonesAcciones from '../../../components/botones/BontonesAcciones';
import ExportarYAgregar from '../../../components/botones/ExportarYAgregar';

export default function Administracion() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    sucursalesAll();
  }, []);

  //funcion para llamar al enpoint tipo Get sucurusales
  const sucursalesAll = async () => {
    try {
      const all = await PeticionesAxios.find('/empresas/sucursales', {
        headers: headersAxios,
      });
      setDatos(all.data);
    } catch (error) {
      console.log(error);
    }
  };
  //eliminar sucursal de la vista
  const handleDeleteSucursal = (id) => {
    try {
      Alertas.informacion(
        '¿Estas seguro?',
        'Una sucursal elimiada no se puede recuperar!'
      ).then((res) => {
        if (res) {
          datos.filter((data) => data.data !== id);
          //hacemmos la data que enviaremos
          const deleSucursal = {
            id_sucursal: id,
          };
          //hacemos la peticion
          PeticionesAxios.borrar('/empresas/sucursales', deleSucursal, {
            headers: headersAxios.getHeader(),
          }).then((result) => {
            if (result.status === 200) {
              Alertas.alertSuccessDelete('Sucursal eliminada');
              sucursalesAll();
            }
          });
        } else {
          return false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //definimos columnas
  const columnDefs = [
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
    return (
      <BontonesAcciones
        ruta={`/empresas/sucursales/update/${row.id}`}
        borrar={() => handleDeleteSucursal(row.id)}
      />
    );
  }

  return (
    <Fragment>
      <LayoutForm title='Sucursales'>
        <div className='card mb-4'>
          <div className='card-header'>Lista de Sucursales</div>
          <div className='card-body'>
            <ExportarYAgregar
              nombre={'Agregar nueva sucursal'}
              ruta={'/empresas/sucursales/nuevo'}
            />
            <Listado id={'id'} data={datos} columns={columnDefs} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
