/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InputMask } from '../../../../components/inputs/InputMask';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPrecedentG } from '../../../../store/slices/antecedentes';
import { clinicalApi } from '../../../../services/rtk-query';
import { ginecologicalaAdapter } from './utils';
import { useParams } from 'react-router-dom';

export default function AntecedentesG() {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getGinecologicalForFile.useQueryState(consultaId);
  const { watch, setValue, control } = useForm({
    defaultValues: {
      menarca: '',
      formulaMenstrual: '',
      menopausia: '',
      ultimaCitologia: '',
    },
  });
  const dispatch = useDispatch();
  const { ginecologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      if (!data.length) return;
      const info = ginecologicalaAdapter(data[0]);
      setValue('menarca', info.antecedentesG.menarca);
      setValue('formulaMenstrual', info.antecedentesG.formulaMenstrual);
      setValue('menopausia', info.antecedentesG.menopausia);
      setValue('ultimaCitologia', info.antecedentesG.ultimaCitologia);
    }
  }, [data, isSuccess, isFetching, setValue]);

  useEffect(() => {
    if (!isLoading && ginecologicos?.antecedentesG) {
      setValue('menarca', ginecologicos?.antecedentesG?.menarca);
      setValue('formulaMenstrual', ginecologicos.antecedentesG.formulaMenstrual);
      setValue('menopausia', ginecologicos.antecedentesG.menopausia);
      setValue('ultimaCitologia', ginecologicos.antecedentesG.ultimaCitologia);
      setisLoading(true);
    }
  }, [isLoading, ginecologicos.antecedentesG, setValue]);

  useEffect(() => {
    dispatch(setPrecedentG(watch()));
  }, [dispatch, watch()]);

  return (
    <Fragment>
      <Row className='mb-5'>
        <Col sm={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='gynecological_menarche'>
              Menarca{' '}
              <span
                className='cursor-pointer text-muted'
                data-bs-toggle='tooltip'
                title='Edad en que presenta su primera menstruación. Normal 9 -15 años.'
              >
                <i className='fas fa-info-circle'></i>
              </span>
            </Form.Label>
            <Controller
              control={control}
              name='menarca'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='number'
                  id='gynecological_menarche'
                  name='gynecological_menarche'
                />
              )}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='gynecological_menstrual_formula'>
              Formula menstrual{' '}
              <span
                className='cursor-pointer text-muted'
                data-bs-toggle='tooltip'
                title='La fórmula menstrual se refiere a los días que dura la menstruación y ritmo, por ejemplo, si dura de tres a cinco días y si tiene un ritmo de veintiocho a treinta días.'
              >
                <i className='fas fa-info-circle'></i>
              </span>
            </Form.Label>
            <Controller
              control={control}
              name='formulaMenstrual'
              render={({ field }) => <InputMask {...field} mask='9-9/99-99' />}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='gynecological_last_menstruation'>
              Menopausia{' '}
              <span
                className='cursor-pointer text-muted'
                data-bs-toggle='tooltip'
                title='Edad en que deja de presentar menstruación. Normal 45 – 55 años.'
              >
                <i className='fas fa-info-circle'></i>
              </span>
            </Form.Label>
            <Controller
              control={control}
              name='menopausia'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='date'
                  id='gynecological_last_menstruation'
                  name='gynecological_last_menstruation'
                />
              )}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='gynecological_last_cytology'>
              Última Citología{' '}
              <span
                className='cursor-pointer text-muted'
                data-bs-toggle='tooltip'
                title='Mujeres mayores de 25 años ó 1 a 2 años de haber inciado relaciones sexuales.'
              >
                <i className='fas fa-info-circle'></i>
              </span>
            </Form.Label>
            <Controller
              control={control}
              name='ultimaCitologia'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='date'
                  id='gynecological_last_cytology'
                  name='gynecological_last_cytology'
                />
              )}
            />
          </Form.Group>
        </Col>
      </Row>
    </Fragment>
  );
}
