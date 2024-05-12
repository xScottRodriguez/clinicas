import React, { useState } from 'react';
import { Alert, Button, Col, Form, FormGroup, Row, Stack } from 'react-bootstrap';
import { PreEscripcion } from '../../../persona/components/PreEscripcion';
import { Controller, useForm } from 'react-hook-form';
import { Loader } from '../../../../components/ui/Loader';
import Select from 'react-select';
import {
  clinicalApi,
  useCreateDiagnosticoMutation,
  useSeveritiesQuery,
  useUpdateDiagnosticoMutation,
  useUpdatePrescriptionsMutation,
} from '../../../../services/rtk-query';
import MyAsyncSelect from './MyAsyncSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { useParams } from 'react-router-dom';
import { clearInfo } from '../../../../store/slices/uiSlice';
import { format } from 'date-fns';
import { PROVIDES_AND_INVALIDATE_TAGS } from '../../../../constants';

const rules = {
  required: {
    value: true,
    message: 'campo obligatorio',
  },
};
export const DetalleConsulta = () => {
  const { id = 0 } = useParams();
  const [isClearContent, setIsClearContent] = useState(false);
  const [updateDiagnostico] = useUpdateDiagnosticoMutation();
  const [createDiagnostico] = useCreateDiagnosticoMutation();

  const [updatePrescripcion] = useUpdatePrescriptionsMutation();
  const { prescripcion, detallesDeConsulta } = useSelector((state) => state.ui);
  const [customDisease, setCustomDisease] = useState(false);
  const { isError, isLoading, data, isSuccess } = useSeveritiesQuery();
  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,

    control,
    setValue,
    setError,
    getValues,
  } = useForm({
    defaultValues: {
      prescripcion: {
        observations: '',
        recipes: '',
        studios: '',
      },
      consulta: {
        enfermedadPersonalizada: false,
        enfermedad: '',
        estadoEnfermedad: '',
        enfermedadActiva: false,
        enfermedadInfacciosa: false,
        curada: false,
        severidad: '',
        fechaDiagnostico: '',
        edadAlMomentodelDiagnostico: '',
        contraidoSemanaEmbarazo: '',
        advertenciaEmbarazo: false,
        actualmenteEnTratamiento: false,
        diagnostico: '',
        diagnosticoId: null,
      },
    },
  });

  useEffect(() => {
    setValue('prescripcion.observations', prescripcion?.observaciones);
    setValue('prescripcion.studios', prescripcion?.estudios);
    setValue('prescripcion.recipes', prescripcion?.recetas);

    // CONSULTA DETALLE

    const fechaHora = detallesDeConsulta?.fechaInicio
      ? new Date(detallesDeConsulta?.fechaInicio)
      : null;
    setValue(
      'consulta.fechaDiagnostico',
      !fechaHora ? '' : format(fechaHora, 'yyyy-MM-dd')
    );
    setValue('consulta.estadoEnfermedad', detallesDeConsulta?.estadoEnfermedad);
    setValue('consulta.enfermedadActiva', detallesDeConsulta?.enfermedadActiva);
    setValue(
      'consulta.enfermedadInfacciosa',
      detallesDeConsulta?.enfermedadInfecciosa ?? false
    );
    setValue(
      'consulta.actualmenteEnTratamiento',
      detallesDeConsulta?.actualmenteTratamiento
    );
    setValue(
      'consulta.advertenciaEmbarazo',
      detallesDeConsulta?.advertenciaEmbarazo
    );

    setValue(
      'consulta.contraidoSemanaEmbarazo',
      detallesDeConsulta?.contraidoSemanaEmbarazo
    );

    setValue('consulta.curada', detallesDeConsulta?.curada);

    setValue(
      'consulta.edadAlMomentodelDiagnostico',
      detallesDeConsulta?.edadEnfermedadDiagnostico
    );
    if (detallesDeConsulta?.diagnosticoId) {
      setValue('consulta.diagnostico', {
        label: detallesDeConsulta?.diagnostico,
        value: detallesDeConsulta?.diagnosticoId,
      });
    } else {
      setCustomDisease(!customDisease);
      setValue('consulta.diagnostico', detallesDeConsulta?.diagnostico);
    }

    setValue(
      'consulta.severidad',
      data
        ?.map((severity) => ({ label: severity.nombre, value: severity.id }))
        .find((severity) => severity.value === detallesDeConsulta?.severidadId)
    );
  }, []);

  const onSubmit = ({ consulta: consu, prescripcion: pres }) => {
    const severidadId = consu?.severidad?.value;
    let diagnosticoId = null;
    if (consu?.diagnostico?.label) {
      diagnosticoId = consu?.diagnostico?.value;
    }

    const payloadPrescripcion = {
      idExpediente: +id,
      observaciones: pres.observations,
      recetas: pres.recipes,
      estudios: pres.studios,
    };

    const payloadDiagnostico = {
      consultaId: +prescripcion?.id ?? null,
      diagnosticoId,
      diagnostico: consu.diagnostico?.label ?? consu.diagnostico,
      severidad: +severidadId,
      enfermedadActiva: consu.enfermedadActiva,
      enfermedadInfecciosa: consu.enfermedadInfacciosa,
      fechaDiagnostico: consu.fechaDiagnostico,
      edadDiagnostico: consu?.edadAlMomentodelDiagnostico,
      curada: consu?.curada,
      enfermedadAlergia: '',
      advertenciaEmbarazo: consu?.advertenciaEmbarazo,
      enTratamiento: consu.actualmenteEnTratamiento,
      contraidoSemanaEmbarazo: consu.contraidoSemanaEmbarazo,
      estadoEnfermedad: consu.estadoEnfermedad,
    };
    toastAdapter.promise({
      promise: updatePrescripcion({
        id: prescripcion.id,
        body: payloadPrescripcion,
      }).unwrap(),
      loadingMessage: 'Actualizando...',
      successMessage: () => {
        saveDiagnostico(payloadDiagnostico, detallesDeConsulta?.id);

        return 'Prescripcion actualizada...';
      },
      errorMessage: (err) => {
        return ' Ocurrio un error al intentar actualizar';
      },
    });
  };
  const saveDiagnostico = (data, id) => {
    if (!id) {
      return toastAdapter.promise({
        promise: createDiagnostico(data).unwrap(),
        errorMessage: 'Error al intentar guardar el diagnostico',
        successMessage: () => {
          dispatch(clearInfo());
          reset();
          setIsClearContent(!isClearContent);
          clinicalApi.util.invalidateTags(PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS);
          return 'Regitro actualizado';
        },
        loadingMessage: 'cargando....',
      });
    } else {
      toastAdapter.promise({
        promise: updateDiagnostico({ body: data, id }).unwrap(),
        errorMessage: 'Error al intentar guardar el diagnostico',
        successMessage: () => {
          dispatch(clearInfo());
          reset();
          setIsClearContent(!isClearContent);
          return 'Regitro actualizado';
        },
        loadingMessage: 'cargando....',
      });
    }
  };

  return (
    <Row>
      <Col md={6}>
        <Stack>
          <h3>Prescripcion</h3>
          <hr />
          <PreEscripcion
            getValues={getValues}
            clearErrors={clearErrors}
            setValue={setValue}
            control={control}
            setError={setError}
            errors={errors}
            rules={rules}
            clearContent={isClearContent}
          />
        </Stack>
      </Col>
      <Col md={6}>
        <Stack>
          <h3>Diagnostico</h3>
          <hr />
          <Row>
            <Col md={6} sm={12} lg={12}>
              {' '}
              <Form.Check
                type='switch'
                id='diagnosticoPersonalizado'
                label='Enfermedad Personalizada'
                onChange={(e) => {
                  setCustomDisease(!customDisease);
                }}
                checked={customDisease}
              />
            </Col>
            <Col md={6} sm={12} lg={12} className='mb-3'>
              <Form.Group>
                <Form.Label>Enfermedad:</Form.Label>

                <Controller
                  control={control}
                  name='consulta.diagnostico'
                  rules={rules}
                  render={({ field }) => {
                    if (!customDisease) return <MyAsyncSelect {...field} />;

                    return (
                      <Form.Control
                        type='text'
                        placeholder='Escriba la enfermedad personalizada'
                        {...field}
                      />
                    );
                  }}
                />
                {errors?.diagnostico && (
                  <Form.Text className='text-danger'>
                    {errors?.diagnostico?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12} lg={12} className='mb-3'>
              <Form.Group>
                <Form.Label>Estado Enfermedad:</Form.Label>
                <Controller
                  control={control}
                  name='consulta.estadoEnfermedad'
                  rules={rules}
                  render={({ field }) => (
                    <Form.Control
                      type='text'
                      placeholder='Escriba el estado de la enfermedad'
                      {...field}
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
            <Col md={6} sm={12} lg={12} className='mb-3'>
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
                    name='consulta.enfermedadActiva'
                    render={({ field }) => (
                      <Form.Check
                        {...field}
                        type='switch'
                        id='enfermedadActiva'
                        label='Enfermedad Activa'
                        checked={field.value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name='consulta.enfermedadInfacciosa'
                    render={({ field }) => (
                      <Form.Check
                        {...field}
                        type='switch'
                        id='enfermedadInfacciosa'
                        checked={field.value}
                        label='Enfermedad Infecciosa'
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='consulta.curada'
                    render={({ field }) => (
                      <Form.Check
                        {...field}
                        type='switch'
                        id='curada'
                        checked={field.value}
                        label='Curada?'
                      />
                    )}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col md={6} sm={12} lg={12} className='mb-3'>
              <Form.Group>
                {isError && (
                  <Alert variant='danger'>Ocurrio un error al cargar</Alert>
                )}
                {isLoading && <Loader />}
                <Form.Label> Severidad:</Form.Label>
                <Controller
                  control={control}
                  name='consulta.severidad'
                  rules={{
                    required: {
                      value: true,
                      message: 'campo obligatorio',
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      isClearable
                      {...field}
                      options={
                        isSuccess &&
                        data?.map((severity) => ({
                          value: severity.id,
                          label: severity.nombre,
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
            <Col md={6} sm={12} lg={12} className='mb-3'>
              <Form.Group>
                <Form.Label> Fecha Diagnóstico: </Form.Label>
                <Controller
                  control={control}
                  name='consulta.fechaDiagnostico'
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
            <Col md={6} sm={12} lg={12} className='mb-3'>
              <Form.Group>
                <Form.Label>Edad al momento del diagnóstico: </Form.Label>
                <Controller
                  control={control}
                  name='consulta.edadAlMomentodelDiagnostico'
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
            <Col md={6} lg={12} className='mb-3'>
              <FormGroup>
                <Form.Label>Contraido en semana de embarazo numero?</Form.Label>
                <Controller
                  control={control}
                  name='consulta.contraidoSemanaEmbarazo'
                  rules={rules}
                  render={({ field }) => (
                    <Form.Control type='numero' placeholder='0' {...field} />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={6} lg={12} className='mb-3'>
              <FormGroup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <Controller
                  control={control}
                  name='consulta.advertenciaEmbarazo'
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      type='switch'
                      id='advertenciaEmbarazo'
                      label='Advertencia durante el embarazo'
                      checked={field.value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='consulta.actualmenteEnTratamiento'
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      type='switch'
                      size={20}
                      id='actualmenteEnTratamiento'
                      label='Actualmente en tratamiento'
                      checked={field.value}
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>
        </Stack>
      </Col>
      <Col md={12}>
        <div className='d-grid gap-2'>
          <Button size='lg' variant='primary' onClick={handleSubmit(onSubmit)}>
            Actualizar
          </Button>
        </div>
      </Col>
    </Row>
  );
};
