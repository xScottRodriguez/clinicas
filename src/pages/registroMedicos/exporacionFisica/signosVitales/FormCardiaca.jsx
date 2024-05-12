/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFrecuenciaCardiaca } from '../../../../store/slices/exploracionFisica';
import { calcularEdad } from '../../../../helpers/calcularEdad';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';
export default function FormCardiaca() {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const dispatch = useDispatch();
  const { activePatient } = useSelector((state) => state.informacionBasicaPaciente);
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedPatient, setIsLoadedPatient] = useState(false);

  const [heartRate, setHeartRate] = useState(61);
  const [age, setAge] = useState(20);
  const [ageTitle, setAgeTitle] = useState('Adulto');
  const [ageAlert, setAgeAlert] = useState('Normal');
  const [ageClass, setAgeClass] = useState('alert-success');
  const [beatRate, setBeatRate] = useState(1000);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      const {
        signosVitales: { frecuenciaCardiaca },
      } = info;
      dispatch(setFrecuenciaCardiaca(frecuenciaCardiaca));
      setHeartRate(frecuenciaCardiaca);
    }
  }, [data, isFetching, isSuccess]);

  useEffect(() => {
    if (!isLoadedPatient && activePatient?.fechaNacimiento) {
      const edad = calcularEdad(activePatient?.fechaNacimiento);
      setAge(edad);
      setIsLoadedPatient(true);
    }
  }, [isLoadedPatient, activePatient?.fechaNacimiento]);

  useEffect(() => {
    calculateHeartRate();
  }, [heartRate, age]);

  const calculateHeartRate = () => {
    const lpm = parseFloat(heartRate);
    if (age === 0) {
      setAgeTitle('Lactante');

      if (lpm <= 120) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 140) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age === 1) {
      setAgeTitle('Infante');

      if (lpm <= 100) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 130) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age > 1 && age <= 2) {
      setAgeTitle('Infante Mayor');

      if (lpm <= 100) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 120) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age > 2 && age <= 6) {
      setAgeTitle('Pre-escolar');

      if (lpm <= 80) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 120) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age > 6 && age <= 13) {
      setAgeTitle('Escolar');

      if (lpm <= 80) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 100) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age > 13 && age <= 16) {
      setAgeTitle('Adolescencia');

      if (lpm <= 70) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm >= 100) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
    if (age > 16) {
      setAgeTitle('Adulto');

      if (lpm <= 60) {
        setAgeAlert('Bradicardia');
        setAgeClass('alert-warning');
      }
      if (lpm > 60 && lpm <= 99) {
        setAgeAlert('Normal');
        setAgeClass('alert-success');
      }
      if (lpm >= 100) {
        setAgeAlert('Taquicardia');
        setAgeClass('alert-danger');
      }
    }
  };

  const handleHeartRateChange = (e) => {
    setHeartRate(e.target.value);
    setTimeout(() => {
      dispatch(setFrecuenciaCardiaca(e.target.value));
    }, 300);
  };

  useEffect(() => {
    if (!isLoaded && signosVitales?.frecuenciaCardiaca) {
      setHeartRate(signosVitales?.frecuenciaCardiaca);
      setIsLoaded(true);
    }
  }, [isLoaded, signosVitales?.frecuenciaCardiaca]);

  return (
    <div className='row mb-5'>
      <div className='mb-3 col-12 col-sm-12'>
        <h4 className='lh-base mb-3'>
          <i className='fas fa-heartbeat me-2'></i> Frecuencia Cardiaca (FC):
          <p className='text-muted fw-normal small mb-0'>
            La frecuencia cardíaca mide la cantidad de veces que el corazón late por
            minuto.
          </p>
        </h4>

        <div className='row'>
          <div className='col-12'>
            <label htmlFor='heart-rate' className='form-label'>
              Frecuencia Cardiaca: <strong>{heartRate} lmp</strong>
            </label>
            <input
              type='range'
              min='40'
              max='200'
              className='form-range'
              id='heart-rate'
              value={heartRate}
              onChange={handleHeartRateChange}
            />
          </div>
        </div>

        <div className='row mt-3' id='heart-rate-container'>
          <div className='col-12'>
            <div className='d-flex align-items-center'>
              <img
                className='pulsate-animation'
                id='pulsate-heart'
                src={'/assets/img/vital-signs/heart.svg'}
                width='45px'
                alt='heart'
              />
              <div className='ms-2'>
                <p className='fw-bold mb-1'>Latido Por Minuto:</p>
                <h1 className='fs-1 mb-0'>{heartRate} lmp</h1>
              </div>
            </div>
          </div>
          <div className='col-12'>
            <div
              id='heart-rate-alert'
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
