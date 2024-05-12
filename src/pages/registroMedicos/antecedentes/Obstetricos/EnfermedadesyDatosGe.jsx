/** @format */

import React, { Fragment, useEffect, useState } from 'react';
// import SpeechRecognitionProvider from "../../../../HOCs/SpeechRecognitionProvider";
import { FormWithSpeech } from '../../../../components/obstetricos/FormWIthSpeech';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import {
  clinicalApi,
  useGetObstetricDiseasesQuery,
} from '../../../../services/rtk-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPregnancyNotes,
  setObstetricDiseases,
} from '../../../../store/slices/obstetricos';
import { useParams } from 'react-router-dom';
export default function EnfermedadesyDatosGe() {
  const { id = null } = useParams();
  const {
    data: dataState,
    isSuccess: isSuccessState,
    isFetching,
  } = clinicalApi.endpoints.getObstetricDiseasesForFile.useQueryState(id);
  const { enfermedadObstetrica } = useSelector((state) => state.obstetrico);
  const { data, isError, isLoading, isSuccess } = useGetObstetricDiseasesQuery();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      enfermedadObstetrica: null,
    },
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccessState && !isFetching && isSuccess) {
      const [info] = dataState;
      if (!info) return;
      const newData = data.result
        .filter((item) => info.enfermedadesObstreticas.includes(item.id))
        ?.map((item) => ({ label: item.nombre, value: item.id }));
      setValue('enfermedadObstetrica', newData);
      dispatch(setCurrentPregnancyNotes(info.datosGeneralesEmbarazoActual));
    }
  }, [data, dataState, isFetching, isSuccess, isSuccessState, setValue]);

  useEffect(() => {
    if (!loading && enfermedadObstetrica) {
      setValue('enfermedadObstetrica', enfermedadObstetrica);
      setLoading(true);
    }
  }, [loading, enfermedadObstetrica, setValue]);

  useEffect(() => {
    dispatch(setObstetricDiseases(watch('enfermedadObstetrica')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, watch()]);
  return (
    <Fragment>
      <h4 className='mb-3'>
        <i className='fas fa-female me-2'></i> Enfermedades Obstetricas
      </h4>
      <div className='row mb-5'>
        <div className='mb-3 col col-sm-12'>
          <label className='form-label' htmlFor='obstetric-diseases'>
            Alteracioness
          </label>
          <Controller
            name='enfermedadObstetrica'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder='Seleccionar...'
                options={
                  isError
                    ? [
                        {
                          label: 'Error al cargar los Meotodos anticonceptivos... ',
                          value: -2,
                        },
                      ]
                    : isLoading
                    ? [{ label: 'Cargando...', value: -2 }]
                    : isSuccess &&
                      data.result?.map((method) => ({
                        label: method.nombre,
                        value: method.id,
                      }))
                }
                isMulti
                onChange={onChange}
                value={value}
                isClearable
              />
            )}
          />
        </div>
      </div>

      <div className='row mb-5'>
        <div className='mb-3 col col-sm-12'>
          <FormWithSpeech />
        </div>
      </div>
    </Fragment>
  );
}
