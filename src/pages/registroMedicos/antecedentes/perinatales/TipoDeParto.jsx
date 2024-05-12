/* eslint-disable eqeqeq */
/** @format */

import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPerinatalDeliveryType } from '../../../../store/slices/antecedentes';
import { mapToLoadPerinatales } from './utils';

const TipoParto = () => {
  const dispatch = useDispatch();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      tipoParto: 'true',
      respiroLloroAlNacer: 'true',
    },
  });
  const { perinatales } = useSelector((state) => state.antecedente);
  const {
    queries: { [`getPregnancyHistoryForFile(${1})`]: pregnancyHistory },
  } = useSelector((state) => state.clinicalApi);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (pregnancyHistory?.data?.length) {
      const { respiroLloroAlNacer, tipoParto } = mapToLoadPerinatales(
        pregnancyHistory?.data[0]
      );
      setValue('respiroLloroAlNacer', respiroLloroAlNacer);
      setValue('tipoParto', tipoParto);
    }
  }, [pregnancyHistory?.data, setValue]);

  useEffect(() => {
    if (perinatales?.tipoParto && perinatales?.respiroLloroAlNacer) {
      setValue('respiroLloroAlNacer', perinatales.respiroLloroAlNacer);
      setValue('tipoParto', perinatales.tipoParto);
      setisLoading(true);
    }
  }, [perinatales, setValue]);

  useEffect(() => {
    if (
      !isLoading &&
      perinatales?.tipoParto !== undefined &&
      perinatales?.respiroLloroAlNacer !== undefined
    ) {
      setValue('respiroLloroAlNacer', perinatales.respiroLloroAlNacer);
      setValue('tipoParto', perinatales.tipoParto);
      setisLoading(true);
    }
  }, [isLoading, perinatales, setValue]);

  useEffect(() => {
    dispatch(setPerinatalDeliveryType(watch()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, watch()]);

  return (
    <>
      <Row className='mt-3 mb-4'>
        <Col xs={12}>
          <Form.Group>
            <Form.Label className='fw-bold'>Tipo de Parto</Form.Label>
            <div className='d-flex'>
              <Controller
                control={control}
                name='tipoParto'
                render={({ field }) => (
                  <>
                    <Form.Check
                      {...field}
                      type='radio'
                      id='radioTipoPartoNormal'
                      label='Parto Normal'
                      value={'true'}
                      checked={perinatales.tipoParto === 'true'}
                      inline
                    />
                    <Form.Check
                      {...field}
                      id='radioTipoPartoCesaria'
                      type='radio'
                      label='Cesaria'
                      value={'false'}
                      checked={perinatales.tipoParto === 'false'}
                      inline
                    />
                  </>
                )}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-5'>
        <Col xs={12}>
          <Form.Group>
            <Form.Label className='fw-bold'>
              Respiró y lloró el producto al nacer
            </Form.Label>
            <div className='d-flex'>
              <Controller
                control={control}
                name='respiroLloroAlNacer'
                render={({ field }) => (
                  <>
                    <Form.Check
                      {...field}
                      type='radio'
                      id='radio-yes'
                      label='SI'
                      value={'true'}
                      inline
                      checked={perinatales.respiroLloroAlNacer === 'true'}
                    />
                    <Form.Check
                      {...field}
                      type='radio'
                      id='radio-no'
                      label='NO'
                      value={'false'}
                      inline
                      checked={perinatales.respiroLloroAlNacer === 'false'}
                    />
                  </>
                )}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default TipoParto;
