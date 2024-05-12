/** @format */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function BotonesFooter({ saveAction, ruta }) {
  return (
    <Fragment>
      <div className='   text-center'>
        <div className='btn-toggle'>
          <Link to={ruta} type='submit ' className='btn btn-gris  mx-1'>
            <i className='fa fa-times fa-lg' style={{ marginRight: '10px' }} />
            Cancelar
          </Link>

          <button
            type='submit'
            className='btn btn-primary mx-1'
            onClick={saveAction}
          >
            <i className='fa fa-save fa-lg' style={{ marginRight: '10px' }} />
            Guardar
          </button>
        </div>
      </div>
    </Fragment>
  );
}
