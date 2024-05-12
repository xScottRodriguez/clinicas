/** @format */

import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import TablaTestsCapurro from './TablaTestsCapurro';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCapurroScore } from '../../../../store/slices/antecedentes';
const TestCapurro = ({ isCapurroActive, toggleCapurroActive, expedientData }) => {
  const dispatch = useDispatch();
  const { watch, control, setValue } = useForm({
    defaultValues: {
      rating: 0,
    },
  });
  const { perinatales } = useSelector((state) => state.antecedente);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (expedientData) {
      setValue('rating', expedientData.puntajeCapurro);
    }
  }, [expedientData, setValue]);

  useEffect(() => {
    if (!isLoaded && perinatales?.puntajeCapurro !== undefined) {
      const parsedScore = parseInt(perinatales.puntajeCapurro);
      if (!isNaN(parsedScore)) {
        setValue('rating', parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setCapurroScore(watch('rating')));
  }, [dispatch, watch('rating')]);

  return (
    <>
      <h4 className='mt-5 mb-3'>
        Test Capurro
        <p className='text-muted fw-normal small mb-0'>
          La valoración o test de Capurro (o método de Capurro) es un criterio
          utilizado para estimar la edad gestacional de un neonato.
        </p>
      </h4>
      <Form.Group className='mb-3'>
        <Form.Check id='capurroCheckbox'>
          <Form.Check.Input
            onChange={toggleCapurroActive}
            type='checkbox'
            className='form-check-input toggle-checkbox me-2'
            data-hide='#capurro-formula'
            data-show='#capurro-value'
            checked={isCapurroActive}
          />
          <Form.Check.Label htmlFor='capurroCheckbox'>
            Ingresar puntuación
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      {isCapurroActive ? (
        <Row id='apgar-value' className='mb-5'>
          <Col xs={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Puntuación de Apgar</Form.Label>
              <Controller
                name='rating'
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type='number'
                    step='0.01'
                    {...field}
                    value={perinatales.puntajeCapurro}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <TablaTestsCapurro />
      )}
    </>
  );
};
TestCapurro.propTypes = {
  isCapurroActive: Proptypes.bool.isRequired,
  toggleCapurroActive: Proptypes.func.isRequired,
};
export default TestCapurro;
