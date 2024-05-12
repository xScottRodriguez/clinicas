import React, { Fragment } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
// import { NavL } from "react-router-dom";
import EstudiosLabClínico from './EstudiosLabClínico';
import EstudiosOrden from './EstudiosOrden';
export default function TablaPrincipal() {
  return (
    <Fragment>
      <LayoutForm title='Estudios'>
        <div className='card mb-4'>
          <div className='card-header border'>
            Selección de Estudios de Lab. Clínico
          </div>
          <div className='card-body'>
            <form>
              <div className='row gx mb-3'>
                <div className='border mt-h-75'>
                  <EstudiosLabClínico />
                </div>
                <div className='card-header mt-5 border'>Estudios de Orden</div>
                <div className='border mt-h-75 '>
                  <EstudiosOrden />
                </div>
              </div>
            </form>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
