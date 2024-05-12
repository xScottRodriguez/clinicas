/** @format */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
export default function NavBar() {
  return (
    <React.Fragment>
      <nav
        className=' navbar navbar-expand shadow-none   justify-content-between justify-content-sm-start navbar-light bg-white'
        id='sidenavAccordion'
      >
        {/* Sidenav Toggle Button*/}
        {/* Navbar Brand*/}
        {/* * * Tip * * You can use text or an image for your navbar brand.*/}
        {/* * * * * * * When using an image, we recommend the SVG format.*/}
        {/* * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px*/}
        <Link className='navbar-brand pe-3 ps-4 ps-lg-2' to='/'>
          Clinica
        </Link>
        <button
          className='btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0'
          id='sidebarToggle'
        >
          <HiOutlineMenuAlt1 size={32} />
        </button>

        {/* Navbar Items*/}
        <ul className='navbar-nav align-items-center ms-auto'>
          {/* * * Note: * * Visible only below the lg breakpoint*/}
          <li className='nav-item dropdown no-caret me-3 d-lg-none'>
            <NavLink
              className={'btn btn-icon btn-transparent-dark dropdown-toggle'}
              id='searchDropdown'
              to='#'
              role='button'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i data-feather='search' />
            </NavLink>
            {/* Dropdown - Search*/}
            <div
              className='dropdown-menu dropdown-menu-end p-3 shadow-none animated--fade-in-up'
              aria-labelledby='searchDropdown'
            >
              <form className='form-inline me-auto w-100'>
                <div className='input-group input-group-joined input-group-solid'>
                  <input
                    className='form-control pe-0'
                    type='text'
                    placeholder='Search for...'
                    aria-label='Search'
                    aria-describedby='basic-addon2'
                  />
                  <div className='input-group-text'>
                    <i data-feather='search' />
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Alerts Dropdown*/}
          <li className='nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications'>
            <NavLink
              className={'btn btn-icon btn-transparent-dark dropdown-toggle'}
              id='navbarDropdownAlerts'
              to="'javascript:void(0);'"
              role='button'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i data-feather='bell' />
            </NavLink>
            <div
              className='dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up'
              aria-labelledby='navbarDropdownAlerts'
            >
              <h6 className='dropdown-header dropdown-notifications-header'>
                <i className='me-2' data-feather='bell' />
                Centro de alertas
              </h6>
              {/* Example Alert 1*/}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <div className='dropdown-notifications-item-icon bg-warning'>
                  <i data-feather='activity' />
                </div>
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-details'>
                    December 29, 2021
                  </div>
                  <div className='dropdown-notifications-item-content-text'>
                    This is an alert message. It's nothing serious, but it requires
                    your attention.
                  </div>
                </div>
              </Link>
              {/* Example Alert 2*/}
              <Link className='dropdown-item dropdown-notifications-item' to=''>
                <div className='dropdown-notifications-item-icon bg-info'>
                  <i data-feather='bar-chart' />
                </div>
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-details'>
                    December 22, 2021
                  </div>
                  <div className='dropdown-notifications-item-content-text'>
                    A new monthly report is ready. Click here to view!
                  </div>
                </div>
              </Link>
              {/* Example Alert 3*/}
              <Link className='dropdown-item dropdown-notifications-item' to=''>
                <div className='dropdown-notifications-item-icon bg-danger'>
                  <i className='fas fa-exclamation-triangle' />
                </div>
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-details'>
                    December 8, 2021
                  </div>
                  <div className='dropdown-notifications-item-content-text'>
                    Critical system failure, systems shutting down.
                  </div>
                </div>
              </Link>
              {/* Example Alert 4*/}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <div className='dropdown-notifications-item-icon bg-success'>
                  <i data-feather='user-plus' />
                </div>
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-details'>
                    December 2, 2021
                  </div>
                  <div className='dropdown-notifications-item-content-text'>
                    New user request. Woody has requested access to the
                    organization.
                  </div>
                </div>
              </Link>
              <Link className='dropdown-item dropdown-notifications-footer' to='#!'>
                View All Alerts
              </Link>
            </div>
          </li>
          {/* Messages Dropdown*/}
          <li className='nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications'>
            <NavLink
              className={'btn btn-icon btn-transparent-dark dropdown-toggle'}
              id='navbarDropdownMessages'
              to="'javascript:void(0);'"
              role='button'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i data-feather='mail' />
            </NavLink>
            <div
              className='dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up'
              aria-labelledby='navbarDropdownMessages'
            >
              <h6 className='dropdown-header dropdown-notifications-header'>
                <i className='me-2' data-feather='mail' />
                Message Center
              </h6>
              {/* Example Message 1  */}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <img
                  className='dropdown-notifications-item-img'
                  // src={}
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/illustrations/profiles/profile-2.png '
                  }
                  alt='profile-2'
                />
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                  <div className='dropdown-notifications-item-content-details'>
                    Thomas Wilcox · 58m
                  </div>
                </div>
              </Link>
              {/* Example Message 2*/}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <img
                  className='dropdown-notifications-item-img'
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/illustrations/profiles/profile-3.png'
                  }
                  alt='profile-3'
                />
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                  <div className='dropdown-notifications-item-content-details'>
                    Emily Fowler · 2d
                  </div>
                </div>
              </Link>
              {/* Example Message 3*/}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <img
                  className='dropdown-notifications-item-img'
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/illustrations/profiles/profile-4.png'
                  }
                  alt='profile-4'
                />
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                  <div className='dropdown-notifications-item-content-details'>
                    Marshall Rosencrantz · 3d
                  </div>
                </div>
              </Link>
              {/* Example Message 4*/}
              <Link className='dropdown-item dropdown-notifications-item' to='#!'>
                <img
                  className='dropdown-notifications-item-img'
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/illustrations/profiles/profile-5.png'
                  }
                  alt='profile-5'
                />
                <div className='dropdown-notifications-item-content'>
                  <div className='dropdown-notifications-item-content-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                  <div className='dropdown-notifications-item-content-details'>
                    Colby Newton · 3d
                  </div>
                </div>
              </Link>
              {/* Footer Link*/}
              <Link className='dropdown-item dropdown-notifications-footer' to='#!'>
                Read All Messages
              </Link>
            </div>
          </li>
          {/* User Dropdown*/}
          <UserNavBar />
        </ul>
      </nav>
    </React.Fragment>
  );
}
