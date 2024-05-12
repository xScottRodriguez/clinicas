/** @format */

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setObstetricalFormula } from '../../../../store/slices/obstetricos';
import { clinicalApi } from '../../../../services/rtk-query';
import { useParams } from 'react-router-dom';

export default function Formulas() {
  const { id = null } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getObstetricDiseasesForFile.useQueryState(id);
  const { control, setValue, watch } = useForm({
    defaultValues: {
      g: null,
      p: null,
      a: null,
      c: null,
      nacidosVivos: null,
      nacidosMuertos: null,
      viven: null,
      muertoPrimeraSemana: null,
      muertoDespuesPrimeraSemana: null,
    },
  });
  const { formulaObstetrica } = useSelector((state) => state.obstetrico);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      setValue('g', info.formulaObstretica.G);
      setValue('p', info.formulaObstretica.P);
      setValue('a', info.formulaObstretica.A);
      setValue('c', info.formulaObstretica.C);
      setValue('nacidosVivos', info.nacidosVivos);
      setValue('nacidosMuertos', info.nacidosMuertos);
      setValue('viven', info.viven);
      setValue('muertoPrimeraSemana', info.muertoPrimeraSemana);
      setValue('muertoDespuesPrimeraSemana', info.muertoDespuesPrimeraSemana);
    }
  }, [data, isFetching, isSuccess, setValue]);

  useEffect(() => {
    if (!loading && Object.values(formulaObstetrica).length > 0) {
      setValue('g', formulaObstetrica.g);
      setValue('p', formulaObstetrica.p);
      setValue('a', formulaObstetrica.a);
      setValue('c', formulaObstetrica.c);
      setValue('nacidosVivos', formulaObstetrica.nacidosVivos);
      setValue('nacidosMuertos', formulaObstetrica.nacidosMuertos);
      setValue('viven', formulaObstetrica.viven);
      setValue('muertoPrimeraSemana', formulaObstetrica.muertoPrimeraSemana);
      setValue(
        'muertoDespuesPrimeraSemana',
        formulaObstetrica.muertoDespuesPrimeraSemana
      );
      setLoading(true);
    }
  }, [formulaObstetrica, loading, setValue]);

  useEffect(() => {
    dispatch(setObstetricalFormula(watch()));
  }, [dispatch, watch()]);

  return (
    <div className='my-3'>
      <h5 className='my-4'>
        <i className='fas fa-female'></i> Formula Obstetrica:
        <span
          className='cursor-pointer text-muted'
          data-bs-toggle='tooltip'
          data-bs-html='true'
        >
          <i className='fas fa-info-circle'></i>
        </span>
        <p className='text-muted fw-normal small mb-3'>
          Manera universal de resumir antecedentes obstetricos de la mujer
          embarazada.
        </p>
      </h5>
      <div className='row my-5'>
        <div className=' col-md-12'>
          <div className=' row'>
            <div className='col-lg-3 col-md-6 d-flex my-3'>
              <div className='p-2'>
                <h4 className='fw-bold m-0 p-0'>G</h4>
              </div>

              <div>
                <Controller
                  control={control}
                  name='g'
                  render={({ field: { onChange, value } }) => (
                    <input
                      onChange={onChange}
                      value={value}
                      className='form-gpac form-control form-control-lg text-center fw-bold'
                      type='number'
                      name='g'
                      id='g'
                    />
                  )}
                />
              </div>
            </div>
            <div className='col-lg-3 col-md-6 d-flex my-3'>
              <div className='p-2'>
                <h4 className='fw-bold m-0 p-0'>p</h4>
              </div>
              <div>
                <Controller
                  control={control}
                  name='p'
                  render={({ field: { onChange, value } }) => (
                    <input
                      onChange={onChange}
                      value={value}
                      type='number'
                      className=' form-gpac form-control form-control-lg text-center fw-bold'
                      name='p'
                      id='p'
                    />
                  )}
                />
              </div>
            </div>
            <div className='col-lg-3 col-md-6 d-flex my-3'>
              <div className='p-2'>
                <h4 className='fw-bold m-0 p-0'>A</h4>
              </div>
              <div>
                <Controller
                  control={control}
                  name='a'
                  render={({ field: { onChange, value } }) => (
                    <input
                      onChange={onChange}
                      value={value}
                      className='form-gpac form-control form-control-lg text-center fw-bold'
                      type='number'
                      name='a'
                      id='a'
                    />
                  )}
                />
              </div>
            </div>
            <div className='col-lg-3 col-md-6 d-flex my-3'>
              <div className='p-2'>
                <h4 className='fw-bold m-0 p-0'>C</h4>
              </div>
              <div>
                <Controller
                  control={control}
                  name='c'
                  render={({ field: { onChange, value } }) => (
                    <input
                      onChange={onChange}
                      value={value}
                      className='form-gpac form-control form-control-lg text-center fw-bold'
                      type='number'
                      name='c'
                      id='c'
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Cuando la gravidez y la paridad se calculan como parte de los antecedentes
        obstétricos, los nacimientos múltiples se marcan como un solo hecho de
        gravidez y cada hijo se indica como parte del total de paridad.
      </p>
      <div className='row mb-3'>
        <div className='mb-3 col-md-6 '>
          <label className='form-label' htmlFor=''>
            Nacidos vivos:
          </label>
          <Controller
            control={control}
            name='nacidosVivos'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-6 '>
          <label className='form-label' htmlFor=''>
            Nacidos Muertos:
          </label>
          <Controller
            control={control}
            name='nacidosMuertos'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-6 '>
          <label className='form-label' htmlFor=''>
            Viven:
          </label>
          <Controller
            control={control}
            name='viven'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-6 '>
          <label className='form-label' htmlFor=''>
            Muerto en la 1ra. Semana:{' '}
          </label>
          <Controller
            control={control}
            name='muertoPrimeraSemana'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-12 '>
          <label className='form-label' htmlFor=''>
            Muerto despues de la 1ra semana:{' '}
          </label>
          <Controller
            control={control}
            name='muertoDespuesPrimeraSemana'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                className='form-control'
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
