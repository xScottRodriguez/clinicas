/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcularEdad } from '../../../../helpers/calcularEdad';
import { setFrecuenciaRespiratoria } from '../../../../store/slices/exploracionFisica';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';

export default function FormRespiratoria() {
  const { id = null, consultaId } = useParams();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, data } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const { activePatient } = useSelector((state) => state.informacionBasicaPaciente);
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);
  const [breathingFrequency, setBreathingFrequency] = useState(
    signosVitales?.frecuenciaRespiratoria ?? 15
  );
  const [age, setAge] = useState(0);
  const [ageTitle, setAgeTitle] = useState('');
  const [ageAlert, setAgeAlert] = useState('Normal');
  const [ageClass, setAgeClass] = useState('alert-success');

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      const {
        signosVitales: { frecuenciaRespiratoria },
      } = info;
      dispatch(setFrecuenciaRespiratoria(frecuenciaRespiratoria));
      setBreathingFrequency(frecuenciaRespiratoria);
    }
  }, [data, isFetching, isSuccess]);

  useEffect(() => {
    if (!isLoaded && activePatient?.fechaNacimiento) {
      const edad = calcularEdad(activePatient?.fechaNacimiento);
      setAge(edad);
      setIsLoaded(true);
    }
  }, [isLoaded, activePatient?.fechaNacimiento]);

  const handleChangesRespiracion = (e) => {
    const value = parseFloat(e.target.value);
    setBreathingFrequency(value);

    if (age === 0) {
      setAgeTitle('Lactante');
      if (value < 40) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }
      if (value > 45) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age === 1) {
      setAgeTitle('Infante');

      if (value < 20) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }
      if (value > 30) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age > 1 && age <= 2) {
      setAgeTitle('Infante Mayor');

      if (value < 20) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }
      if (value > 30) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age > 2 && age <= 6) {
      setAgeTitle('Pre-escolar');
      if (value < 20) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }
      if (value >= 20 && value <= 30) {
        setAgeAlert('Normal');
        setAgeClass('alert-success');
      }
      if (value > 30) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age > 6 && age <= 13) {
      setAgeTitle('Escolar');

      if (value < 12) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }

      if (value > 20) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age > 13 && age <= 16) {
      setAgeTitle('Adolescencia');
      if (value < 12) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }

      if (value > 20) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
    if (age > 16) {
      setAgeTitle('Adulto');

      if (value < 12) {
        setAgeAlert('Bradipnea');
        setAgeClass('alert-warning');
      }
      if (value >= 12 && value <= 20) {
        setAgeAlert('Normal');
        setAgeClass('alert-success');
      }
      if (value > 20) {
        setAgeAlert('Taquipnea');
        setAgeClass('alert-danger');
      }
    }
  };

  useEffect(() => {
    handleChangesRespiracion({ target: { value: breathingFrequency } });
  }, [age, breathingFrequency]);

  return (
    <div className='row mb-5'>
      <div className='mb-3 col-12 col-sm-12'>
        <h4 className='lh-base mb-3'>
          <i className='fas fa-lungs me-2'></i> Frecuencia Respiratoria (FR):
          <p className='text-muted fw-normal small mb-0'>
            La frecuencia respiratoria es el número de respiraciones que realiza un
            ser vivo en un periodo específico.
          </p>
        </h4>

        <div className='row'>
          <div className='col-12'>
            <label htmlFor='breathing-frequency' className='form-label'>
              Frecuencia Respiratoria (
              <span id='breathing-frequency-title'>{breathingFrequency}</span>):
            </label>
            <input
              type='range'
              min='5'
              max='60'
              value={breathingFrequency}
              onChange={(e) => {
                setTimeout(() => {
                  dispatch(setFrecuenciaRespiratoria(parseFloat(e.target.value)));
                }, 300);
                setBreathingFrequency(parseFloat(e.target.value));
              }}
              className='form-range'
              id='breathing-frequency'
            />
          </div>
        </div>

        <div className='row mt-3' id='breathing-frequency-container'>
          <div className='col-12'>
            <div className='d-flex align-items-center'>
              <img
                src={'/assets/img/vital-signs/lungs.svg'}
                width='45px'
                alt='lungs'
              />
              <div className='ms-2'>
                <p className='fw-bold mb-1'>Respiraciones por Minuto:</p>
                <h1 id='breathing-frequency-total' className='fs-1 mb-0'>
                  {breathingFrequency}
                </h1>
              </div>
            </div>
          </div>
          <div className='col-12'>
            <div
              id='breathing-frequency-alert'
              role='alert'
              className={`alert mt-2 ${ageClass}`}
            >
              <b>{ageTitle}:</b> {ageAlert}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
