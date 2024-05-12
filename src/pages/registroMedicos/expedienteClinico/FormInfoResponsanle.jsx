/** @format */

import React, { Fragment, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import {
  useGetIdentityCardQuery,
  useGetRelationshipsQuery,
} from '../../../services/rtk-query';
import { useParams } from 'react-router-dom';

export default function FormInfoResponsanle({
  errors,
  control,
  setValue,
  getValues,
}) {
  const { id = null } = useParams();
  const { data, isSuccess, isError, isLoading } = useGetIdentityCardQuery();
  const {
    data: relationShips,
    isError: isRelationError,
    isLoading: isRelationLoading,
    isSuccess: isRelationSuccess,
  } = useGetRelationshipsQuery();
  const { activePatient } = useSelector((state) => state.informacionBasicaPaciente);

  useEffect(() => {
    if (activePatient) {
      setValue('responsable.tipoDocumento', {
        label: activePatient?.tipoDocumento.nombre,
        value: activePatient.tipoDocumento.id,
      });
      return;
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue('responsable.parentesco', {
        label: activePatient.parentesco.nombre,
        value: activePatient.parentesco.id,
      });
      return;
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue(
        'responsable.nombre',
        activePatient?.responsable ?? activePatient.nombreCompleto
      );
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue('responsable.telefono', activePatient?.telefonoPrincipal);
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue('responsable.numeroDocumento', activePatient?.dui);
    }
  }, [activePatient, setValue]);

  return (
    <Fragment>
      <Form as={'article'} className='px-4'>
        <Row>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label>Nombre Completo</Form.Label>
              <Controller
                name='responsable.nombre'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El nombre del responsable es requerido',
                  },
                }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    placeholder='Ingrese el nombre del responsable'
                    isInvalid={errors?.responsable?.nombre}
                    isValid={!errors?.responsable?.nombre && field.value}
                  />
                )}
              />
              {errors?.responsable?.nombre?.type === 'required' && (
                <Form.Text className='text-danger'>
                  {errors?.responsable?.nombre?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label>Telefono</Form.Label>
              <Controller
                name='responsable.telefono'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El telefono del responsable es requerido',
                  },
                }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    placeholder='Ingrese el telefono del responsable'
                    isInvalid={errors?.responsable?.telefono}
                    isValid={!errors?.responsable?.telefono && field.value}
                  />
                )}
              />
              {errors?.responsable?.telefono?.type === 'required' && (
                <Form.Text className='text-danger'>
                  {errors?.responsable?.telefono?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Parentesco con Paciente</Form.Label>
              <Controller
                name='responsable.parentesco'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El parentesco es requerido',
                  },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Seleccione un parentesco'
                    isClearable
                    isLoading={isRelationLoading}
                    options={
                      isRelationError
                        ? [{ label: 'Error al cargar Parentescos', value: -2 }]
                        : isRelationLoading
                        ? [{ label: 'cargando...', value: -2 }]
                        : isRelationSuccess &&
                          relationShips?.map((parentesco) => {
                            return {
                              label: parentesco.value,
                              value: parentesco.id,
                            };
                          })
                    }
                  />
                )}
              />
              {errors?.responsable?.parentesco?.type === 'required' && (
                <Form.Text className='text-danger'>
                  {errors?.responsable.parentesco?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Tipo de Documento</Form.Label>
              <Controller
                name='responsable.tipoDocumento'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El tipo de documento es requerido',
                  },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Seleccione un tipo de documento'
                    isLoading={isLoading}
                    options={
                      isError
                        ? [{ label: 'Error al cargar Documentos', value: -2 }]
                        : isLoading
                        ? [{ label: 'cargando...', value: -2 }]
                        : isSuccess &&
                          data?.map((documentos) => ({
                            label: documentos.value,
                            value: documentos.id,
                          }))
                    }
                    className={
                      errors?.responsisErrorable?.tipoDocumento && 'is-invalid'
                    }
                    isClearable
                  />
                )}
              />
              {errors?.responsable?.tipoDocumento?.type === 'required' && (
                <Form.Text className='text-danger'>
                  {errors?.responsable.tipoDocumento?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label>Numero de Documento</Form.Label>
              <Controller
                name='responsable.numeroDocumento'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El numero de documento es requerido',
                  },
                }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    placeholder='Ingrese el numero de documento'
                    isInvalid={errors?.responsable?.numeroDocumento}
                    isValid={!errors?.responsable?.numeroDocumento && field.value}
                  />
                )}
              />

              {errors.responsable?.numeroDocumento?.type && (
                <Form.Text className='text-danger'>
                  {errors.responsable?.numeroDocumento?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
}
