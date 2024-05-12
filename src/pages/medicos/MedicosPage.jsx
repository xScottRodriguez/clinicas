import React, { useEffect, useMemo, useState } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import { FiUserPlus } from 'react-icons/fi';
import { Container, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { TablePlugin } from '../../plugins/components/TablePlugin';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

import PhoneInput from 'react-phone-input-2';
import {
  useCrearMedicoMutation,
  useDepartamentosQuery,
  useEspecialidadesQuery,
  useGeneroQuery,
  useLazyMunicipioQuery,
  useMedicosQuery,
  usePaisesQuery,
  useSubEspecialidadesQuery,
  useUpdateMedicoMutation,
} from '../../services/rtk-query/clinicalApi';
import { toastAdapter } from '../../plugins/hot-toast.plugin';
import { Options } from './components/Options';

const rules = {
  required: {
    value: true,
    message: 'Campo Obligatorio',
  },
};

const actions = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};
export const MedicosPage = () => {
  const [skip, setSkip] = useState(true);
  const [action, setAction] = useState(actions.CREATE);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombres: '',
      apellidos: '',
      genero: null,
      direccion: '',
      localidad: '',
      pais: null,
      departamento: null,
      municipio: null,
      telefono: '',
      email: '',
      jvpm: '',
      especialidad: null,
      subEspecialidad: null,
      medicoId: null,
    },
  });

  const { data, isSuccess } = useGeneroQuery();

  const { data: paises, isSuccess: successCountry } = usePaisesQuery();
  const { data: departamento, isSuccess: successDepartamento } =
    useDepartamentosQuery(getValues('pais')?.value, {
      skip,
    });

  const [loadMunicipios, { isSuccess: successMunicipio, data: municipioData }] =
    useLazyMunicipioQuery();

  const { isSuccess: successEspecialidades, data: especialidades } =
    useEspecialidadesQuery();

  const { data: subEspecialidades, isSuccess: successSubEspecialidad } =
    useSubEspecialidadesQuery();

  const [crearMedico] = useCrearMedicoMutation();
  const [updateMedico] = useUpdateMedicoMutation();

  const { isFetching, data: medicos } = useMedicosQuery();

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    reset();
    setAction(actions.CREATE);
  };

  const columns = useMemo(
    () => [
      { header: 'Id', accessorKey: 'id' },
      {
        header: 'Nombres',
        accessorKey: 'nombres',
      },
      { header: 'Apellidos', accessorKey: 'apellidos' },
      { header: 'JVPM', accessorKey: 'jvpm' },
      { header: 'Telefono', accessorKey: 'telefono' },
      {
        header: 'Options',
        accessorKey: 'id',
        cell: ({ row: { original } }) => (
          <Options
            cell={original}
            setValue={setValue}
            handleClose={handleClose}
            handleShow={handleShow}
            setAction={setAction}
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (!watch('pais')) {
      return setSkip(true);
    } else {
      setSkip(false);
    }
    return () => setSkip(true);
  }, [watch('pais')]);

  useEffect(() => {
    if (!watch('departamento')) {
      setValue('municipio', null);
      return setDepartamentoSeleccionado(false);
    } else {
      loadMunicipios(getValues('departamento')?.value);
      setDepartamentoSeleccionado(true);
    }
    return () => setDepartamentoSeleccionado(false);
  }, [watch('departamento')]);

  const onSave = (data) => {
    const {
      genero: gender,
      pais,
      municipio,
      departamento: depa,
      especialidad,
      subEspecialidad,
      ...rest
    } = data;

    const genero = +gender?.value ?? +gender?.value ?? null;
    const paisId = pais?.value ?? null;
    const estadoId = depa?.value ?? null;
    const municipioId = municipio?.value ?? null;
    const especialidadId = especialidad?.value ?? null;
    const subEspecialidadId = subEspecialidad?.value ?? null;

    let payload = { ...rest, genero };
    if (paisId) payload.paisId = paisId;
    if (estadoId) payload.estadoId = estadoId;
    if (municipioId) payload.municipioId = municipioId;
    if (especialidadId) payload.especialidadId = especialidadId;
    if (subEspecialidadId) payload.subEspecialidadId = subEspecialidadId;

    if (action === actions.CREATE) {
      const { medicoId, ...rest } = payload;
      toastAdapter.promise({
        promise: crearMedico(rest).unwrap(),
        successMessage: () => {
          reset();
          setSkip(true);
          return 'Medico Creado';
        },
        errorMessage: 'ocurrio un erro al crear medico',
        loadingMessage: 'Creando medico...',
      });
    } else {
      toastAdapter.promise({
        promise: updateMedico(payload, data.medicoId).unwrap(),
        successMessage: () => {
          reset();
          setSkip(true);
          setAction(actions.CREATE);
          return 'Medico Actualizado';
        },
        errorMessage: 'ocurrio un erro al actualizar medico',
        loadingMessage: 'Actualizando medico...',
      });
    }
  };

  return (
    <LayoutForm title='Lista de Medicos'>
      <Card className='shadow-none'>
        <Card.Header>
          <div className='d-flex flex-row  justify-content-between'>
            <article>
              <p className='py-0 my-0'>Medicos</p>
              <small>Lista de Medicos</small>
            </article>
            <Button size='md' onClick={handleShow}>
              <FiUserPlus size={24} />
              <span className='ml-auto'>Crear Medico</span>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <TablePlugin columns={columns} data={medicos} isFetching={isFetching} />
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
        size='lg'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {action === actions.CREATE ? 'Nuevo' : 'Modificar'} Medico
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Nombres</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='nombres'
                    render={({ field }) => <Form.Control type='text' {...field} />}
                  />
                  {errors?.nombres && (
                    <Form.Text className='text-danger'>
                      {errors.nombres.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Apellidos</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='apellidos'
                    render={({ field }) => <Form.Control type='text' {...field} />}
                  />
                  {errors?.apellidos && (
                    <Form.Text className='text-danger'>
                      {errors.apellidos.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Genero</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='genero'
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        options={
                          isSuccess
                            ? data?.map((item) => ({
                                label: item.value,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                  {errors?.genero && (
                    <Form.Text className='text-danger'>
                      {errors.genero.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='email'
                    render={({ field }) => <Form.Control type='email' {...field} />}
                  />
                  {errors?.email && (
                    <Form.Text className='text-danger'>
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={8} className='mb-3'>
                <Form.Group>
                  <Form.Label>Direccion</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='direccion'
                    render={({ field }) => (
                      <Form.Control as='textarea' {...field} />
                    )}
                  />
                  {errors?.direccion && (
                    <Form.Text className='text-danger'>
                      {errors.direccion.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={4} className='mb-3'>
                <Form.Group>
                  <Form.Label>Localidad</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='localidad'
                    render={({ field }) => <Form.Control {...field} />}
                  />
                  {errors?.localidad && (
                    <Form.Text className='text-danger'>
                      {errors.localidad.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Pais</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='pais'
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        options={
                          successCountry
                            ? paises?.map((item) => ({
                                label: item.value,
                                codigo: item.codigo,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                  {errors?.pais && (
                    <Form.Text className='text-danger'>
                      {errors.pais.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Departamento</Form.Label>
                  <Controller
                    control={control}
                    name='departamento'
                    render={({ field }) => (
                      <Select
                        isDisabled={!!skip}
                        {...field}
                        isClearable
                        options={
                          successDepartamento
                            ? departamento?.map((item) => ({
                                label: item.value,
                                codigo: item.codigo,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Municipio</Form.Label>
                  <Controller
                    control={control}
                    name='municipio'
                    render={({ field }) => (
                      <Select
                        isDisabled={!departamentoSeleccionado}
                        {...field}
                        isClearable
                        options={
                          successMunicipio
                            ? municipioData?.map((item) => ({
                                label: item.value,
                                codigo: item.codigo,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className='mb-3'>
                <Form.Group>
                  <Form.Label>Telefono</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='telefono'
                    render={({ field }) => (
                      <PhoneInput
                        id='telefonoPrincipal'
                        country={'sv'}
                        enableSearch={true}
                        defaultCountry={'sv'}
                        {...field}
                      />
                    )}
                  />
                  {errors?.telefono && (
                    <Form.Text className='text-danger'>
                      {errors.telefono.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={4} className='mb-3'>
                <Form.Group>
                  <Form.Label>JVPM</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='jvpm'
                    render={({ field }) => <Form.Control type='text' {...field} />}
                  />
                  {errors?.jvpm && (
                    <Form.Text className='text-danger'>
                      {errors.jvpm.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={4} className='mb-3'>
                <Form.Group>
                  <Form.Label>Especialidad</Form.Label>
                  <Controller
                    rules={rules}
                    control={control}
                    name='especialidad'
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        options={
                          successEspecialidades
                            ? especialidades?.map((item) => ({
                                label: item.nombre,
                                codigo: item.codigo,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                </Form.Group>
                {errors?.especialidad && (
                  <Form.Text className='text-danger'>
                    {errors.especialidad.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={4} className='mb-3'>
                <Form.Group>
                  <Form.Label>Subespecialidad (opcional)</Form.Label>
                  <Controller
                    control={control}
                    name='subEspecialidad'
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        options={
                          successSubEspecialidad
                            ? subEspecialidades?.map((item) => ({
                                label: item.nombre,
                                codigo: item.codigo,
                                value: item.id,
                              }))
                            : []
                        }
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'No hay opciones'}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={handleSubmit(onSave)}>
            {action === actions.CREATE ? 'Guardar' : 'Actualizar'} Medico
          </Button>
        </Modal.Footer>
      </Modal>
    </LayoutForm>
  );
};
