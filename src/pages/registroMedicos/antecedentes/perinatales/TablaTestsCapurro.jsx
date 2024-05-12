/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCapurroScore,
  setCapurroSkin,
  setCapurroEar,
  setCapurroBreastGland,
  setCapurroNipple,
  setCapurroPlantarFoldes,
} from '../../../../store/slices/antecedentes';
import { Controller, useForm } from 'react-hook-form';
import { mapToLoadPerinatales } from './utils';
import { clinicalApi } from '../../../../services/rtk-query';
import { useParams } from 'react-router-dom';

const TablaTestsCapurro = () => {
  const { id = null } = useParams();
  const { isSuccess, data } =
    clinicalApi.endpoints.getPregnancyHistory.useQueryState(id);
  let [capurro, setCapurro] = useState(0);
  let [to, setTo] = useState(0);

  const dispatch = useDispatch();
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);

  const { control, setValue } = useForm({
    defaultValues: {
      capurroSkin: perinatales.tableCapurro?.capurroSkin ?? null,
      capurroEar: perinatales.tableCapurro?.capurroEar ?? null,
      capurroBreastGland: perinatales.tableCapurro?.capurroBreastGland ?? null,
      capurroNipple: perinatales.tableCapurro?.capurroNipple ?? null,
      capurroPlantarFoldes: perinatales.tableCapurro?.capurroPlantarFoldes ?? null,
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (!data.length) return;

      const [info] = data;
      const {
        tableCapurro: {
          capurroSkin,
          capurroEar,
          capurroBreastGland,
          capurroNipple,
          capurroPlantarFoldes,
        },
      } = mapToLoadPerinatales(info);
      dispatch(setCapurroSkin(capurroSkin));
      dispatch(setCapurroEar(capurroEar));
      dispatch(setCapurroBreastGland(capurroBreastGland));
      dispatch(setCapurroNipple(capurroNipple));
      dispatch(setCapurroPlantarFoldes(capurroPlantarFoldes));
      dispatch(setCapurroScore(info.puntajeCapurro));

      setValue('capurroSkin', capurroSkin);
      setValue('capurroEar', capurroEar);
      setValue('capurroBreastGland', capurroBreastGland);
      setValue('capurroNipple', capurroNipple);
      setValue('capurroPlantarFoldes', capurroPlantarFoldes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, setValue]);

  // useEffect(() => {
  //   if (
  //     (!isLoaded &&
  //       perinatales?.puntajeCapurro !== undefined &&
  //       perinatales?.tableCapurro) ||
  //     data.length
  //   ) {
  //     if (data?.length) {
  //       const {
  //         tableCapurro: {
  //           capurroSkin,
  //           capurroEar,
  //           capurroBreastGland,
  //           capurroNipple,
  //           capurroPlantarFoldes,
  //         },
  //       } = mapToLoadPerinatales(data[0]);
  //       const parsedScore = parseInt(perinatales?.puntajeCapurro);
  //       setValue('capurroSkin', capurroSkin);
  //       setValue('capurroEar', capurroEar);
  //       setValue('capurroBreastGland', capurroBreastGland);
  //       setValue('capurroNipple', capurroNipple);
  //       setValue('capurroPlantarFoldes', capurroPlantarFoldes);
  //       if (!isNaN(parsedScore)) {
  //         setTo(parsedScore);
  //         setIsLoaded(true);
  //       }
  //       return;
  //     } else {
  //       const parsedScore = parseInt(perinatales?.puntajeCapurro);
  //       setValue('capurroSkin', perinatales.tableCapurro.skin);
  //       setValue('capurroEar', perinatales.tableCapurro.ear);
  //       setValue('capurroBreastGland', perinatales.tableCapurro.breastGland);
  //       setValue('capurroNipple', perinatales.tableCapurro.nipple);
  //       setValue('capurroPlantarFoldes', perinatales.tableCapurro.plantarFoldes);

  //       if (!isNaN(parsedScore)) {
  //         setTo(parsedScore);
  //         setIsLoaded(true);
  //       }
  //     }
  //   }
  // }, [isLoaded, perinatales?.puntajeCapurro, perinatales.tableCapurro, setValue]);

  const handleChange = ({
    capurroSkin,
    capurroEar,
    capurroBreastGland,
    capurroNipple,
    capurroPlantarFoldes,
  }) => {
    let rating = 0;
    let total = 0;
    let description = '';
    let className = '';

    rating +=
      capurroSkin ?? parseFloat(document.querySelector('#capurro-skin').value);
    rating +=
      capurroEar ?? parseFloat(document.querySelector('#capurro-ear').value);
    rating +=
      capurroBreastGland ??
      parseFloat(document.querySelector('#capurro-breast-gland').value);
    rating +=
      capurroNipple ?? parseFloat(document.querySelector('#capurro-nipple').value);
    rating +=
      capurroPlantarFoldes ??
      parseFloat(document.querySelector('#capurro-plantar-foldes').value);
    capurro = rating;
    total = Math.round((204 + capurro) / 7);

    to = total;

    setCapurro(capurro);
    setTo(to);
    dispatch(setCapurroScore(to));

    if (to < 32) {
      className = 'alert-danger';
      description = 'Prematuro extremo';
    }

    if (to >= 32 && total <= 34) {
      className = 'alert-warning';
      description = 'Prematuro moderado';
    }

    if (to >= 35 && total <= 36) {
      className = 'alert-info';
      description = 'Prematuro leve';
    }

    if (to >= 37 && total <= 41) {
      className = 'alert-success';
      description = 'A término';
    }

    if (to > 42) {
      className = 'alert-success';
      description = 'Postmaduro';
    }
    console.log(className);
    console.log(description);
    console.log(to);
    console.log(capurro);
  };

  return (
    <Fragment>
      <div id='capurro-formula'>
        <div className='row mb-3'>
          <div className='col-12'>
            <div id='allergy-symptoms-list' className='list-group'>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/capurro/1.svg'}
                    width='45px'
                    alt='capurro-point'
                  />
                  Textura de la piel (TP)
                </div>
                <Controller
                  name='capurroSkin'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChange({
                          capurroSkin: parseFloat(e.target.value),
                        });
                        onChange(e);
                        dispatch(setCapurroSkin(parseFloat(e.target.value)));
                      }}
                      value={value}
                      id='capurro-skin'
                      className='capurro-select form-select w-25'
                    >
                      <option value='0'>Muy fina gelatinosa</option>
                      <option value='5'>Fina y lisa</option>
                      <option value='10'>
                        Mas gruesa discreta descamación superficial
                      </option>
                      <option value='15'>
                        Gruesa con grietas superficiales, descamacion de manos y
                        pies
                      </option>
                      <option value='20'>
                        Gruesa con grietas profundas apergaminadas
                      </option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/capurro/2.svg'}
                    width='45px'
                    alt='capurro-point'
                  />
                  Forma de la Oreja (FO)
                </div>
                <Controller
                  name='capurroEar'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChange({
                          capurroEar: parseFloat(e.target.value),
                        });
                        onChange(e);
                        dispatch(setCapurroEar(parseFloat(e.target.value)));
                      }}
                      value={value}
                      id='capurro-ear'
                      className='capurro-select form-select w-25'
                    >
                      <option value='0'>
                        Aplanada, sin forma incurvación escasa o nula del pabellón
                      </option>
                      <option value='8'>
                        Incurvación de una parte del borde del pabellón (Superior)
                      </option>
                      <option value='16'>
                        Pabellón parcialmente incurvado en todo el borde superior
                      </option>
                      <option value='24'>Pabellón totalmente incurvado</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/capurro/3.svg'}
                    width='45px'
                    alt='capurro-point'
                  />
                  Tamaño de Glandula Mamaria (TGM)
                </div>
                <Controller
                  name='capurroBreastGland'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChange({
                          capurroBreastGland: parseFloat(e.target.value),
                        });
                        onChange(e);
                        dispatch(setCapurroBreastGland(parseFloat(e.target.value)));
                      }}
                      value={value}
                      id='capurro-breast-gland'
                      className='capurro-select form-select w-25'
                    >
                      <option value='0'>No palpable</option>
                      <option value='5'>Palpable menos de 5mm. de diametro</option>
                      <option value='10'>Diametro entre 5mm. y 10mm.</option>
                      <option value='15'>Diametro mayor de 10mm.</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/capurro/4.svg'}
                    width='45px'
                    alt='capurro-point'
                  />
                  Forma del Pezón (FP)
                </div>
                <Controller
                  name='capurroNipple'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChange({
                          capurroNipple: parseFloat(e.target.value),
                        });
                        onChange(e);
                        dispatch(setCapurroNipple(parseFloat(e.target.value)));
                      }}
                      value={value}
                      id='capurro-nipple'
                      className='capurro-select form-select w-25'
                    >
                      <option value='0'>Apenas visible sin areola</option>
                      <option value='5'>
                        Diámetro menor de 7.5mm. areola lisa y chata
                      </option>
                      <option value='10'>
                        Diámetro mayor de 7.5mm. areola punteada (Borde No
                        levantado)
                      </option>
                      <option value='15'>
                        Diámetro mayor de 7.5mm. Areola punteada (Borde levantado)
                      </option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/illustrations/capurro/5.svg'}
                    width='45px'
                    alt='capurro-point'
                  />
                  Pliegues planares (PP)
                </div>
                <Controller
                  name='capurroPlantarFoldes'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        handleChange({
                          capurroPlantarFoldes: parseFloat(e.target.value),
                        });
                        onChange(e);
                        dispatch(
                          setCapurroPlantarFoldes(parseFloat(e.target.value))
                        );
                      }}
                      value={value}
                      id='capurro-plantar-foldes'
                      className='capurro-select form-select w-25'
                    >
                      <option value='0'>Sin pliegues</option>
                      <option value='5'>
                        Pliegues mal definidos sobre la mitad anterior
                      </option>
                      <option value='10'>
                        Pliegues bien definidos sobre la 1/2 anterior y surcos en
                        1/3 anterior
                      </option>
                      <option value='15'>Surcos en la mitad anterior</option>
                      <option value='20'>Surcos en mas de la mitad anterior</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <p className='fw-bold mb-1 '>Interpretación del puntaje</p>
            <div className='d-flex align-items-center border border-2 rounded bg-light p-3'>
              <img
                className='me-5'
                src={'/assets/img/illustrations/capurro/6.svg'}
                width='65px'
                alt='capurro-rating'
              />
              <h1 id='capurro-rating-count' className='fs-1 mb-0'>
                {to} semanas
              </h1>
            </div>
            {to > 0 && to <= 31 ? (
              <div className='alert alert-danger mt-2' role='alert'>
                Prematuro extremno
              </div>
            ) : to >= 32 && to <= 34 ? (
              <div className='alert alert-warning mt-2 ' role='alert'>
                Prematuro moderado
              </div>
            ) : to >= 35 && to <= 36 ? (
              <div className='alert alert-info mt-2' role='alert'>
                Prematuro leve
              </div>
            ) : to >= 37 && to <= 41 ? (
              <div className='alert alert-success mt-2' role='alert'>
                A término
              </div>
            ) : to > 42 ? (
              <div className='alert alert-success mt-2' role='alert'>
                Posmaturo
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TablaTestsCapurro;
