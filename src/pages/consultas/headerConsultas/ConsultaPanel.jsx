/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import HeaderConsulta from './HeaderConsulta';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import { Link, useParams } from 'react-router-dom';
import FormPrincipalInterrogatorio from '../../registroMedicos/interrogatorio/FormPrincipalInterrogatorio';
import FormPrincipalExterior from '../../registroMedicos/exporacionFisica/FormPrincipalExterior';
import ListEnfermedades from '../enfermedades/ListEnfermedades';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetFisicalExplorationForFileQuery,
  useGetInterrogationForFileQuery,
} from '../../../services/rtk-query';
import { setPacienteTab } from '../../../store/slices/uiSlice';
import { PreEscripcion } from '../../persona/components/PreEscripcion';
import { Profile } from '../../../components/registroMedicos/expedienteClinico/Profile';
import { useResetStore } from '../../../hooks/useResetStore';
import { FaArrowLeft } from 'react-icons/fa6';
export default function ConsultaPanel() {
  const resetStore = useResetStore();
  const { id = null, consultaId = null } = useParams();
  useGetFisicalExplorationForFileQuery(consultaId);
  useGetInterrogationForFileQuery(id);
  const dispatch = useDispatch();
  const {
    tabsExpediente: {
      interrogatorio,
      exploracionFisica,
      enfermedadesCIE,
      prescripciones,
    },
  } = useSelector((state) => state.ui);

  return (
    <Fragment>
      <LayoutForm
        title='Nuevo Consulta'
        tools={
          <Link
            className='btn btn-sm btn-light text-primary'
            to={`/expedientes-medicos/${id}`}
            onClick={() => {
              dispatch(setPacienteTab());
              resetStore();
            }}
          >
            <FaArrowLeft />
            Volver a expediente clinico
          </Link>
        }
      >
        <Profile />
        <div className='card mb-4 shadow-sm'>
          <form id='medical-records-form'>
            <div className='card-header'>
              <HeaderConsulta />
            </div>

            <div className='card-body'>
              <div className='tab-content' id='pills-tabContent'>
                <div
                  className='tab-pane-fade show-active'
                  id='pills-1'
                  role='tabpanel'
                  aria-labelledby='pills-1-tab'
                >
                  {interrogatorio ? (
                    <FormPrincipalInterrogatorio />
                  ) : exploracionFisica ? (
                    <FormPrincipalExterior />
                  ) : enfermedadesCIE ? (
                    <ListEnfermedades />
                  ) : (
                    prescripciones && <PreEscripcion />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
