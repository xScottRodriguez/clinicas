/** @format */

import React, { Fragment, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDatosGenerales,
  setObstetriciansNotes,
} from '../../../../store/slices/obstetricos';
import { clinicalApi } from '../../../../services/rtk-query';
import { useParams } from 'react-router-dom';
import FormDiagnostico from '../../incapacidad/FormDiagnostico';
import { OBSTETRICOS, SLICES_NAMES } from '../../../../constants';

export default function DatosGenerales() {
  const { id = null } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getObstetricDiseasesForFile.useQueryState(id);
  const { control, setValue, watch } = useForm({
    defaultValues: {
      noConsultas: null,
      medicacionGestacional: '',
      examenesComplementarios: '',
    },
  });
  const { datosGenerales } = useSelector((state) => state.obstetrico);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      setValue('noConsultas', info.noConsultas);
      setValue('medicacionGestacional', info.medicacionGestacional);
      setValue('examenesComplementarios', info.examenesComplementarios);
      setValue('noConsultas', info.numeroConsulta);
      setValue('medicacionGestacional', info.mediacionGestacional);
      setValue('examenesComplementarios', info.examenesComplementarios);
      dispatch(setObstetriciansNotes(info.observaciones));
    }
  }, [data, isFetching, isSuccess, setValue]);

  useEffect(() => {
    if (!loading && Object.values(datosGenerales).length > 0) {
      setValue('noConsultas', datosGenerales.noConsultas);
      setValue('medicacionGestacional', datosGenerales.medicacionGestacional);
      setValue('examenesComplementarios', datosGenerales.examenesComplementarios);

      setLoading(true);
    }
  }, [loading, datosGenerales, setValue]);

  useEffect(() => {
    dispatch(setDatosGenerales(watch()));
  }, [dispatch, watch()]);

  return (
    <Fragment>
      <h4 className='mb-3'>
        <i className='fas fa-notes-medical me-2'></i> Datos Generales
      </h4>
      <div className='row'>
        <div className='mb-3 col-md-6'>
          <label className='form-label' htmlFor='obstetrics_medical_consultations'>
            No de consultas
          </label>
          <Controller
            control={control}
            name='noConsultas'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                pattern='[0-9]'
                type='number'
                data-model='obstetrics_medical_consultations'
                name='obstetrics_medical_consultations'
                id='obstetrics_medical_consultations'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label' htmlFor='obstetrics_gestational_medication'>
            Medicación gestacional
          </label>
          <Controller
            control={control}
            name='medicacionGestacional'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='number'
                data-model='obstetrics_gestational_medication'
                name='obstetrics_gestational_medication'
                id='obstetrics_gestational_medication'
                className='form-control'
              />
            )}
          />
        </div>
        <div className='mb-3 col-md-12'>
          <label className='form-label' htmlFor='obstetrics_complementary_exams'>
            Examenes complementarios
          </label>
          <Controller
            control={control}
            name='examenesComplementarios'
            render={({ field: { onChange, value } }) => (
              <input
                onChange={onChange}
                value={value}
                type='text'
                data-model='obstetrics_complementary_exams'
                name='obstetrics_complementary_exams'
                id='obstetrics_complementary_exams'
                className='form-control'
              />
            )}
          />
        </div>
      </div>
      <div className='row mb-10 '>
        <div className='mb-3 col col-sm-12'>
          <label className='form-label' htmlFor='obstetrics_observations'>
            Observaciones
          </label>

          <FormDiagnostico
            sliceName={SLICES_NAMES.OBSTETRICO}
            propertySliceName={OBSTETRICOS.DATOS_GENERALES}
          />
        </div>
      </div>
    </Fragment>
  );
}
