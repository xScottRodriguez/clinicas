/** @format */

import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const Antecedentes = (props) => {
  return (
    <div id='hereditary-disease-table' className='text-center'>
      <div className='tree d-block w-100'>
        <ul style={{ height: '325px' }}>
          <li>
            <Link className='position-relative' to='#'>
              <img
                className='avatar-lg fit-cover rounded-circle'
                alt='patient'
                id='herediraty-tree-img'
                src={
                  process.env.PUBLIC_URL +
                  '/assets/img/illustrations/profiles/profile-5.png'
                }
              />
              <span id='herediraty-tree-patient'>Paciente</span>
            </Link>
            <ul>
              <li>
                <Link
                  className='position-relative hereditary-desease-notification'
                  data-hereditary='grandparents'
                  to='#'
                >
                  <i className='fas fa-user me-2'></i> Abuelos
                  {props.abuelos > 0 && (
                    <span
                      id='hereditary-notification-grandparents'
                      className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                    >
                      <span className='count'>{props.abuelos}</span>
                    </span>
                  )}
                </Link>
                <ul>
                  <li>
                    <Link
                      className='position-relative hereditary-desease-notification'
                      data-hereditary='parents'
                      to='#'
                    >
                      <i className='fas fa-user me-2'></i> Padres
                      {props.cont > 0 && (
                        <span
                          id='hereditary-notification-parents'
                          //  style={{ display: "none" }}
                          className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                        >
                          <span className='count'>{props.cont}</span>
                        </span>
                      )}
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className='position-relative hereditary-desease-notification'
                          data-hereditary='siblings'
                          to='#'
                        >
                          <i className='fas fa-user me-2'></i> Hermanos
                          {props.hermanos > 0 && (
                            <span
                              id='hereditary-notification-siblings'
                              className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                            >
                              <span className='count'>{props.hermanos}</span>
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className='position-relative hereditary-desease-notification'
                      data-hereditary='uncles'
                      to='#'
                    >
                      <i className='fas fa-user me-2'></i> Tíos
                      {props.tios > 0 && (
                        <span
                          id='hereditary-notification-uncles'
                          className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                        >
                          <span className='count'>{props.tios}</span>
                        </span>
                      )}
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className='position-relative hereditary-desease-notification'
                          data-hereditary='cousins'
                          to='#'
                        >
                          <i className='fas fa-user me-2'></i> Primos
                          {props.prim > 0 && (
                            <span
                              id='hereditary-notification-grandparents'
                              className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                            >
                              <span className='count'>{props.prim}</span>
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Antecedentes;
