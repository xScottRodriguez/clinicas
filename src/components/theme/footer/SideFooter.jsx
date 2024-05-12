import React, { Fragment } from 'react';
import Encriptaciones from '../../../services/Encriptaciones';
export default function SideFooter() {
  return (
    <Fragment>
      <div className='sidenav-footer'>
        <div className='sidenav-footer-content'>
          <div className='sidenav-footer-subtitle'>Usuario:</div>
          <div className='sidenav-footer-title'>
            {Encriptaciones.getSession('dataUser').nombre}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
