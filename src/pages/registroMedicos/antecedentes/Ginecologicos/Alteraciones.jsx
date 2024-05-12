/** @format */

import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import {
  clinicalApi,
  useGetEtsQuery,
  useGetForContraceptiveMethodsQuery,
} from '../../../../services/rtk-query';
import { Controller, useForm } from 'react-hook-form';
import { setMenstrualDisorders } from '../../../../store/slices/antecedentes';
import { useDispatch, useSelector } from 'react-redux';
import { formatAlteraciones, ginecologicalaAdapter } from './utils';
import { useParams } from 'react-router-dom';

export default function Alteraciones() {
  const { id = null, consultaId } = useParams();
  const { data, isError, isLoading, isSuccess } =
    useGetForContraceptiveMethodsQuery(id);
  const {
    data: fileData,
    isSuccess: isFileSuccess,
    isFetching,
  } = clinicalApi.endpoints.getGinecologicalForFile.useQueryState(consultaId);

  const {
    data: dataEts,
    isLoading: isLoadingEts,
    isSuccess: isSuccessEts,
  } = useGetEtsQuery();
  const dispatch = useDispatch();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      alteraciones: [],
      inicioVidaSexual: null,
      numeroParejas: null,
      tipoVaginitis: null,
      vaginitis: false,
    },
  });

  const { ginecologicos } = useSelector((state) => state.antecedente);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFileSuccess && !isFetching && isSuccess && isSuccessEts) {
      if (!fileData.length) return;

      const info = ginecologicalaAdapter(fileData[0]);
      const { alteraciones, tipoVaginitis } = info?.alteracionesDeMenstruacion;

      const newAlteraciones = formatAlteraciones(alteraciones, data);

      const newTipoVaginitis = dataEts.find((ets) => ets.id === tipoVaginitis);
      setValue('alteraciones', newAlteraciones);
      setValue('numeroParejas', info.alteracionesDeMenstruacion.inicioVidaSexual);
      setValue(
        'inicioVidaSexual',
        info.alteracionesDeMenstruacion.inicioVidaSexual
      );
      setValue('vaginitis', info.alteracionesDeMenstruacion.vaginitis);
      setValue('tipoVaginitis', {
        value: newTipoVaginitis.id,
        label: newTipoVaginitis.valor,
      });
    }
  }, [fileData, isFetching, isFileSuccess, setValue]);

  useEffect(() => {
    if (!loading && ginecologicos?.alteracionesDeMenstruacion !== undefined) {
      setValue(
        'alteraciones',
        ginecologicos.alteracionesDeMenstruacion.alteraciones
      );
      setValue(
        'inicioVidaSexual',
        ginecologicos.alteracionesDeMenstruacion.inicioVidaSexual
      );
      setValue(
        'numeroParejas',
        ginecologicos.alteracionesDeMenstruacion.numeroParejas
      );
      setValue('vaginitis', ginecologicos.alteracionesDeMenstruacion.vaginitis);
      setValue(
        'tipoVaginitis',
        ginecologicos.alteracionesDeMenstruacion.tipoVaginitis
      );
      setLoading(true);
    }
  }, [loading, ginecologicos, setValue]);

  useEffect(() => {
    dispatch(setMenstrualDisorders(watch()));
  }, [dispatch, watch()]);
  return (
    <Fragment>
      <Row className='mb-3'>
        <Col className='mb-3' md={8}>
          <Row>
            <Col className='mb-3' md={12}>
              <Form.Group controlId='menstrual-disorders'>
                <Form.Label>Alteraciones</Form.Label>
                <Controller
                  control={control}
                  name='alteraciones'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder='Seleccionar...'
                      options={
                        isError
                          ? [
                              {
                                label:
                                  'Error al cargar los Meotodos anticonceptivos... ',
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
                      isMulti
                      onChange={onChange}
                      value={value}
                      isClearable
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col className='mb-3' md={6}>
              <Form.Group controlId='gynecological_sexuality_beginning'>
                <Form.Label>Edad inicio de vida sexual</Form.Label>
                <Controller
                  control={control}
                  name='inicioVidaSexual'
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      type='number'
                      data-model='gynecological_sexuality_beginning'
                      name='gynecological_sexuality_beginning'
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col className='mb-3' md={6}>
              <Form.Group controlId='gynecological_sexual_partners'>
                <Form.Label>Número Parejas</Form.Label>
                <Controller
                  control={control}
                  name='numeroParejas'
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      type='number'
                      data-model='gynecological_sexual_partners'
                      name='gynecological_sexual_partners'
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col className='mb-3' md={6}>
              <Form.Group controlId='gynecological_vaginitis' className='my-3'>
                <Controller
                  control={control}
                  name='vaginitis'
                  render={({ field: { onChange, value } }) => (
                    <Form.Check
                      onChange={onChange}
                      checked={value}
                      type='checkbox'
                      label='Vaginitis'
                      value='1'
                      data-boolean='true'
                      data-model='gynecological_vaginitis'
                    />
                  )}
                />
              </Form.Group>
            </Col>

            <Col className='mb-3' md={6}>
              <Form.Group controlId='gynecological_vaginitis_type'>
                <Form.Label>Tipo Vaginitis</Form.Label>

                <Controller
                  control={control}
                  name='tipoVaginitis'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder='Seleccionar...'
                      options={
                        isError
                          ? [
                              {
                                label: 'Error al cargar los tipos de vaignitis... ',
                                value: -2,
                              },
                            ]
                          : isLoadingEts
                          ? [{ label: 'Cargando...', value: -2 }]
                          : isSuccessEts &&
                            dataEts?.map((method) => ({
                              label: method.valor,
                              value: method.id,
                            }))
                      }
                      onChange={onChange}
                      value={value}
                      isClearable
                    />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}
