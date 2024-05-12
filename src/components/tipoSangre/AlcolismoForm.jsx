/** @format */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

import { useGetAlcholismDataQuery } from '../../services/rtk-query/clinicalApi';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setAlcholismData } from '../../store/slices/antecedentes';
import { IndiceAlcoholismoMarconi } from './IndiceAlcoholismoMarconi';
import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../constants';

export const AlcolismoForm = ({ handleShowModal }) => {
  const {
    noPatologicos: { alcoholismo },
  } = useSelector((state) => state.antecedente);

  const [loading, setLoading] = useState(false);
  const { data, isError, isLoading, isSuccess } = useGetAlcholismDataQuery();
  const dispatch = useDispatch();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      alcholismCount: null,
    },
  });
  useEffect(() => {
    if (!loading && alcoholismo !== null) {
      setValue('alcholismCount', alcoholismo.alcoholCount);
      setLoading(true);
    }
  }, [loading, setValue, alcoholismo]);
  useEffect(() => {
    dispatch(setAlcholismData(watch('alcholismCount')));
  }, [dispatch, watch('alcholismCount')]);

  return (
    <Row className='mb-3'>
      <Col md={6} className='mb-3'>
        <h5>Indice de Alcoholismo</h5>
        <Form>
          <Form.Label>¿Cuantas veces ingiere alcohol?</Form.Label>
          <Controller
            name='alcholismCount'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Seleccione un indice de alcoholismo'
                onChange={(e) => {
                  onChange(e);
                }}
                value={value}
                options={
                  isError
                    ? [
                        {
                          label: 'Error al cargar los indices de alcoholismo',
                          value: -2,
                        },
                      ]
                    : isLoading
                    ? [{ label: 'cargando...', value: -2 }]
                    : isSuccess &&
                      data?.map((indiceAlcolismo) => ({
                        label: indiceAlcolismo.valor,
                        value: indiceAlcolismo.code,
                      }))
                }
                isClearable
              />
            )}
          />
        </Form>
        <h6 className='my-3' style={{ cursor: 'pointer' }}>
          Signos de Dependencia Alcohólica <BsInfoCircle />
        </h6>
      </Col>
      <Col md={6} className='mb-3'>
        <IndiceAlcoholismoMarconi />
      </Col>
      <Col md={12} onClick={handleShowModal}></Col>
      <Col md={12}>
        <FormDiagnostico
          sliceName={SLICES_NAMES.ANTECEDENTES}
          propertySliceName={ANTECEDENTES_VIEWS.NO_PATOLOGICOS}
        />
      </Col>
    </Row>
  );
};
AlcolismoForm.propTypes = {
  handleShowModal: PropTypes.func.isRequired,
};
