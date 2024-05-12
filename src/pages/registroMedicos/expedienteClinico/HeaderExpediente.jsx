/** @format */

import React, { Fragment } from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAntecedentesTab,
  setConsultaTab,
  setIncapacidadTab,
  setPacienteTab,
} from '../../../store/slices/uiSlice';
import { FaRegUser } from 'react-icons/fa6';
import { VscHistory } from 'react-icons/vsc';
import { PiSyringeLight } from 'react-icons/pi';
import { MdTravelExplore } from 'react-icons/md';
export default function HeaderExpediente() {
  const { informacionBasicaPaciente, ui } = useSelector((state) => state);
  const { tabsExpediente } = ui;
  const dispatch = useDispatch();

  const { isDisableTabs } = informacionBasicaPaciente;

  const handleConsulta = () => {
    if (!isDisableTabs) {
      dispatch(setConsultaTab());
    }
  };
  return (
    <Fragment>
      <Nav variant='pills'>
        <Nav.Item onClick={() => !isDisableTabs && dispatch(setPacienteTab())}>
          <Nav.Link href='#paciente' active={tabsExpediente.paciente}>
            <FaRegUser /> Paciente
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => !isDisableTabs && dispatch(setAntecedentesTab())}>
          <Nav.Link
            href='#antecedentes'
            disabled={isDisableTabs}
            active={tabsExpediente.antecedentes}
          >
            <VscHistory /> Antecedentes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => !isDisableTabs && dispatch(setIncapacidadTab())}>
          <Nav.Link
            href='#incapacidad'
            disabled={isDisableTabs}
            active={tabsExpediente.incapacidad}
          >
            <PiSyringeLight /> Incapacidad
          </Nav.Link>
        </Nav.Item>

        <Nav.Item onClick={handleConsulta}>
          <Nav.Link
            href='#consultas'
            disabled={isDisableTabs}
            active={tabsExpediente.consulta}
          >
            <MdTravelExplore />
            Consulta
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Fragment>
  );
}
