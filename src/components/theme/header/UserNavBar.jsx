import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Encriptaciones from '../../../services/Encriptaciones';
import { useResetStore } from '../../../hooks/useResetStore';
import { useNavigate } from 'react-router-dom';
import { cleanCacheApi, clearCookies } from '../../../utils';
export default function UserNavBar() {
  const resetStore = useResetStore();
  const navigate = useNavigate();

  const logout = () => {
    resetStore();
    Encriptaciones.clearSession();
    clearCookies();
    cleanCacheApi();
    navigate('/login', { replace: true });
  };
  return (
    <Fragment>
      <li className='nav-item dropdown no-caret dropdown-user me-3 me-lg-4'>
        <NavLink
          className={'btn btn-icon btn-transparent-dark dropdown-toggle'}
          id='navbarDropdownUserImage'
          to="'javascript:void(0);'"
          role='button'
          data-bs-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          <img
            className='img-fluid'
            src={
              process.env.PUBLIC_URL +
              '/assets/img/illustrations/profiles/profile-1.png'
            }
            alt='profile-1'
          />
        </NavLink>
        <div
          className='dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up'
          aria-labelledby='navbarDropdownUserImage'
        >
          <h6 className='dropdown-header d-flex align-items-center'>
            <img
              className='dropdown-user-img'
              src={
                process.env.PUBLIC_URL +
                '/assets/img/illustrations/profiles/profile-1.png'
              }
              alt='profile-1'
            />
            <div className='dropdown-user-details'>
              <div className='dropdown-user-details-name'>
                {Encriptaciones.getSession('dataUser').username}
              </div>
              <div className='dropdown-user-details-email'>
                {Encriptaciones.getSession('dataUser').nombre}
              </div>
            </div>
          </h6>
          <div className='dropdown-divider' />
          <Link className='dropdown-item' to='/perfil'>
            <div className='dropdown-item-icon'>
              <i data-feather='settings' />
            </div>
            Cuenta
          </Link>
          <button className='dropdown-item' onClick={logout}>
            <div className='dropdown-item-icon'>
              <i data-feather='log-out'></i>
            </div>
            Cerrar Sesión
          </button>
        </div>
      </li>
    </Fragment>
  );
}
