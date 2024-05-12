/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Alert, Container, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

import {
  clearActivePatient,
  setActivePatient,
  toggleDisableTabs,
} from '../../../store/slices/expedienteSlice';
import {
  useGetFolderByIdQuery,
  useGetFolderPeoplesQuery,
} from '../../../services/rtk-query';
import { useParams } from 'react-router-dom';

export default function FormInfoPaciente({ control, setValue, errors, getValues }) {
  const { id = null } = useParams();
  const { data: folderIdData, isSuccess: isFolderIdSuccess } =
    useGetFolderByIdQuery(id);
  const { data, isLoading, isSuccess, isError } = useGetFolderPeoplesQuery('');
  const { activePatient } = useSelector((state) => state.informacionBasicaPaciente);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFolderIdSuccess && isSuccess) {
      if (!folderIdData.length) return null;
      const [info] = folderIdData;
      dispatch(toggleDisableTabs(info.id));
      return dispatch(setActivePatient(info));
    }
  });

  useEffect(() => {
    if (activePatient) {
      setValue('paciente', {
        label: activePatient.nombre,
        value: activePatient.id,
      });
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue('profesion', activePatient.profesion);
    }
  }, [activePatient, setValue]);

  useEffect(() => {
    if (activePatient) {
      setValue('descripcion', activePatient.descripcion);
    }
  }, [activePatient, setValue]);

  const onSelectPatient = (e) => {
    if (!e) {
      dispatch(clearActivePatient());
      return;
    }
    const patient = data?.find((patient) => patient?.id === e?.value);
    if (!patient) {
      dispatch(toggleDisableTabs());
      dispatch(clearActivePatient());
      return;
    }

    dispatch(setActivePatient(patient));
    return;
  };

  return (
    <Container fluid>
      {isError && (
        <Alert variant='danger'>
          <p>Ocurrio un error al cargar la informacion</p>
        </Alert>
      )}
      <article className='row my-3'>
        <Form
          as={'div'}
          className='col-md-12 my-3'
          validated={errors?.paciente?.type === 'required'}
        >
          <Form.Label>Paciente</Form.Label>
          <Controller
            name='paciente'
            control={control}
            rules={{
              required: { value: true, message: 'Paciente Obligatorio' },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                placeholder='Seleccione un Paciente'
                onChange={(e) => {
                  onChange(e);
                  onSelectPatient(e);
                }}
                isDisabled={!!id}
                value={value}
                isOption={(option) => {
                  return option.value === -2;
                }}
                options={
                  isError
                    ? [{ label: 'Error al cargar pacientes', value: -2 }]
                    : isLoading
                    ? [{ label: 'cargando...', value: -2 }]
                    : isSuccess &&
                      data?.map((patient) => ({
                        label: patient.nombre,
                        value: patient.id,
                      }))
                }
                isClearable
              />
            )}
          />
          {errors?.paciente?.type === 'required' && (
            <Form.Text className='text-danger'>
              {errors?.paciente?.message}
            </Form.Text>
          )}
        </Form>
        <div className='col-md-6 my-3'>
          <Form className=''>
            <Form.Label>Ocupacion / Profesion</Form.Label>
            <Controller
              name='profesion'
              control={control}
              rules={{
                required: { value: true, message: 'Profesion Obligatorio' },
              }}
              render={({ field }) => <Form.Control {...field} disabled readOnly />}
            />
            {errors?.profesion?.type === 'required' && (
              <Form.Text className='text-danger'>
                {errors?.profesion?.message}
              </Form.Text>
            )}
          </Form>
        </div>
        <div className='col-md-6 my-3' validated>
          <Form className='' noValidate={errors?.descripcion?.type === 'minLength'}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Descripcion (opcional)</Form.Label>
              <Controller
                name='descripcion'
                rules={{
                  minLength: {
                    value: 10,
                    message: 'La descripcion debe tener al menos 10 caracteres',
                  },
                }}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    as='textarea'
                    {...field}
                    isInvalid={errors?.descripcion?.type === 'minLength'}
                    isValid={getValues('descripcion').length > 10}
                  />
                )}
              />

              {errors?.descripcion?.type === 'minLength' && (
                <Form.Text className='text-danger'>
                  {errors?.descripcion?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </div>
      </article>
    </Container>
  );
}
