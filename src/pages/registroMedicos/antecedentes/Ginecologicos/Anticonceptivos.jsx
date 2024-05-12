/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import {
  clinicalApi,
  useGetContraceptiveMethodsQuery,
} from '../../../../services/rtk-query/clinicalApi';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setContraception } from '../../../../store/slices/antecedentes';
import { CustomInput } from '../../../../components/ginecologicos/CustomInput';
import { PiSyringeLight } from 'react-icons/pi';
import { ginecologicalaAdapter } from './utils';
import { useParams } from 'react-router-dom';

export default function Anticonceptivos() {
  const { id = null, consultaId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetContraceptiveMethodsQuery();
  const {
    data: stateData,
    isSuccess: isSuccessState,
    isFetching,
  } = clinicalApi.endpoints.getGinecologicalForFile.useQueryState(consultaId);
  const { control, setValue, watch } = useForm({
    defaultValues: {
      tipoAnticoncepcion: null,
      inicioAnticoncepcion: null,
      finAnticoncepcion: null,
      observaciones: '',
    },
  });
  const { ginecologicos } = useSelector((state) => state.antecedente);
  const dispatch = useDispatch();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      if (!stateData?.length) return;
      const { anticoncepcion } = ginecologicalaAdapter(stateData[0]);
      setValue('tipoAnticoncepcion', {
        label: anticoncepcion.tipoAnticoncepcion.nombre,
        value: anticoncepcion.tipoAnticoncepcion.id,
      });
      setValue('inicioAnticoncepcion', anticoncepcion.inicioAnticoncepcion);
      setValue('finAnticoncepcion', anticoncepcion.finAnticoncepcion);
      setValue('observaciones', anticoncepcion.observaciones);
    }
  }, [isFetching, setValue, stateData]);

  useEffect(() => {
    if (!loading && ginecologicos?.anticoncepcion !== undefined) {
      setValue(
        'tipoAnticoncepcion',
        ginecologicos.anticoncepcion.tipoAnticoncepcion
      );
      setValue(
        'inicioAnticoncepcion',
        ginecologicos.anticoncepcion.inicioAnticoncepcion
      );
      setValue('finAnticoncepcion', ginecologicos.anticoncepcion.finAnticoncepcion);

      setIsLoading(true);
    }
  }, [loading, ginecologicos, setValue]);

  useEffect(() => {
    dispatch(setContraception(watch()));
  }, [dispatch, watch()]);
  return (
    <Fragment>
      <h4 className='mb-3'>
        <PiSyringeLight /> Anticoncepción
      </h4>
      <Row>
        <Col sm={4} className='mb-3'>
          <Form.Label htmlFor='contraceptives'>Tipo</Form.Label>
          <Controller
            control={control}
            name='tipoAnticoncepcion'
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Seleccionar...'
                options={
                  isError
                    ? [
                        {
                          label: 'Error al cargar...',
                          value: -2,
                        },
                      ]
                    : isLoading
                    ? [{ label: 'Cargando...', value: -2 }]
                    : isSuccess &&
                      data?.map((method) => ({
                        label: method.nombre,
                        value: method.id,
                      }))
                }
                onChange={onChange}
                value={value}
                isClearable
              />
            )}
          />
        </Col>
        <Col sm={4} className='mb-3'>
          <Form.Label htmlFor='gynecological_contraception_start'>
            Inicio
          </Form.Label>
          <Controller
            control={control}
            name='inicioAnticoncepcion'
            render={({ field: { onChange, value } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                type='date'
                data-model='gynecological_contraception_start'
                name='gynecological_contraception_start'
                id='gynecological_contraception_start'
              />
            )}
          />
        </Col>
        <Col sm={4} className='mb-3'>
          <Form.Label htmlFor='gynecological_contraception_end'>
            Suspencion
          </Form.Label>

          <Controller
            control={control}
            name='finAnticoncepcion'
            render={({ field: { onChange, value } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                type='date'
                data-model='gynecological_contraception_end'
                name='gynecological_contraception_end'
                id='gynecological_contraception_end'
              />
            )}
          />
        </Col>
        <Col sm={12} className='mb-3'>
          <CustomInput />
        </Col>
      </Row>
    </Fragment>
  );
}
