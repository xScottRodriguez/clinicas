/** @format */

import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetSmookingDataQuery } from '../../services/rtk-query/clinicalApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSmokerData } from '../../store/slices/antecedentes';

export const FormTabaquismo = () => {
  const {
    noPatologicos: { tabaquismo },
  } = useSelector((state) => state.antecedente);

  const [loading, setLoading] = useState(false);
  const { data, isError, isLoading, isSuccess } = useGetSmookingDataQuery();
  const dispatch = useDispatch();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      dailySigarrillosCount: 0,
      smokerYear: 0,
      fumablesCollection: null,
    },
  });

  useEffect(() => {
    if (!loading && tabaquismo !== undefined) {
      setValue('dailySigarrillosCount', tabaquismo.dailySigarrillosCount);
      setValue('smokerYear', tabaquismo.smokerYear);
      setValue('fumablesCollection', tabaquismo.fumablesCollection);
      setLoading(true);
    }
  }, [loading, setValue, tabaquismo]);

  useEffect(() => {
    dispatch(setSmokerData(watch()));
  }, [dispatch, watch()]);

  return (
    <Form as={'article'} className=''>
      <Row>
        <Col md={12}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Tipo de Tabáquismo</Form.Label>
            <Controller
              name='fumablesCollection'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder='Seleccione un tipo de tabaquismo'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value}
                  options={
                    isError
                      ? [
                          {
                            label: 'Error al cargar Coleccion de fumables',
                            value: -2,
                          },
                        ]
                      : isLoading
                      ? [{ label: 'cargando...', value: -2 }]
                      : isSuccess &&
                        data?.map((fumablesCollection) => ({
                          label: fumablesCollection.valor,
                          value: fumablesCollection.id,
                        }))
                  }
                  isClearable
                />
              )}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Cuantos cigarrillos diarios consume</Form.Label>
            <Controller
              name='dailySigarrillosCount'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control type='number' onChange={onChange} value={value} />
              )}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Años de fumador</Form.Label>
            <Controller
              name='smokerYear'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control type='number' onChange={onChange} value={value} />
              )}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};
