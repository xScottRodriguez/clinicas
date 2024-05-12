/** @format */

import React from 'react';
import SideFooter from '../footer/SideFooter';
import Menu from '../menu/menu';
export default function SideNav() {
  return (
    <React.Fragment>
      <nav className='sidenav shadow-right-md sidenav-light'>
        <div className='sidenav-menu'>
          <div className='nav accordion' id='accordionSidenav'>
            <Menu />
          </div>
        </div>
        <SideFooter />
      </nav>
    </React.Fragment>
  );
}
