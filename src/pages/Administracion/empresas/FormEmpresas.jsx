import React, { Fragment, useState } from 'react';
import LayoutForm from '../../../containers/layouts/LayoutForm';
import { Link } from 'react-router-dom';
import BotonesFooter from '../../../components/botones/BotonesFooter';
import Select from 'react-select';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from 'react-bootstrap';
import {
  useDepartamentosQuery,
  usePaisesQuery,
} from '../../../services/rtk-query/clinicalApi';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { empresaSchema } from '../../../utils/form-scshemas';

export default function FormEmpresas() {
  const [skip, setSkip] = useState(false);
  const { data: paises, isSuccess, isLoading } = usePaisesQuery();

  const {
    data: departamentos,
    isSuccess: isDepartaments,
    isLoading: loadingDepartaments,
  } = useDepartamentosQuery({
    skip,
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(empresaSchema),
  });

  const hanleChangePais = (data) => {
    console.log({ data });
    setSkip(data === null);
    reset({ departamento: null, municipio: null });
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LayoutForm
      tools={
        <Link
          className='btn btn-sm btn-light text-primary'
          to={'/administracion/empresas'}
        >
          <i className='fa fa-arrow-left' />
          Regresar a la lista de empresas
        </Link>
      }
      title={'Administracion de Empresas'}
    >
      <Card className='card mb-4 shadow-none'>
        <CardHeader>
          <h5 className=''>Registro de Empresa</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Empresa</FormLabel>
                <Controller
                  control={control}
                  name='empresa'
                  render={({ field }) => (
                    <FormControl
                      type='text'
                      placeholder='Nombre de la empresa'
                      {...field}
                    />
                  )}
                />
                {errors?.empresa && (
                  <FormText className='text-danger'>
                    {errors?.empresa?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Sucursal:</FormLabel>
                <Controller
                  control={control}
                  name='sucursal'
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      closeMenuOnSelect={false}
                      placeholder='Sucursal'
                      id='sucursales'
                    />
                  )}
                />
                {errors?.sucursal && (
                  <FormText className='text-danger'>
                    {errors?.sucursal?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardHeader>
          <h5 className=''>Ubicacion de la Empresa</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Pais</FormLabel>
                <Controller
                  control={control}
                  name='pais'
                  render={({ field }) => (
                    <Select
                      onChange={(e) => {
                        console.log(e);
                        hanleChangePais(e);
                      }}
                      {...field}
                      isClearable
                      closeMenuOnSelect={true}
                      placeholder='Seleccione...'
                      options={paises?.map((pais) => ({
                        value: pais.id,
                        codigo: pais.codigo,
                        label: pais.value,
                      }))}
                    />
                  )}
                />
                {errors?.pais && (
                  <FormText className='text-danger'>
                    {errors?.pais?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Departamento</FormLabel>
                <Controller
                  control={control}
                  name='departamento'
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      closeMenuOnSelect={true}
                      placeholder='Seleccione...'
                      id='departamento'
                    />
                  )}
                />
                {errors?.departamento && (
                  <FormText className='text-danger'>
                    {errors?.departamento?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Municipio</FormLabel>
                <Controller
                  control={control}
                  name='municipio'
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      closeMenuOnSelect={true}
                      placeholder='Seleccione...'
                      id='municipio'
                    />
                  )}
                />
                {errors?.municipio && (
                  <FormText className='text-danger'>
                    {errors?.municipio?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardHeader>
          <h5 className=''>Datos Adicionales</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>NRC:</FormLabel>
                <FormControl type='text' placeholder='NRC' />
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>NIT:</FormLabel>
                <Controller
                  control={control}
                  name='nit'
                  render={({ field }) => (
                    <FormControl type='text' placeholder='NIT' {...field} />
                  )}
                />
                {errors?.nit && (
                  <FormText className='text-danger'>
                    {errors?.nit?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Razon Social:</FormLabel>
                <Controller
                  control={control}
                  name='razon'
                  render={({ field }) => (
                    <FormControl
                      type='text'
                      placeholder='razon social'
                      {...field}
                    />
                  )}
                />
                {errors?.razon && (
                  <FormText className='text-danger'>
                    {errors?.razon?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Actividad Economica:</FormLabel>
                <Controller
                  control={control}
                  name='actividadEconomica'
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      closeMenuOnSelect={true}
                      placeholder='Actividades Eco...'
                      id='economica'
                    />
                  )}
                />
                {errors?.actividadEconomica && (
                  <FormText className='text-danger'>
                    {errors?.actividadEconomica?.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col md={6} className='mb-2'>
              <FormGroup>
                <FormLabel>Agente Percepcion:</FormLabel>
                <Controller
                  control={control}
                  name='agentePercepcion'
                  render={({ field }) => <FormCheck type='switch' {...field} />}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <BotonesFooter
            ruta={'/administracion/empresas'}
            saveAction={handleSubmit(onSubmit)}
          />
        </CardFooter>
      </Card>
    </LayoutForm>
  );
}
