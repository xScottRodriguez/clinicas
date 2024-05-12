import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { LiaCubesSolid } from 'react-icons/lia';
import { LuUsers } from 'react-icons/lu';
import { PiUsersThree } from 'react-icons/pi';
import { useResetStore } from '../../../../../hooks/useResetStore';
export function Seguridad() {
  const resetStore = useResetStore();
  const permisos = Encriptaciones.getSession('modulos');

  return (
    <>
      {permisos.includes('bed80dff-870e-45c1-b326-025a002ff123') && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? '' : 'nav-link collapsed')}
            to={"'javascript:void(0);'"}
            data-bs-toggle='collapse'
            data-bs-target='#collapseLayouts'
            aria-expanded='false'
            aria-controls='collapseLayouts'
          >
            <div className={'nav-link-icon'}>
              <AiOutlineSecurityScan size={28} />
            </div>
            Seguridad
            <div className='sidenav-collapse-arrow'>
              <i className='fas fa-angle-down' />
            </div>
          </NavLink>
          <div
            className='collapse'
            id='collapseLayouts'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('75bcf8a7-3eb2-4b07-b893-05fa7f6bae12') && (
                <NavLink
                  className={'nav-link'}
                  to={'/modulos'}
                  onClick={resetStore}
                >
                  <div className={'nav-link-icon'}>
                    <LiaCubesSolid size={24} />
                  </div>
                  Módulos
                </NavLink>
              )}
              {permisos.includes('855c38cd-adc4-4a4f-85e2-9d0cf9078594') && (
                <NavLink
                  className={'nav-link'}
                  to={'/usuarios'}
                  onClick={resetStore}
                >
                  <div className={'nav-link-icon'}>
                    <LuUsers size={24} />
                  </div>
                  Usuarios
                </NavLink>
              )}
              {permisos.includes('7db77ba8-1766-4c94-8357-48121205e43f') && (
                <NavLink className={'nav-link'} to={'/roles'} onClick={resetStore}>
                  <div className={'nav-link-icon'}>
                    <PiUsersThree size={24} />
                  </div>
                  Roles
                </NavLink>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
