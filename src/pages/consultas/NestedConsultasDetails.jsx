import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearInfo, toggleModal } from '../../store/slices/uiSlice';

export const NestedConsultasDetails = ({
  children,
  title,
  ButtonComponent,
  resetFunction = () => {},
}) => {
  const { detallesConsulta } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const onTwitchModal = () => {
    dispatch(toggleModal());
    dispatch(clearInfo());
    resetFunction();
  };
  return (
    <Modal
      show={detallesConsulta}
      onHide={onTwitchModal}
      fullscreen
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <ButtonComponent />
        <Button variant='outline-secondary' onClick={onTwitchModal} size='lg'>
          cerrar Modal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
