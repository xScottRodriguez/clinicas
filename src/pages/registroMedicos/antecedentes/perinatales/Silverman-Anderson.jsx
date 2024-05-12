/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TablaSilverman from './TablaSilverman';
import { setSilvermanScore } from '../../../../store/slices/antecedentes';

const Silverman = ({ isSilvermanActive, toggleSilverman }) => {
  const dispatch = useDispatch();
  const { watch, control, setValue } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded && perinatales?.puntajeSilverman !== undefined) {
      const parsedScore = perinatales.puntajeSilverman;
      if (!isNaN(parsedScore)) {
        setValue('rating', parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setSilvermanScore(watch('rating')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, watch('rating')]);
  return (
    <Fragment>
      <h4 className='mt-5 mb-3'>
        Puntaje de SILVERMAN – ANDERSON
        <p className='text-muted fw-normal small mb-0'>
          El test de Silverman y Anderson es un examen que valora la función
          respiratoria de un recién nacido, basado en cinco criterios.
        </p>
      </h4>
      <Form.Group className='mb-3'>
        <Form.Check type='checkbox' id='silvermanCheckbox'>
          <Form.Check.Input
            onChange={toggleSilverman}
            type='checkbox'
            className='toggle-checkbox me-2'
            data-hide='#silverman-anderson-formula'
            data-show='#silverman-anderson-value'
            checked={isSilvermanActive}
          />
          <Form.Check.Label htmlFor='silvermanCheckbox'>
            Ingresar puntuación
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>
      {isSilvermanActive ? (
        <Row id='apgar-value' className='mb-5'>
          <Col xs={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Puntuación de SILVERMAN – ANDERSON</Form.Label>
              <Controller
                name='rating'
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type='number'
                    step='0.01'
                    {...field}
                    value={perinatales.puntajeSilverman}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <TablaSilverman />
      )}
    </Fragment>
  );
};

Silverman.propTypes = {
  toggleSilverman: PropTypes.func.isRequired,
  isSilvermanActive: PropTypes.bool.isRequired,
};
export default Silverman;
