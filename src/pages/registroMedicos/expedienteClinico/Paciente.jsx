/** @format */

import { FiChevronLeft } from 'react-icons/fi';
import React from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import HeaderExpediente from './HeaderExpediente';
import FormAlergias from '../antecedentes/alergias/FormAlergias';
import FormIncapacidad from '../incapacidad/FormIncapacidad';
import { Link } from 'react-router-dom';
import FormPrincipalExterior from '../exporacionFisica/FormPrincipalExterior';
import FormPrincipalInterrogatorio from '../interrogatorio/FormPrincipalInterrogatorio';
import { useSelector } from 'react-redux';
import {
  useGetFisicalExplorationForFileQuery,
  useGetFolderByIdQuery,
} from '../../../services/rtk-query';
import { useResetStore } from '../../../hooks/useResetStore';
import { PatientProfile } from './components/PatientProfile';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ListadoConsultas from '../../consultas/ListadoConsultas';

import { Profile } from '../../../components/registroMedicos/expedienteClinico/Profile';
export default function Paciente() {
  const { id = null, consultaId } = useParams();

  useGetFisicalExplorationForFileQuery(consultaId);
  useGetFolderByIdQuery(id);

  const resetStore = useResetStore();
  const { tabsExpediente } = useSelector((state) => state.ui);

  return (
    <LayoutForm
      title='Nuevo Expediente Clínico'
      tools={
        <Link
          className='btn btn-sm btn-light text-primary'
          to={'/expedientes-medicos'}
          onClick={resetStore}
        >
          <FiChevronLeft />
          Volver a la lista de pacientes
        </Link>
      }
    >
      <Profile />
      <Card className=' shadow-none'>
        <div className='card-body'>
          <div className='card-subtitle '>
            <HeaderExpediente />
          </div>
          <hr />
          <div className='tab-content ' id='pills-tabContent'>
            <div
              className='tab-pane-fade show-active '
              id='pills-1'
              role='tabpanel'
              aria-labelledby='pills-1-tab'
            >
              {tabsExpediente.paciente ? (
                <PatientProfile />
              ) : tabsExpediente.antecedentes ? (
                <FormAlergias />
              ) : tabsExpediente.incapacidad ? (
                <FormIncapacidad />
              ) : tabsExpediente.exploracionFisica ? (
                <FormPrincipalExterior />
              ) : tabsExpediente.interrogatorio ? (
                <FormPrincipalInterrogatorio />
              ) : (
                tabsExpediente.consulta && <ListadoConsultas />
              )}
            </div>
          </div>
        </div>
      </Card>
    </LayoutForm>
  );
}
