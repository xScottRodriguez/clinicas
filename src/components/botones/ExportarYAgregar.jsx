/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'jspdf-autotable';

export default function ExportarYAgregar(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
        <button
          onClick={() => navigate(props.ruta)}
          className={'btn btn-primary'}
          type='button'
        >
          <span className='fa fa-plus' style={{ marginRight: '10px' }}></span>
          {props.nombre}
        </button>
      </div>
    </React.Fragment>
  );
}
