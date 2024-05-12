import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { useResetStore } from '../../../../../hooks/useResetStore';

export function Utilidades() {
  const resetStore = useResetStore();
  const permisos = Encriptaciones.getSession('modulos');

  const handleClick = () => {
    resetStore();
  };

  return (
    <Fragment>
      {permisos.includes('') && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? '' : 'nav-link collapsed')}
            to="'javascript:void(0);"
            data-bs-toggle='collapse'
            data-bs-target='#collapseUtilities'
            aria-expanded='false'
            aria-controls='collapseUtilities'
            onClick={handleClick}
          >
            <div className='nav-link-icon'>
              <i className='fa fa-microscope' />
            </div>
            Lab. clinico
            <div className={'sidenav-collapse-arrow'}>
              <i className={'fas fa-angle-down'} />
            </div>
          </NavLink>
          <div
            className='collapse'
            id='collapseUtilities'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <Link
                  className='nav-link'
                  to='/lab_clinico/estudios'
                  onClick={handleClick}
                >
                  <i className='fa fa-receipt' style={{ marginRight: '10px' }}></i>
                  Estudios L.C
                </Link>
              )}
            </nav>
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <Link
                  className='nav-link'
                  to='/lab_clinico/tecnico_lectores'
                  onClick={handleClick}
                >
                  <i className='fa fa-user' style={{ marginRight: '10px' }} />
                  Tecnico lectores. L.C
                </Link>
              )}
            </nav>
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <Link
                  className='nav-link'
                  to='/lab_clinico/ingreso_resultados'
                  onClick={handleClick}
                >
                  <i className='fa fa-microscope' style={{ marginRight: '10px' }} />
                  Ingreso resultado
                </Link>
              )}
            </nav>
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <Link
                  className={'nav-link'}
                  to='/lab_clinico/divisiones'
                  onClick={handleClick}
                >
                  <i className='fa fa-receipt' style={{ marginRight: '10px' }} />
                  Divisiones
                </Link>
              )}
            </nav>
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <Link
                  className='nav-link'
                  to='/lab_clinico/informes'
                  onClick={handleClick}
                >
                  <i
                    className='fa fa-laptop-medical'
                    style={{ marginRight: '10px' }}
                  />
                  Informes Lab. Clinico
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </Fragment>
  );
}
