/** @format */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Modal, Stack } from 'react-bootstrap';
import DynamicGrid from '../ui/DinamicGrid';
import { FOLDERS, TIPOS_ALCOLISMO } from '../../constants/dynamicGrids';
import AlcoholWithdrawalSymptoms from './SintomasAlcolismo';
import { AlcolismoForm } from './AlcolismoForm';
import { useSelector } from 'react-redux';

export const TipoAlcolismo = ({ toggleForm }) => {
  const {
    noPatologicos: { alcoholismo },
  } = useSelector((state) => state.antecedente);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  return (
    <>
      <Container>
        <Stack>
          <DynamicGrid
            folder={FOLDERS.DRINKS}
            items={TIPOS_ALCOLISMO}
            onChange={(item) => {
              toggleForm(item);
            }}
            itemCheked={alcoholismo?.alcholismItemActive}
            handleSetScrollPosition={setScrollPosition}
          />
          {alcoholismo?.isAlcholism && (
            <AlcolismoForm handleShowModal={handleShowModal} />
          )}
        </Stack>
      </Container>
      <Modal show={showModal} backdrop animation centered scrollable>
        <Modal.Header>
          <Modal.Title>Signos de Dependencia Alcohólica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AlcoholWithdrawalSymptoms />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={handleCloseModal}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
TipoAlcolismo.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
