/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBallarScore,
  setBallarGenitalesF,
  setBallarGenitalesM,
  setBallarLanugo,
  setBallarMamas,
  setBallarOrejas,
  setBallarPlanta,
  setBallarSkin,
} from '../../../../store/slices/antecedentes';
import { Controller, useForm } from 'react-hook-form';
import { mapToLoadPerinatales } from './utils';

const TablaBallard = () => {
  let [estado, setEstado] = useState(0);
  let [resultado, setResultado] = useState(0);

  const dispatch = useDispatch();
  const { perinatales } = useSelector((state) => state.antecedente);
  const {
    queries: { [`getPregnancyHistoryForFile(${1})`]: pregnancyHistory },
  } = useSelector((state) => state.clinicalApi);

  const [isLoaded, setIsLoaded] = useState(false);
  const { setValue, control } = useForm({
    defaultValues: {
      ballardSkin: perinatales?.tableBallar?.ballardSkin ?? null,
      ballardLanugo: perinatales?.tableBallar?.ballardLanugo ?? null,
      ballardPlanta: perinatales?.tableBallar?.ballardPlanta ?? null,
      ballardMamas: perinatales?.tableBallar?.ballardMamas ?? null,
      ballardOrejas: perinatales?.tableBallar?.ballardOrejas ?? null,
      ballardGenitalesF: perinatales?.tableBallar?.ballardGenitalesF ?? null,
      ballardGenitalesM: perinatales?.tableBallar?.ballardGenitalesM ?? null,
    },
  });

  useEffect(() => {
    if (pregnancyHistory?.data?.length) {
      const {
        tableBallar: {
          ballardSkin,
          ballardLanugo,
          ballardPlanta,
          ballardMamas,
          ballardOrejas,
          ballardGenitalesF,
          ballardGenitalesM,
        },
        puntajeBallar,
      } = mapToLoadPerinatales(pregnancyHistory?.data[0]);
      const parsedScore = parseInt(puntajeBallar);
      setValue('capurroSkinballardSkin', ballardSkin);
      setValue('ballardLanugo', ballardLanugo);
      setValue('ballardPlanta', ballardPlanta);
      setValue('ballardMamas', ballardMamas);
      setValue('ballardOrejas', ballardOrejas);
      setValue('ballardGenitalesF', ballardGenitalesF);
      setValue('ballardGenitalesM', ballardGenitalesM);
      if (!isNaN(parsedScore)) {
        setResultado(parsedScore);
        setIsLoaded(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pregnancyHistory?.data?.length, setValue]);

  useEffect(() => {
    if (
      !isLoaded &&
      perinatales?.puntajeBallar !== undefined &&
      perinatales?.tableBallar
    ) {
      if (pregnancyHistory?.data?.length) {
        const {
          tableBallar: {
            ballardSkin,
            ballardLanugo,
            ballardPlanta,
            ballardMamas,
            ballardOrejas,
            ballardGenitalesF,
            ballardGenitalesM,
          },
          puntajeBallar,
        } = mapToLoadPerinatales(pregnancyHistory?.data[0]);
        const parsedScore = parseInt(puntajeBallar);
        setValue('ballardSkin', ballardSkin);
        setValue('ballardLanugo', ballardLanugo);
        setValue('ballardPlanta', ballardPlanta);
        setValue('ballardMamas', ballardMamas);
        setValue('ballardOrejas', ballardOrejas);
        setValue('ballardGenitalesF', ballardGenitalesF);
        setValue('ballardGenitalesM', ballardGenitalesM);
        if (!isNaN(parsedScore)) {
          setResultado(parsedScore);
          setIsLoaded(true);
        }
        return;
      }

      const parsedScore = parseInt(perinatales.puntajeBallar);
      setValue('ballardSkin', perinatales.tableBallar.ballardSkin);
      setValue('ballardLanugo', perinatales.tableBallar.ballardLanugo);
      setValue('ballardPlanta', perinatales.tableBallar.ballardPlanta);
      setValue('ballardMamas', perinatales.tableBallar.ballardMamas);
      setValue('ballardOrejas', perinatales.tableBallar.ballardOrejas);
      setValue('ballardGenitalesF', perinatales.tableBallar.ballardGenitalesF);
      setValue('ballardGenitalesM', perinatales.tableBallar.ballardGenitalesM);

      if (!isNaN(parsedScore)) {
        setResultado(parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  // useEffect(() => {
  //   dispatch(setBallarTable(watch()));
  //   dispatch(setBallarScore(resultado));
  // }, [dispatch, resultado, watch]);

  const handleChange = ({
    ballardSkin,
    ballardLanugo,
    ballardPlanta,
    ballardMamas,
    ballardOrejas,
    ballardGenitalesF,
    ballardGenitalesM,
  }) => {
    let rating = 0;
    let total = 0;
    rating += parseFloat(
      ballardLanugo ?? document.querySelector('#ballard-1')?.value
    );
    rating += parseFloat(
      ballardSkin ?? document.querySelector('#ballard-2')?.value
    );
    rating += parseFloat(
      ballardPlanta ?? document.querySelector('#ballard-3')?.value
    );
    rating += parseFloat(
      ballardMamas ?? document.querySelector('#ballard-4')?.value
    );
    rating += parseFloat(
      ballardOrejas ?? document.querySelector('#ballard-5')?.value
    );
    rating += parseFloat(
      ballardGenitalesF ?? document.querySelector('#ballard-6')?.value
    );
    rating += parseFloat(
      ballardGenitalesM ?? document.querySelector('#ballard-7')?.value
    );

    estado = rating;
    setEstado(estado);
    if (estado >= 1 && estado <= 5) {
      total = 26;
    }
    if (estado >= 6 && estado <= 10) {
      total = 28;
    }
    if (estado >= 11 && estado <= 15) {
      total = 30;
    }
    if (estado >= 16 && estado <= 25) {
      total = 34;
    }
    if (estado >= 26 && estado <= 35) {
      total = 38;
    }
    if (estado >= 36 && estado <= 45) {
      total = 42;
    }
    if (estado >= 46) {
      total = 44;
    }
    resultado = total;
    setResultado(resultado);
    dispatch(setBallarScore(resultado));
  };

  return (
    <Fragment>
      <div id='ballard-formula'>
        <div className='row mb-3'>
          <div className='col-12'>
            <div id='allergy-symptoms-list' className='list-group'>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/1.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Piel
                </div>
                <Controller
                  name='ballardSkin'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      id='ballard-2'
                      className='ballard-select form-select w-25'
                      onChange={(e) => {
                        dispatch(setBallarSkin(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardSkin: e.target.value,
                        });
                      }}
                      value={value}
                    >
                      <option value='0'>Gelatinosa, roja y transparente</option>
                      <option value='1'>Lisa, rosada y venas visibles</option>
                      <option value='2'>
                        Descamasion superficil y pocas venas
                      </option>
                      <option value='3'>Palida, grietas y raras venas</option>
                      <option value='4'>Surcos profundos y no hay venas</option>
                      <option value='5'>Gruesa, surcos y arrugas</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/2.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Lanugo
                </div>
                <Controller
                  name='ballardLanugo'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        dispatch(setBallarLanugo(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardLanugo: e.target.value,
                        });
                      }}
                      value={value}
                      id='ballard-1'
                      className='ballard-select form-select w-25'
                    >
                      <option value='0'>Nignuno</option>
                      <option value='1'>Abundante</option>
                      <option value='2'>Mas Fino</option>
                      <option value='3'>Areas Lampiñas</option>
                      <option value='4'>Casi todo limpio</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/3.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Surcos Planares
                </div>
                <Controller
                  name='ballardPlanta'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        dispatch(setBallarPlanta(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardPlanta: e.target.value,
                        });
                      }}
                      value={value}
                      id='ballardPlanta??ballard-3'
                      className='ballard-select form-select w-25'
                    >
                      <option value='0'>Nignuno</option>
                      <option value='1'>Liheras marcas rojas</option>
                      <option value='2'>Solo surco transverso anterior</option>
                      <option value='3'>Surcos en 2/3 anteriores</option>
                      <option value='4'>Surcos en toda la planta</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/4.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Mamas
                </div>
                <Controller
                  name='ballardMamas'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        dispatch(setBallarMamas(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardMamas: e.target.value,
                        });
                      }}
                      value={value}
                      id='bballardMamas??allard-4'
                      className='ballard-select form-select w-25'
                    >
                      <option onChange={handleChange} value='0'>
                        Apenas perceptibles
                      </option>
                      <option onChange={handleChange} value='1'>
                        Areola plana sin relieves
                      </option>
                      <option onChange={handleChange} value='2'>
                        Areola punteada relieve: 1-2mm
                      </option>
                      <option onChange={handleChange} value='2'>
                        Areola elevada relieve: 3-4mm
                      </option>
                      <option onChange={handleChange} value='2'>
                        Areola llena relieve: 5-10mm
                      </option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/5.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Orejas
                </div>
                <Controller
                  name='ballardOrejas'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      onChange={(e) => {
                        dispatch(setBallarOrejas(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardOrejas: e.target.value,
                        });
                      }}
                      value={value}
                      id='bballardOrejas??allard-5'
                      className='ballard-select form-select w-25'
                    >
                      <option value='0'>Pabellon plano queda plegado</option>
                      <option value='1'>Pabellon blando despliegue lento</option>
                      <option value='2'>
                        Pabellon incurvado facil de enderezar
                      </option>
                      <option value='3'>
                        Formadas libres, siempre enderezables
                      </option>
                      <option value='4'>Grueso cartilago oreja rigida</option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/6.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Genitales (Femenino)
                </div>
                <Controller
                  name='ballardGenitalesF'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      id='ballard-6'
                      className='ballard-select form-select w-25'
                      onChange={(e) => {
                        dispatch(setBallarGenitalesF(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardGenitalesF: e.target.value,
                        });
                      }}
                      value={value}
                    >
                      <option value='0'>
                        Clitoris y labios menores prominentes
                      </option>
                      <option value='2'>
                        Labios mayores y menores igual de prominentes
                      </option>
                      <option value='3'>
                        Labios mayores grandes y menores pequeños
                      </option>
                      <option value='4'>
                        Clitoris y menores cubiertos totalmente
                      </option>
                    </select>
                  )}
                />
              </div>
              <div className='list-group-item d-flex align-items-center justify-content-between'>
                <div>
                  <img
                    className='me-2'
                    src={'/assets/img/ballard/7.svg'}
                    width='45px'
                    alt='ballard-point'
                  />
                  Genitales (Masculino)
                </div>
                <Controller
                  name='ballardGenitalesM'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      id='ballard-7'
                      onChange={(e) => {
                        dispatch(setBallarGenitalesM(e.target.value));
                        onChange(e);
                        handleChange({
                          ballardGenitalesM: e.target.value,
                        });
                        console.log(e);
                      }}
                      value={value}
                      className='ballard-select form-select w-25'
                    >
                      <option value='0'>Escroto vacio sin arrugas</option>
                      <option value='2'>
                        Testiculos en descenso pocas arrugas
                      </option>
                      <option value='3'>
                        Testiculos descendidos buenas arrugas
                      </option>
                      <option value='4'>
                        Testiculos pendulos produndas arrugas
                      </option>
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
            src={'/assets/img/ballard/8.svg'}
            width='65px'
            alt='ballard-rating'
          />
          <h1 id='ballard-rating-count' className='fs-1 mb-0'>
            {resultado} semanas
          </h1>
        </div>
      </div>
    </Fragment>
  );
};

export default TablaBallard;
