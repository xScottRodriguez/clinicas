import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Encriptaciones from '../../../../../services/Encriptaciones';
import { FaRegUser } from 'react-icons/fa';
import { VscFiles } from 'react-icons/vsc';
import { useResetStore } from '../../../../../hooks/useResetStore';
import {
  UUID_ESPECIALIDADES,
  UUID_LISTA_MEDICOS,
  UUID_MEDICOS,
  UUID_SUB_ESPECIALIDADS,
} from '../../../../../constants';
import { AiOutlineMedicineBox } from 'react-icons/ai';

export default function MenuMedicos() {
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
            data-bs-target='#collapseMedicos'
            aria-expanded='false'
            aria-controls='collapseMedicos'
          >
            <div className='nav-link-icon'>
              <FaRegUser size={28} />
            </div>
            Medicos
            <div className='sidenav-collapse-arrow'>
              <i className='fas fa-angle-down' />
            </div>
          </NavLink>
          <div
            className={'collapse'}
            id='collapseMedicos'
            data-bs-parent='#accordionSidenav'
          >
            <nav className='sidenav-menu-nested nav'>
              {permisos.includes(UUID_MEDICOS) && (
                <>
                  {permisos.includes(UUID_LISTA_MEDICOS) && (
                    <Link className='nav-link' to='/medicos' onClick={resetStore}>
                      <VscFiles size={24} className='mx-1' />
                      Lista
                    </Link>
                  )}

                  {permisos.includes(UUID_ESPECIALIDADES) && (
                    <Link
                      className='nav-link'
                      to='/medicos/especialidades'
                      onClick={resetStore}
                    >
                      <AiOutlineMedicineBox size={24} className=' mx-1' />
                      Especialidades
                    </Link>
                  )}
                  {permisos.includes(UUID_SUB_ESPECIALIDADS) && (
                    <Link
                      className='nav-link'
                      to='/medicos/sub-especialidades'
                      onClick={resetStore}
                    >
                      <AiOutlineMedicineBox size={24} className=' mx-1' />
                      Sub Especialidades
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
