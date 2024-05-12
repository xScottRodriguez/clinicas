/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPerimeterData } from '../../../../store/slices/antecedentes';
import { RxDimensions } from 'react-icons/rx';
const DatosPerimetros = () => {
  const dispatch = useDispatch();
  const { watch, control, setValue } = useForm({
    defaultValues: {
      cefalico: '',
      toracico: '',
      abdominal: '',
    },
  });

  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const { datosPerimetro } = perinatales;
    if (datosPerimetro) {
      setValue('cefalico', datosPerimetro.cefalico);
      setValue('toracico', datosPerimetro.toracico);
      setValue('abdominal', datosPerimetro.abdominal);
    }
  }, [perinatales, setValue]);

  useEffect(() => {
    if (!isLoading && perinatales?.datosPerimetro) {
      setValue('cefalico', perinatales.datosPerimetro.cefalico);
      setValue('toracico', perinatales.datosPerimetro.toracico);
      setValue('abdominal', perinatales.datosPerimetro.abdominal);
      setisLoading(true);
    }
  }, [isLoading, perinatales.datosPerimetro, setValue]);

  useEffect(() => {
    dispatch(setPerimeterData(watch()));
  }, [dispatch, watch()]);

  return (
    <>
      <h4 className='mb-3'>
        <RxDimensions size={30} className='mx-1' />
        Datos Perímetro
        <span className='text-muted small fw-normal'>(CM)</span>
      </h4>
      <Row className='mb-5'>
        <Col xs={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='perinatal_cephalic'>Cefálico</Form.Label>
            <Controller
              name='cefalico'
              control={control}
              render={({ field }) => <Form.Control type='number' {...field} />}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='perinatal_thoracic'>Torácico</Form.Label>
            <Controller
              name='toracico'
              control={control}
              render={({ field }) => <Form.Control type='number' {...field} />}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='perinatal_abdominal'>Abdominal</Form.Label>
            <Controller
              name='abdominal'
              control={control}
              render={({ field }) => <Form.Control type='number' {...field} />}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
export default DatosPerimetros;
