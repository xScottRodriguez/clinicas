/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 */

/** @format */

import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { setPerinatalGeneral } from '../../../../store/slices/antecedentes';
import { useDispatch, useSelector } from 'react-redux';
import { mapToLoadPerinatales } from './utils';

const DatosGenerales = () => {
  const dispatch = useDispatch();
  const { perinatales } = useSelector((state) => state.antecedente);
  const {
    queries: { [`getPregnancyHistoryForFile(${1})`]: pregnancyHistory },
  } = useSelector((state) => state.clinicalApi);
  const { generales } = perinatales;
  const { control, watch, setValue } = useForm({
    defaultValues: {
      horaNacimiento: generales.horaNacimiento ?? '',
      numeroGestion: generales.numeroGestion ?? '',
      edadGestacional: generales.edadGestacional ?? '',
      sitionAtencion: generales.sitionAtencion ?? '',
      pesoAlNacer: generales.pesoAlNacer ?? '',
      tallaCm: generales.tallaCm ?? '',
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pregnancyHistory?.data?.length) {
      const { generales } = mapToLoadPerinatales(pregnancyHistory?.data[0]);

      setValue('horaNacimiento', generales.horaNacimiento);
      setValue('numeroGestion', generales.numeroGestion);
      setValue('edadGestacional', generales.edadGestional);
      setValue('sitionAtencion', generales.sitionAtencion);
      setValue('pesoAlNacer', generales.pesoAlNacer);
      setValue('tallaCm', generales.tallaCm);
    }
  }, [pregnancyHistory?.data, setValue]);

  useEffect(() => {
    if (!loading && perinatales?.generales !== undefined) {
      setValue('horaNacimiento', perinatales.generales.horaNacimiento);
      setValue('numeroGestion', perinatales.generales.numeroGestion);
      setValue('edadGestacional', perinatales.generales.edadGestacional);
      setValue('sitionAtencion', perinatales.generales.sitionAtencion);
      setValue('pesoAlNacer', perinatales.generales.pesoAlNacer);
      setValue('tallaCm', perinatales.generales.tallaCm);
      setLoading(true);
    }
  }, [loading, perinatales, setValue]);

  useEffect(() => {
    dispatch(setPerinatalGeneral(watch()));
  }, [dispatch, watch()]);

  return (
    <Form as='section'>
      <Row>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Hora de nacimiento</Form.Label>
            <Controller
              control={control}
              name='horaNacimiento'
              render={({ field }) => <Form.Control type='time' {...field} />}
            />
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>№ de gestión</Form.Label>
            <Controller
              control={control}
              name='numeroGestion'
              render={({ field }) => (
                <Form.Control placeholder='0' type='number' {...field} />
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Edad gestacional</Form.Label>
            <Controller
              control={control}
              name='edadGestacional'
              render={({ field }) => (
                <Form.Control type='number' placeholder='0' {...field} />
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Sitio de atención del parto</Form.Label>
            <Controller
              control={control}
              name='sitionAtencion'
              render={({ field }) => <Form.Control type='text' {...field} />}
            />
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Peso al nacer (Gramos)</Form.Label>
            <Controller
              control={control}
              name='pesoAlNacer'
              render={({ field }) => (
                <Form.Control placeholder='0.00' type='number' {...field} />
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Talla (Centímetros)</Form.Label>
            <Controller
              control={control}
              name='tallaCm'
              render={({ field }) => (
                <Form.Control placeholder='0.00' type='number' {...field} />
              )}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DatosGenerales;
