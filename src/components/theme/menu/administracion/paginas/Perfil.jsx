import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { useResetStore } from '../../../../../hooks/useResetStore';

export default function Perfil() {
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
            className={'nav-link collapsed'}
            to={"'javascript:void(0);'"}
            data-bs-toggle={'collapse'}
            data-bs-target={'#collapsePages'}
            aria-expanded={'false'}
            aria-controls={'collapsePages'}
          >
            <div className={'nav-link-icon'}>
              <i className='fa fa-prescription' />
            </div>
            RX y USG
            <div className={'sidenav-collapse-arrow'}>
              <i className={'fas fa-angle-down'} />
            </div>
          </NavLink>
          <div
            className='collapse'
            id='collapsePages'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <NavLink
                  className={'nav-link'}
                  to={'/rx_usg/medicos_lectores'}
                  onClick={handleClick}
                >
                  <div className={'nav-link-icon'}>
                    <i className='fa fa-user' />
                  </div>
                  Medicos lectores Rx
                </NavLink>
              )}
            </nav>

            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('') && (
                <NavLink
                  className={'nav-link'}
                  to={'/rx_usg/tecnicos_rx'}
                  onClick={handleClick}
                >
                  <div className={'nav-link-icon'}>
                    <i className={'fa fa-light fa-address-card'} />
                  </div>
                  Tecnico RX
                </NavLink>
              )}
            </nav>
          </div>
        </>
      )}
    </Fragment>
  );
}
