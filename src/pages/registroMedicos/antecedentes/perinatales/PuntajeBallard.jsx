/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setBallarScore } from '../../../../store/slices/antecedentes';
import TablaBallard from './TablaBallard';
const PuntajeBallard = ({ toggleBallarActive, isBallarActive }) => {
  const dispatch = useDispatch();
  const { watch, control, setValue } = useForm({
    defaultValues: {
      rating: 0,
    },
  });
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded && perinatales?.puntalleBallar !== undefined) {
      const parsedScore = parseInt(perinatales.puntalleBallar);
      if (!isNaN(parsedScore)) {
        setValue('rating', parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setBallarScore(watch('rating')));
  }, [dispatch, watch('rating')]);
  return (
    <Fragment>
      <h4 className='mb-3 mt-5'>
        Puntaje de Ballard
        <p className='text-muted fw-normal small mb-0'>
          EL test de Ballard es una técnica clínica comúnmente usada para el cálculo
          indirecto de la edad gestacional de un recién nacido
        </p>
      </h4>
      <Form.Group className='mb-3'>
        <Form.Check id='ballardCheckbox'>
          <Form.Check.Input
            onChange={toggleBallarActive}
            type='checkbox'
            className='form-check-input toggle-checkbox me-2'
            data-hide='#capurro-formula'
            data-show='#capurro-value'
            checked={isBallarActive}
          />
          <Form.Check.Label htmlFor='ballardCheckbox'>
            Ingresar puntuación
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      {isBallarActive ? (
        <Row id='apgar-value' className='mb-5'>
          <Col xs={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Puntuación de Ballard</Form.Label>
              <Controller
                name='rating'
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type='number'
                    step='0.01'
                    {...field}
                    value={perinatales.puntajeBallar}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <TablaBallard />
      )}
    </Fragment>
  );
};

PuntajeBallard.propTypes = {
  toggleBallarActive: PropTypes.func.isRequired,
  isBallarActive: PropTypes.bool.isRequired,
};
export default PuntajeBallard;
