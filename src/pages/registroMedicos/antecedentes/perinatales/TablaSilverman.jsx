/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSilvermanScore,
  setTableSilverman,
} from '../../../../store/slices/antecedentes';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { clinicalApi } from '../../../../services/rtk-query';
import { mapToLoadPerinatales } from './utils';
const TablaSilverman = () => {
  const { id = null } = useParams();
  const { isSuccess, data } =
    clinicalApi.endpoints.getPregnancyHistory.useQueryState(id);
  let [silverman, setSilverman] = useState(0);
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { control, setValue, watch } = useForm({
    defaultValues: {
      silvermanNasalDilatation: null,
      silvermanGrunt: null,
      silvermanLowerChestRetractions: null,
      silvermanXiphoidRetraction: null,
      silvermanUpperChestRetractions: null,
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (!data.length) return;
      const [info] = data;
      const payload = mapToLoadPerinatales(info);
      dispatch(setTableSilverman(payload));
      dispatch(setSilvermanScore(payload.puntajeSilverman));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (
      !isLoaded &&
      perinatales?.puntajeSilverman !== undefined &&
      perinatales.tableSilverman
    ) {
      const parsedScore = parseInt(perinatales.puntajeSilverman);
      setValue(
        'silvermanNasalDilatation',
        perinatales.tableSilverman.silvermanNasalDilatation
      );
      setValue('silvermanGrunt', perinatales.tableSilverman.silvermanGrunt);
      setValue(
        'silvermanLowerChestRetractions',
        perinatales.tableSilverman.silvermanLowerChestRetractions
      );
      setValue(
        'silvermanXiphoidRetraction',
        perinatales.tableSilverman.silvermanXiphoidRetraction
      );
      setValue(
        'silvermanUpperChestRetractions',
        perinatales.tableSilverman.silvermanUpperChestRetractions
      );

      if (!isNaN(parsedScore)) {
        setSilverman(parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setTableSilverman(watch()));
    dispatch(setSilvermanScore(silverman));
  }, [dispatch, silverman, watch]);

  const handleChangesSilverman = () => {
    let ratingSilverman = 0;
    ratingSilverman += parseFloat(
      document.querySelector('#silverman-anderson-nasal-dilatation').value
    );
    ratingSilverman += parseFloat(
      document.querySelector('#silverman-anderson-grunt').value
    );
    ratingSilverman += parseFloat(
      document.querySelector('#silverman-anderson-lower-chest-retractions').value
    );
    ratingSilverman += parseFloat(
      document.querySelector('#silverman-anderson-xiphoid-retraction').value
    );
    ratingSilverman += parseFloat(
      document.querySelector('#silverman-anderson-upper-chest-retractions').value
    );

    silverman = ratingSilverman;

    setSilverman(silverman);
  };

  return (
    <Fragment>
      <div id='silverman-anderson-formula'>
        <div className='row mb-3'>
          <div className='col-12'>
            <div id='allergy-symptoms-list' className='list-group'>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/img/illustrations/silverman_anderson/1.svg'
                    }
                    width='45px'
                    alt='silverman-anderson-point'
                  />
                  Dilatación nasal
                </div>
                <Controller
                  name='silvermanNasalDilatation'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChangesSilverman();
                        onChange(e);
                      }}
                      value={value}
                      id='silverman-anderson-nasal-dilatation'
                      className='silverman-anderson-select form-select w-25'
                    >
                      <option value={0}>Ninguno</option>
                      <option value={1}>Minimo</option>
                      <option value={2}>marcado</option>
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
                      '/assets/img/illustrations/silverman_anderson/2.svg'
                    }
                    width='45px'
                    alt='silverman-anderson-point'
                  />
                  Quejido pulmonar
                </div>
                <Controller
                  name='silvermanGrunt'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        onChange(e);
                        handleChangesSilverman();
                      }}
                      value={value}
                      id='silverman-anderson-grunt'
                      className='silverman-anderson-select form-select w-25'
                    >
                      <option value='0'>Ninguno</option>
                      <option value='1'>Audible con estetoscopio</option>
                      <option value='2'>Audible</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/silverman_anderson/3.svg'}
                    width='45px'
                    alt='silverman-anderson-point'
                  />
                  Tiraje Intercostal
                </div>
                <Controller
                  name='silvermanLowerChestRetractions'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        onChange(e);
                        handleChangesSilverman();
                      }}
                      value={value}
                      id='silverman-anderson-lower-chest-retractions'
                      className='silverman-anderson-select form-select w-25'
                    >
                      <option value='0'>Ninguno</option>
                      <option value='1'>Apenas Visible</option>
                      <option value='2'>Marcado</option>
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
                      '/assets/img/illustrations/silverman_anderson/4.svg'
                    }
                    width='45px'
                    alt='silverman-anderson-point'
                  />
                  Retracción Xifoidea
                </div>
                <Controller
                  name='silvermanXiphoidRetraction'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        onChange(e);
                        handleChangesSilverman();
                      }}
                      value={value}
                      id='silverman-anderson-xiphoid-retraction'
                      className='silverman-anderson-select form-select w-25'
                    >
                      <option value='0'>Sin Retracción</option>
                      <option value='1'>Apenas Visible</option>
                      <option value='2'>Marcado</option>
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
                      '/assets/img/illustrations/silverman_anderson/5.svg'
                    }
                    width='45px'
                    alt='silverman-anderson-point'
                  />
                  Elevación de Torax y de abdomen
                </div>
                <Controller
                  name='silvermanUpperChestRetractions'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        handleChangesSilverman();
                      }}
                      id='silverman-anderson-upper-chest-retractions'
                      className='silverman-anderson-select form-select w-25'
                    >
                      <option value='0'>Sincronizado</option>
                      <option value='1'>Retraso en Respiración</option>
                      <option value='2'>Bamboleo</option>
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
            src={
              process.env.PUBLIC_URL +
              '/assets/img/illustrations/silverman_anderson/6.svg'
            }
            width='65px'
            alt='silverman-anderson-rating'
          />
          <h1 id='silverman-anderson-rating-count' className='fs-1 mb-0'>
            {silverman || 0}
          </h1>
        </div>
        {silverman >= 1 && silverman <= 3 ? (
          <div className='alert alert-info mt-2' role='alert'>
            Con dificultad respiratoria leve
          </div>
        ) : silverman >= 4 && silverman <= 6 ? (
          <div className='alert alert-warning mt-2' role='alert'>
            Con dificultad respiratoria moderada
          </div>
        ) : silverman >= 7 ? (
          <div className='alert alert-danger mt-2' role='alert'>
            Con dificultad respiratoria Severa
          </div>
        ) : silverman < 0 ? (
          <div className='alert alert-success mt-2' mt-2>
            Sin asfixia ni dificultad respiratoria
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TablaSilverman;
