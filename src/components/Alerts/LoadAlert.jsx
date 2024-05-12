import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const LoadAlert = ({ headerTitle = 'Clinica', children }) => {
  const { toastLoader } = useSelector((state) => state.ui);
  return (
    <ToastContainer
      className='p-3'
      position={'middle-center'}
      style={{ zIndex: 1 }}
    >
      <Toast show={toastLoader}>
        <Toast.Header closeButton={false}>
          <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
          <strong className='me-auto'>Clinica</strong>
        </Toast.Header>
        <Toast.Body className='d-flex justify-content-center'>
          {children}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
