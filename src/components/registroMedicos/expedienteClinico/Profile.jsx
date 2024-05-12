/** @format */

import React from 'react';
import { Card, Image, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LuAlertOctagon } from 'react-icons/lu';
import styles from './../styles.module.css';
// import defaultUser from "../../../../public/assets/img/default_user.jpg";
export const Profile = () => {
  const { activePatient } = useSelector((state) => state.informacionBasicaPaciente);

  if (activePatient?.activo) {
    return (
      <Alert variant='warning'>
        <p style={{ fontSize: 20 }}>
          {' '}
          <LuAlertOctagon size={30} /> El paciente ya posee un expediente activo.
        </p>
      </Alert>
    );
  }

  if (!activePatient) return null;
  return (
    <Card
      className=' mx-auto shadow-none rounded d-flex flex-md-row    my-3'
      // style={{ width: '29rem' }}
    >
      <Image
        className={` roundedCircle card-img-top flex-shrink-0 ${styles['imagen-responsive']}`}
        src={'/assets/img/default_user.jpg'}
        fluid
        style={{
          maxHeight: 150,
        }}
        alt='Imagen de usuario'
      />

      <Card.Body className='justify-content-flex-start flex-grow-1'>
        <Card.Title>{activePatient.nombre}</Card.Title>
        <Card.Text className='d-flex justify-content-start align-items-baseline'>
          <p className='mr-3'>Telefono: {activePatient?.telefono}</p>
          <p className='mx-3'>edad: {activePatient.edad}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
