import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearUri, setShowToastLoader } from '../../store/slices/uiSlice';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalBodyStyle = {
  height: '70vh', // El 70% de la altura de la ventana del navegador
  overflowY: 'auto', // Agregar desplazamiento vertical si el contenido es demasiado largo
};
export const ModalPreviewReport = () => {
  const { toastLoader, toastUri } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(setShowToastLoader());
    dispatch(clearUri());
  };
  return (
    <Modal
      size='lg'
      show={toastLoader}
      centered
      backdrop='static'
      keyboard={false}
      style={modalStyle}
    >
      <ModalBody style={modalBodyStyle}>
        <iframe
          title='pdf'
          src={toastUri}
          style={{ width: '100%', height: '100%' }}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant='outline-primary' onClick={handleHideModal}>
          Cerrar Visor
        </Button>
      </ModalFooter>
    </Modal>
  );
};
