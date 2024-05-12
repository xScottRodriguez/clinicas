/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import TablaPuntuacionApgar from './TablaPuntuacionApgar';
import { Controller, useForm } from 'react-hook-form';
import { setApgarScore } from '../../../../store/slices/antecedentes';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar } from 'react-icons/fa6';

const PuntajeApgar = (props) => {
  const dispatch = useDispatch();
  const { watch, control, setValue } = useForm({
    defaultValues: {
      rating: 0,
    },
  });
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded && perinatales?.puntajeApgar !== undefined) {
      const parsedScore = parseInt(perinatales.puntajeApgar);
      if (!isNaN(parsedScore)) {
        setValue('rating', parsedScore);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, perinatales, setValue]);

  useEffect(() => {
    dispatch(setApgarScore(watch('rating')));
  }, [dispatch, watch('rating')]);

  return (
    <Fragment>
      <h4 className='mb-3'>
        <FaRegStar /> PUNTUACIONES:
      </h4>

      <h4 className='mb-3'>
        Puntaje de APGAR
        <p className='text-muted fw-normal small mb-0'>
          Es un método de evaluación que proporciona un indicador numérico de las
          capacidades fisiológicas del bebé para adaptarse a la vida extrauterina
          tras el nacimiento.
        </p>
      </h4>
      <Form.Group className='mb-3'>
        <Form.Check type='checkbox' id='apgarCheckbox'>
          <Form.Check.Input
            onChange={(e) => {
              props.ocultarAbrir(e.target.checked);
            }}
            className='form-check-input toggle-checkbox me-2'
            type='checkbox'
            data-hide='#apgar-formula'
            data-show='#apgar-value'
            checked={props.estado}
          />
          <Form.Check.Label htmlFor='apgarCheckbox'>
            Ingresar puntuación
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      {props.estado ? (
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
                    value={perinatales.puntajeApgar}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <TablaPuntuacionApgar />
      )}
    </Fragment>
  );
};

export default PuntajeApgar;
