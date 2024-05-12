import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';

export default function BtnModal(props) {
  return (
    <Fragment>
      <div className='d-grid gap-2 d-md-flex mt-h-auto justify-content-md-end'>
        <Button onClick={props.agregar} variant='primary' size='lg'>
          <IoCreateOutline size={30} /> {props.nombre}
        </Button>
      </div>
    </Fragment>
  );
}
