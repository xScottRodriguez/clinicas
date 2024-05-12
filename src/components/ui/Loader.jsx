/** @format */
import React from 'react';
import { Spinner, Stack } from 'react-bootstrap';

export const Loader = ({ title = 'Cargando... ' }) => {
  return (
    <div className='my-3 d-flex flex-column align-items-center'>
      <p>{title}</p>
      <Spinner animation='grow' className='bg-primary' />
    </div>
  );
};
