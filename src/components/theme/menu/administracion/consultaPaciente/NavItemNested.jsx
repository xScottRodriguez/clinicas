import React from 'react';
import { Link } from 'react-router-dom';

export const NavItemNested = ({
  icon,
  name,
  path,
  permission,
  permissionRoute,
}) => {
  if (!permission.includes(permissionRoute[0])) return null;
  return (
    <nav className='sidenav-menu-nested nav'>
      <Link className='nav-link' to={path}>
        {name}
      </Link>
    </nav>
  );
};
