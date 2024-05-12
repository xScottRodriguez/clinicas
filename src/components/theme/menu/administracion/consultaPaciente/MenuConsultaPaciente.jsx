import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { RiFoldersLine } from 'react-icons/ri';
import { VscFiles } from 'react-icons/vsc';
import { useResetStore } from '../../../../../hooks/useResetStore';
import { CiCalendar } from 'react-icons/ci';
import { UUID_AGENDA_CITAS, UUID_LISTA_EXPEDIENTE } from '../../../../../constants';

export default function MenuConsultaPaciente() {
  const permisos = Encriptaciones.getSession('modulos');
  const resetStore = useResetStore();

  return (
    <Fragment>
      {permisos.includes('ee949b41-2a99-49a9-84d6-5af4b33518a4') && (
        <>
          <NavLink
            className={'nav-link collapsed'}
            to={'"javascript:void(0);"'}
            data-bs-toggle='collapse'
            data-bs-target='#collapseFlows'
            aria-expanded='false'
            aria-controls='collapseFlows'
          >
            <div className='nav-link-icon'>
              <RiFoldersLine size={28} />
            </div>
            Expedientes medicos.
            <div className='sidenav-collapse-arrow'>
              <i className='fas fa-angle-down' />
            </div>
          </NavLink>
          <div
            className={'collapse'}
            id='collapseFlows'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes('a9b741b3-80a4-43d3-88b2-fbce12e41e35') && (
                <>
                  {permisos.includes(UUID_LISTA_EXPEDIENTE) && (
                    <Link
                      className='nav-link'
                      to='/expedientes-medicos'
                      onClick={resetStore}
                    >
                      <VscFiles size={24} className='mx-1' />
                      Lista
                    </Link>
                  )}
                  {permisos.includes(UUID_AGENDA_CITAS) && (
                    <Link
                      className='nav-link'
                      to='/expedientes-medicos/agenda-citas'
                      onClick={resetStore}
                    >
                      <CiCalendar size={24} className='mx-1' />
                      Agenda de Citas
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </Fragment>
  );
}
