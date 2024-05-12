import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { VscSettings } from 'react-icons/vsc';
import { RiUserSettingsLine } from 'react-icons/ri';
import { useResetStore } from '../../../../../hooks/useResetStore';

export const Componentes = () => {
  const permisos = Encriptaciones.getSession('modulos');
  const resetStore = useResetStore();

  return (
    <Fragment>
      {permisos.includes('29d9531e-0337-4bc4-926e-17b92cb5b3e0') && (
        <>
          <NavLink
            className={'nav-link collapsed'}
            to={"'javascript:void(0);'"}
            data-bs-toggle='collapse'
            data-bs-target='#collapseComponents'
            aria-expanded='false'
            aria-controls='collapseComponents'
          >
            <div className='nav-link-icon'>
              <VscSettings size={28} />
            </div>
            Administración
            <div className='sidenav-collapse-arrow'>
              <i className='fas fa-angle-down' />
            </div>
          </NavLink>
          <div
            className='collapse'
            id='collapseComponents'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('3b8ea17e-6840-4919-aee6-a2617002a6e4') && (
                <NavLink className='nav-link' to={'/persona/'} onClick={resetStore}>
                  <div className={'nav-link-icon'}>
                    <RiUserSettingsLine size={24} />
                  </div>
                  Persona
                </NavLink>
              )}
              {permisos.includes('9efd33fb-9890-4e2d-82cd-035c3c0c8b9b') && (
                <NavLink
                  className='nav-link'
                  to={'/empresas/sucursales'}
                  onClick={resetStore}
                >
                  <div className={'nav-link-icon'}>
                    <i className='fa fa-city' />
                  </div>
                  Sucursales
                </NavLink>
              )}
              {permisos.includes('7c46f530-24f1-4b42-a62b-162028f3eb34') && (
                <NavLink
                  className='nav-link'
                  to={'/administracion/empresas'}
                  onClick={resetStore}
                >
                  <div className='nav-link-icon'>
                    <i className='fa fa-building' />
                  </div>
                  Empresas
                </NavLink>
              )}
            </nav>
          </div>
        </>
      )}
    </Fragment>
  );
};
