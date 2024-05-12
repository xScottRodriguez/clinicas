/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDiastolica,
  setSistolica,
} from '../../../../store/slices/exploracionFisica';
import { clinicalApi } from '../../../../services/rtk-query';
import { useParams } from 'react-router-dom';
export default function FormPresion() {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);

  const dispatch = useDispatch();
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);

  const [systolic, setSystolic] = useState();
  const [diastolic, setDiastolic] = useState();
  const [media, setMedia] = useState(0);
  const [systolicAlert, setSystolicAlert] = useState('Presión Arterial Normal');
  const [systolicClass, setSystolicClass] = useState('alert-success');
  const [diastolicAlert, setDiastolicAlert] = useState('Presión Arterial Normal');
  const [diastolicClass, setDiastolicClass] = useState('alert-success');

  useEffect(() => {
    if (!isLoaded && signosVitales?.precionAlterial) {
      setSystolic(signosVitales?.precionAlterial?.sistolica);
      setDiastolic(signosVitales?.precionAlterial?.diastolica);
      setIsLoaded(true);
    }
  }, [isLoaded, signosVitales?.precionAlterial]);
  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      dispatch(setSistolica(info?.signosVitales?.presionArterialSitolica));
      dispatch(setDiastolica(info?.signosVitales?.presionArterialDiastolica));
      setSystolic(info?.signosVitales?.presionArterialSitolica);
      setDiastolic(info?.signosVitales?.presionArterialDiastolica);
    }
  }, [data, dispatch, isFetching, isSuccess]);

  const calculateBloodPressure = () => {
    let parsedDiastolic = parseFloat(diastolic);
    let parsedSystolic = parseFloat(systolic);
    let calculatedMedia = ((2 * parsedDiastolic + parsedSystolic) / 3).toFixed(2);

    setMedia(calculatedMedia);

    if (parsedSystolic > 120 && parsedSystolic <= 129) {
      setSystolicClass('alert-warning');
      setSystolicAlert('Presión Arterial Elevada');
    } else if (parsedSystolic >= 130 && parsedSystolic <= 139) {
      setSystolicClass('alert-warning');
      setSystolicAlert('Presión Arterial Alta (Hipertensión Nivel 1)');
    } else if (parsedSystolic >= 140 && parsedSystolic <= 180) {
      setSystolicClass('alert-danger');
      setSystolicAlert('Presión Arterial Alta (Hipertensión Nivel 2)');
    } else if (parsedSystolic > 180) {
      setSystolicClass('alert-danger');
      setSystolicAlert('Crisis de Hipertensión (ALERTA MEDICA)');
    } else {
      setSystolicClass('alert-success');
      setSystolicAlert('Presión Arterial Normal');
    }

    if (parsedDiastolic < 80 && parsedSystolic > 120 && parsedSystolic <= 129) {
      setDiastolicClass('alert-warning');
      setDiastolicAlert('Presión Arterial Elevada');
    } else if (parsedDiastolic > 80 && parsedDiastolic <= 89) {
      setDiastolicClass('alert-warning');
      setDiastolicAlert('Presión Arterial Alta (Hipertensión Nivel 1)');
    } else if (parsedDiastolic >= 90 && parsedDiastolic <= 120) {
      setDiastolicClass('alert-danger');
      setDiastolicAlert('Presión Arterial Alta (Hipertensión Nivel 2)');
    } else if (parsedDiastolic > 120) {
      setDiastolicClass('alert-danger');
      setDiastolicAlert('Crisis de Hipertensión (ALERTA MEDICA)');
    } else {
      setDiastolicClass('alert-success');
      setDiastolicAlert('Presión Arterial Normal');
    }
  };
  useEffect(() => {
    calculateBloodPressure();
  }, [systolic, diastolic]);

  // useEffect(() => {
  //   dispatch(setDiastolica(diastolic));
  //   dispatch(setSistolica(systolic));
  // }, [diastolic, dispatch, systolic]);

  return (
    <div className='row mb-5'>
      <div className='col-12 col-sm-12'>
        <h4 className='lh-base mb-3'>
          <i className='fas fa-stopwatch me-2'></i> Presión Arterial (PA)
          <p className='text-muted fw-normal small mb-0'>
            La presión arterial es la fuerza que la sangre ejerce contra las paredes
            arteriales.
          </p>
        </h4>
        <div className='row'>
          <div className='col-12'>
            <label htmlFor='systolic' className='form-label'>
              Presión Arterial Sistólica:{' '}
              <strong id='systolic-title'>{systolic} mmHg</strong>
            </label>
            <input
              type='range'
              min='100'
              max='250'
              className='form-range'
              name='mmHg'
              id='systolic'
              value={systolic}
              onChange={(e) => {
                setSystolic(e.target.value);
                dispatch(setSistolica(e.target.value));
              }}
            />
          </div>
          <div className='col-12'>
            <label htmlFor='diastolic' className='form-label'>
              Presión Arterial Diastólica:
              <strong id='diastolic-title'> {diastolic} mmHg</strong>
            </label>
            <input
              type='range'
              min='50'
              max='200'
              className='form-range'
              id='diastolic'
              value={diastolic}
              onChange={(e) => {
                setDiastolic(e.target.value);
                dispatch(setDiastolica(e.target.value));
              }}
            />
          </div>
          <div className='row mt-3' id='blood-pressure-container'>
            <div className='col-12'>
              <div className='d-flex align-items-center'>
                <img
                  src={'/assets/img/vital-signs/blood-pressure.svg'}
                  width='45px'
                  alt='heart'
                />
                <div className='ms-2'>
                  <p className='fw-bold mb-1'>Presión Arterial Media:</p>
                  <h1 id='blood-pressure' className='fs-1 mb-0'>
                    {media} mmHg
                  </h1>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <div
                id='blood-pressure-systolic-alert'
                role='alert'
                className={`alert mt-2 ${systolicClass}`}
              >
                <b>Sistólica:</b> {systolicAlert}
              </div>
              <div
                id='blood-pressure-diastolic-alert'
                role='alert'
                className={`alert mt-2 ${diastolicClass}`}
              >
                <b>Diastólica:</b> {diastolicAlert}
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
}
