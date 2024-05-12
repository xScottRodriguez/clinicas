/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApgarScore,
  setTableApgar,
} from '../../../../store/slices/antecedentes';
import { Controller, useForm } from 'react-hook-form';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';
import { mapToLoadPerinatales } from './utils';

const TablaPuntuacionApgar = () => {
  const { id = null } = useParams();
  const { isSuccess, isLoading, data } =
    clinicalApi.endpoints.getPregnancyHistory.useQueryState(id);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);
  const { control, setValue, watch } = useForm({
    defaultValues: {
      apgarHeartRate: 0,
      apgarLungMaturity: 0,
      apgarMuscleMovement: 0,
      apgarSkinColor: 0,
      apgarReflexes: 0,
    },
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      if (!data?.length) return;
      const [info] = data;
      const result = mapToLoadPerinatales(info);
      dispatch(setTableApgar(result.tableApgar));
      dispatch(setApgarScore(result.puntajeApgar));
    }
  }, [isSuccess, isLoading, dispatch]);

  useEffect(() => {
    if (
      !isLoaded &&
      perinatales?.puntajeApgar !== undefined &&
      perinatales?.tableApgar !== null
    ) {
      const parsedScore = parseInt(perinatales.puntajeApgar);
      setValue('apgarHeartRate', perinatales.tableApgar.apgarHeartRate);
      setValue('apgarLungMaturity', perinatales.tableApgar.apgarLungMaturity);
      setValue('apgarMuscleMovement', perinatales.tableApgar.apgarMuscleMovement);
      setValue('apgarSkinColor', perinatales.tableApgar.apgarSkinColor);
      setValue('apgarReflexes', perinatales.tableApgar.apgarReflexes);

      if (!isNaN(parsedScore)) {
        setRating(parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setApgarScore(rating));
    dispatch(setTableApgar(watch()));
  }, [dispatch, rating, watch]);

  const handleChange = (e) => {
    let ratings = 0;
    const apgarHeartRate = document.querySelector('#apgar-heart-rate').value;
    const apgarLungMaturity = document.querySelector('#apgar-lung-maturity').value;
    const apgarMuscleMovement = document.querySelector(
      '#apgar-muscle-movement'
    ).value;
    const apgarSkinColor = document.querySelector('#apgar-skin-color').value;
    const apgarReflexes = document.querySelector('#apgar-reflexes').value;
    ratings += parseInt(apgarHeartRate);
    ratings += parseInt(apgarLungMaturity);
    ratings += parseInt(apgarMuscleMovement);
    ratings += parseInt(apgarSkinColor);
    ratings += parseInt(apgarReflexes);

    setRating(ratings);
  };

  return (
    <Fragment>
      <div id='apgar-formula'>
        <div className='row mb-3'>
          <div className='col-12'>
            <div id='allergy-symptoms-list' className='list-group'>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/img/illustrations/apagar/1.svg'
                    }
                    width='45px'
                    alt='apgar-point'
                  />
                  Fortaleza y regularidad cardíaca
                </div>
                <Controller
                  name='apgarHeartRate'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onClick={handleChange}
                      onChange={onChange}
                      value={value}
                      id='apgar-heart-rate'
                      className='apgar-select form-select w-25'
                    >
                      <option value={0}>Ninguno</option>
                      <option value={1}>Menos de 100</option>
                      <option value={2}>100 latidos/minuto o más</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/img/illustrations/apagar/2.svg'
                    }
                    width='45px'
                    alt='apgar-point'
                  />
                  Madurez pulmonar
                </div>
                <Controller
                  name='apgarLungMaturity'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onClick={handleChange}
                      onChange={onChange}
                      value={value}
                      id='apgar-lung-maturity'
                      className='apgar-select form-select w-25'
                    >
                      <option value='0'>Ninguno</option>
                      <option value='1'>Irregular</option>
                      <option value='2'>Respiración regular</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/img/illustrations/apagar/3.svg'
                    }
                    width='45px'
                    alt='apgar-point'
                  />
                  Tono muscular y movimiento
                </div>
                <Controller
                  name='apgarMuscleMovement'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onClick={handleChange}
                      onChange={onChange}
                      value={value}
                      id='apgar-muscle-movement'
                      className='apgar-select form-select w-25'
                    >
                      <option value='0'>Relajado</option>
                      <option value='1'>Moderado</option>
                      <option value='2'>Activo</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/img/illustrations/apagar/4.svg'
                    }
                    width='45px'
                    alt='apgar-point'
                  />
                  Color/oxigenación de la piel
                </div>
                <Controller
                  name='apgarSkinColor'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onClick={handleChange}
                      onChange={onChange}
                      value={value}
                      id='apgar-skin-color'
                      className='apgar-select form-select w-25'
                    >
                      <option value='0'>Totalmente azul</option>
                      <option value='1'>Extremidades azuladas</option>
                      <option value='2'>Rosa</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/apagar/5.svg'}
                    width='45px'
                    alt='apgar-point'
                  />
                  Respuesta refleja a estímulos irritantes
                </div>
                <Controller
                  name='apgarReflexes'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onClick={handleChange}
                      onChange={onChange}
                      value={value}
                      id='apgar-reflexes'
                      className='apgar-select form-select w-25'
                    >
                      <option value='0'>Silencio</option>
                      <option value='1'>Quejidos</option>
                      <option value='2'>Llanto</option>
                    </select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <p className='fw-bold mb-1'>Interpretación del puntaje</p>
        <div className='d-flex align-items-center border border-2 rounded bg-light p-3'>
          <img
            className='me-5'
            src={'/assets/img/illustrations/apagar/6.svg'}
            width='65px'
            alt='apgar-rating'
          />
          <h1 id='apgar-rating-count' className='fs-1 mb-0'>
            {rating}
          </h1>
        </div>
        {rating > 0 && rating <= 3 ? (
          <div className='alert alert-danger mt-2' role='alert'>
            Severamente deprimido, probable asfixia severa o grave, considerar apnea
            secundaria
          </div>
        ) : rating >= 4 && rating <= 6 ? (
          <div className='alert alert-warning mt-2' role='alert'>
            Levemente deprimido, asfixia moderada, apnea primaria
          </div>
        ) : rating >= 7 ? (
          <div className='alert alert-success mt-2' role='alert'>
            Vigoroso, condición satisfactoria
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TablaPuntuacionApgar;
