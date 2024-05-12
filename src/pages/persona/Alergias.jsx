import React, { Fragment, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import {
  useDiagnosticosQuery,
  useSeveritiesQuery,
} from '../../services/rtk-query/clinicalApi';
import { Loader } from '../../components/ui/Loader';
import { Controller } from 'react-hook-form';

const rules = {
  value: true,
  message: 'ampo obligatorio',
};
export default function Alergias({ control, setValue, errors }) {
  const [filter, setFilter] = useState('');
  const { isError, isLoading, data, isSuccess } = useSeveritiesQuery();
  const {
    isError: isErrorDiagnostico,
    isLoading: isLoadingDiagnostico,
    isSuccess: isSuccessDiagnostico,
    isFetching,
    data: diagnosticos,
  } = useDiagnosticosQuery(filter);
  return (
    <>
      <h3>Información General</h3>
      <Row>
        <Col md={6} sm={12} lg={3}>
          {' '}
          <Form.Check
            type='switch'
            id='diagnosticoPersonalizado'
            label='Enfermedad Personalizado'
          />
        </Col>
        <Col md={6} sm={12} lg={5} className='mb-3'>
          <Form.Group>
            <Form.Label>Enfermedad:</Form.Label>
            {isLoadingDiagnostico && <Loader />}
            {isErrorDiagnostico && (
              <Alert variant='danger'>
                Ocurrio un error al cargar las enfermedades
              </Alert>
            )}

            <Controller
              control={control}
              name='diagnostico'
              rules={rules}
              render={({ field }) => (
                <AsyncSelect
                  isClearable
                  {...field}
                  defaultOptions={
                    isSuccessDiagnostico
                      ? diagnosticos?.map((diagnostico) => ({
                          label: diagnostico?.nombres,
                          value: diagnostico?.id,
                        }))
                      : !isFetching &&
                        diagnosticos?.map((diagnostico) => ({
                          label: diagnostico?.nombres,
                          value: diagnostico?.id,
                        }))
                  }
                  loadOptions={(inputValue) => {
                    setFilter(inputValue);
                  }}
                  noOptionsMessage={() => {
                    return !isFetching && diagnosticos && diagnosticos.length === 0
                      ? 'No hay opciones disponibles'
                      : 'Cargando...';
                  }}
                />
              )}
            />
            {errors?.diagnostico && (
              <Form.Text className='text-danger'>
                {errors?.diagnostico?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12} lg={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Estado Enfermedad:</Form.Label>
            <Controller
              control={control}
              name='estadoEnfermedad'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Escriba la enfermedad'
                />
              )}
            />

            {errors?.estadoEnfermedad && (
              <Form.Text className='text-danger'>
                {errors?.estadoEnfermedad?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12} lg={3} className='mb-3'>
          <div>
            <Form.Group
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <Controller
                control={control}
                name='enfermedadActiva'
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type='switch'
                    id='enfermedadActiva'
                    label='Enfermedad Activa'
                  />
                )}
              />
              <Controller
                control={control}
                name='enfermedadInfacciosa'
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type='switch'
                    id='enfermedadInfacciosa'
                    label='Enfermedad Infecciosa'
                  />
                )}
              />

              <Controller
                control={control}
                name='curada'
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type='switch'
                    id='curada'
                    label='Curada?'
                  />
                )}
              />
            </Form.Group>
          </div>
        </Col>
        <Col md={6} sm={12} lg={5} className='mb-3'>
          <Form.Group>
            {isError && <Alert variant='danger'>Ocurrio un error al cargar</Alert>}
            {isLoading && <Loader />}
            <Form.Label> Severidad:</Form.Label>
            <Controller
              control={control}
              name='severidad'
              rules={rules}
              render={({ field }) => (
                <Select
                  isClearable
                  {...field}
                  options={
                    isSuccess &&
                    data?.map((severity) => ({
                      label: severity?.nombre,
                      value: severity?.id,
                    }))
                  }
                />
              )}
            />

            {errors?.severidad && (
              <Form.Text className='text-danger'>
                {errors?.severidad?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12} lg={4} className='mb-3'>
          <Form.Group>
            <Form.Label> Fecha Diagnóstico: </Form.Label>
            <Controller
              control={control}
              name='fechaDiagnostico'
              rules={rules}
              render={({ field }) => (
                <Form.Control type='date' placeholder='2024-03-11' {...field} />
              )}
            />
            {errors?.fechaDiagnostico && (
              <Form.Text className='text-danger'>
                {errors?.fechaDiagnostico?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12} lg={4} className='mb-3'>
          <Form.Group>
            <Form.Label>Edad al momento del diagnóstico: </Form.Label>
            <Controller
              control={control}
              name='edadAlMomentodelDiagnostico'
              rules={rules}
              render={({ field }) => (
                <Form.Control type='number' placeholder='0' {...field} />
              )}
            />
            {errors?.edadAlMomentodelDiagnostico && (
              <Form.Text className='text-danger'>
                {errors?.edadAlMomentodelDiagnostico?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
