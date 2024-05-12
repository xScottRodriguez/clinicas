/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { InputMask } from '../../../../components/inputs/InputMask';
import { useDispatch, useSelector } from 'react-redux';
import { setGestationalAgeAndChildbirthCalculation } from '../../../../store/slices/antecedentes';
import {
  capitalize,
  dayDiff,
  ginecologicalaAdapter,
  weekDiff,
  zeroPad,
} from './utils';
import { addMonths } from 'date-fns';
import { clinicalApi } from '../../../../services/rtk-query';
import { useParams } from 'react-router-dom';

export default function CalculoPArto() {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getGinecologicalForFile.useQueryState(consultaId);
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      year: null,
      moth: null,
      day: null,
      pregnantWeeks: 0,
      pregnantDays: 0,
      dueDate: 0,
    },
  });
  const { ginecologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      if (!data.length) return;
      const info = ginecologicalaAdapter(data[0]);
      setValue('year', info.calculoPartoAndEdadGestional.year);
      setValue('moth', info.calculoPartoAndEdadGestional.moth);
      setValue('day', info.calculoPartoAndEdadGestional.day);
      handleButtonClick();
    }
  }, [data, isSuccess, isFetching, setValue]);

  useEffect(() => {
    if (!isLoading && ginecologicos?.calculoPartoAndEdadGestional) {
      setValue('year', ginecologicos.calculoPartoAndEdadGestional.year);
      setValue('moth', ginecologicos.calculoPartoAndEdadGestional.moth);
      setValue('day', ginecologicos.calculoPartoAndEdadGestional.day);
      setValue(
        'pregnantDays',
        ginecologicos.calculoPartoAndEdadGestional.pregnantDays
      );
      setValue(
        'pregnantWeeks',
        ginecologicos.calculoPartoAndEdadGestional.pregnantWeeks
      );
      setValue('dueDate', ginecologicos.calculoPartoAndEdadGestional.dueDate);

      setIsLoading(true);
    }
  }, [ginecologicos.calculoPartoAndEdadGestional, isLoading, setValue]);

  useEffect(() => {
    watch();
  }, [watch]);

  const dispatch = useDispatch();
  const handleClicks = () => {
    let today = new Date();
    let format = new Intl.DateTimeFormat('es-SV', {
      dateStyle: 'full',
    });

    let day = getValues('day') ?? '';
    let month = getValues('moth') ?? 0;
    let year = getValues('year') ?? '';
    let furDate = new Date(
      `${getValues('year')}-${getValues('moth')}-${zeroPad(getValues('day'), 2)}`
    );

    if (
      isNaN(day) ||
      day === '' ||
      month === 'mes' ||
      month === '' ||
      isNaN(year) ||
      year === ''
    ) {
      setValue('pregnantDays', 0);
      setValue('pregnantWeeks', 0);
      setValue('dueDate', capitalize(format.format(today)));
      return;
    }

    setValue('pregnantWeeks', weekDiff(furDate, today));
    let finalDate = new Date(furDate.setYear(furDate.getFullYear() + 1));
    finalDate = new Date(finalDate.getTime() + 7 * 86400000);
    finalDate = addMonths(finalDate, -3);
    setValue('pregnantDays', dayDiff(today, finalDate));
    setValue('dueDate', capitalize(format.format(finalDate)));
  };

  const handleButtonClick = async (e) => {
    handleClicks();
    await handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    dispatch(setGestationalAgeAndChildbirthCalculation(data));
  };

  return (
    <Fragment>
      <Row className='mb-5'>
        <Col xs={12} md={6} className='order-sm-2 order-md-1'>
          <Form.Label htmlFor='pregnant_date' className='form-label'>
            Fecha última regla (FUR):
          </Form.Label>
          <div className='d-flex justify-content-between w-100'>
            <div className='w-30'>
              <Controller
                control={control}
                name='day'
                render={({ field }) => (
                  <Form.Control
                    type='text'
                    {...field}
                    className='form-control text-center px-1'
                    id='pregnant_day'
                    placeholder='Día'
                  />
                )}
              />
            </div>
            <div className='w-30'>
              <Controller
                name='moth'
                control={control}
                defaultValue='mes'
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    id='pregnant_month'
                    className='form-select text-center px-1'
                    {...field}
                  >
                    <option value='mes'>Mes</option>
                    <option value='1'>Enero</option>
                    <option value='2'>Febrero</option>
                    <option value='3'>Marzo</option>
                    <option value='4'>Abril</option>
                    <option value='5'>Mayo</option>
                    <option value='6'>Junio</option>
                    <option value='7'>Julio</option>
                    <option value='8'>Agosto</option>
                    <option value='9'>Septiembre</option>
                    <option value='10'>Octubre</option>
                    <option value='11'>Noviembre</option>
                    <option value='12'>Diciembre</option>
                  </Form.Select>
                )}
              />
            </div>
            <div className='w-30'>
              <Controller
                name='year'
                control={control}
                render={({ field }) => (
                  <InputMask id='pregnant_year' {...field} mask={'9999'} />
                )}
              />
            </div>
          </div>
          <input
            type='hidden'
            id='pregnant_date'
            name='pregnant_date'
            data-model='pregnant_date'
          />
          <Button
            onClick={handleButtonClick}
            type='button'
            id='calc_due_date'
            className='btn btn-primary mt-2'
          >
            Calcular
          </Button>
          <hr />
          <p className='mb-2'>
            Semanas de Embarazo:
            <span id='pregnant_weeks' className='fw-bold d-block mb-0'>
              {getValues('pregnantWeeks')} Semanas
            </span>
          </p>
          <p className='mb-2'>
            Días que faltan de Embarazo:
            <span id='pregnant_days' className='fw-bold d-block mb-0'>
              {getValues('pregnantDays')} Días
            </span>
          </p>
          <p className='mb-2'>
            Fecha probable del parto:
            <span id='due_date' className='fw-bold d-block mb-0'>
              {getValues('dueDate')}
            </span>
          </p>
        </Col>
        <Col className='mt-2 order-sm-1 order-md-2' xs={12} md={5}>
          <img
            className='w-100 rounded'
            src={'/assets/img/illustrations/profiles/pregnant_calc.jpg'}
            alt='pregnant_calc'
          />
        </Col>
      </Row>
    </Fragment>
  );
}
