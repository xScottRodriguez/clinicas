import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function BontonesAcciones(props) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className='dropdown'>
        <button
          className='btn btn-outline-primary dropdown-toggle'
          id='dropdownMenuButton'
          type='button'
          data-bs-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          ACCIONES
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <button
            onClick={() => navigate(props.ruta)}
            className='dropdown-item'
            type='button'
          >
            <span className='fas fa-edit' style={{ marginRight: '10px' }}></span>
            Editar
          </button>
          <button onClick={props.borrar} className='dropdown-item' type='button'>
            <span
              className='far fa-trash-alt'
              style={{ marginRight: '10px' }}
            ></span>
            Eliminar
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
