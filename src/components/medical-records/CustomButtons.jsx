/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { BsSave2 } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/slices/antecedentes';
import { clearIncapacity } from '../../store/slices/incapacidad';
import { clearInterrogatorio } from '../../store/slices/interrogatorio';
import { clearExploracionFisica } from '../../store/slices/exploracionFisica';
import {
  clearActivePatient,
  clearActiveProfesion,
  clearActiveRelationShip,
  clearAllBasicInformation,
} from '../../store/slices/expedienteSlice';
import {
  clearAllTabs,
  setAntecedentesTab,
  setConsultaTab,
  setEnfermedadesCIETab,
  setExploracionFisicaTab,
  setIncapacidadTab,
  setInterrogatorioTab,
  setPacienteTab,
} from '../../store/slices/uiSlice';

const VIEWS_TO_REDIRECT = {
  setPacienteTab,
  setAntecedentesTab,
  setIncapacidadTab,
  setExploracionFisicaTab,
  setInterrogatorioTab,
  setEnfermedadesCIETab,
  setConsultaTab,
};

export const CustomButtons = ({
  route,
  action = 'Save',
  title = 'Guardar Expediente',
  handler,
}) => {
  const navigation = useNavigate();

  const { informacionBasicaPaciente } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClearStore = () => {
    navigation(route);
    dispatch(clearAllBasicInformation());
    dispatch(clearAllTabs());
    dispatch(clearIncapacity());
    dispatch(clearIncapacity());
    dispatch(clearInterrogatorio());
    dispatch(clearExploracionFisica());
    dispatch(clearActivePatient());
    dispatch(clearActiveProfesion());
    dispatch(clearActiveRelationShip());
    dispatch(clearAll());
  };
  const handleSaveOrUpdate = () => {
    if (handler) {
      return handler();
    }
    // if (action === 'Save') {
    //   const resp = validForm(informacionBasicaPaciente);
    //   if (typeof resp === 'string') {
    //     return toast.error(resp);
    //   }

    //   toast.success('Guardado');

    //   return;
    // }

    // return toast.success('Actualizado');
  };
  return (
    <div className='p-3 d-sm-grid d-md-flex gap-2'>
      <Button
        className='my-2'
        variant='primary'
        size='lg'
        onClick={handleSaveOrUpdate}
      >
        <BsSave2 /> <span>{title}</span>
      </Button>
      <Button
        className='my-2'
        onClick={handleClearStore}
        variant='outline-secondary'
        size='lg'
      >
        <AiOutlineClose /> Cancelar{' '}
      </Button>
    </div>
  );
};

CustomButtons.propTypes = {
  route: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
