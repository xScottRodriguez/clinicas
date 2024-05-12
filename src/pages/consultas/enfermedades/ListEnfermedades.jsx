/** @format */

import React, { Fragment, useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import BtnModal from '../../../components/botones/BtnModal';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, Col, Form, FormGroup, Row, Badge } from 'react-bootstrap';
import { Loader } from '../../../components/ui/Loader';
import {
  useConsultaDiagnosticosQuery,
  useCreateDiagnosticoMutation,
  useDiagnosticosQuery,
  useSeveritiesQuery,
  useUpdateDiagnosticoMutation,
} from '../../../services/rtk-query/clinicalApi';
import Select from 'react-select';
import { clearDiagnosticoActivo, toggleModal } from '../../../store/slices/uiSlice';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';
import { useParams, useNavigate } from 'react-router-dom';
import { NestedConsultasDetails } from '../NestedConsultasDetails';
import { TablePlugin } from '../../../plugins/components/TablePlugin';
import { OptionsEnfermedades } from './components/OptionsEnfermedades';
import { format } from 'date-fns';
import { AsyncSelectCreate } from '../../../components/selects/AsyncSelectCreate';

const columns = [
  {
    header: 'Id',
    accessorKey: 'id',
  },
  {
    header: 'Diagnóstico',
    accessorKey: 'diagnostico',
  },
  {
    header: 'Fecha de Inicio',
    accessorKey: 'fechaInicio',
    cell: ({ row: { original } }) => (
      <p>{original.fechaInicio?.split('T').shift()}</p>
    ),
  },
  {
    header: 'Edad en el Diagnóstico de la Enfermedad',
    accessorKey: 'edadEnfermedadDiagnostico',
  },
  {
    header: 'Severidad',
    accessorKey: 'severidades.nombre',
    cell: ({ row: { original } }) => (
      <Badge
        bg={
          original.severidades.nombre === 'Severa'
            ? 'danger'
            : original.severidades.nombre === 'Leve'
            ? 'secondary'
            : 'primary'
        }
      >
        {original.severidades.nombre}
      </Badge>
    ),
  },
  {
    header: 'Actualmente en Tratamiento',
    accessorKey: 'actualmenteTratamiento',
    cell: ({ row: { original } }) => (
      <Badge bg={original.actualmenteTratamiento ? 'primary' : 'secondary'}>
        {original.actualmenteTratamiento ? 'SI' : 'NO'}
      </Badge>
    ),
  },
  {
    header: 'Opciones',
    accessorkey: 'id',
    cell: ({ row: { original } }) => <OptionsEnfermedades cell={original.id} />,
  },
];

const rules = {
  required: {
    value: true,
    message: 'Campo obligatorio',
  },
};
export default function ListEnfermedades() {
  const navigator = useNavigate();
  const { id = null } = useParams();
  const [filtering, setFiltering] = useState('');
  const { consultaId, diagnosticoActivo } = useSelector((state) => state.ui);
  const { data: consultas, isFetching } = useConsultaDiagnosticosQuery(consultaId);
  const [updateDiagnostico] = useUpdateDiagnosticoMutation();
  const [createDiagnostico] = useCreateDiagnosticoMutation();
  const [customDisease, setCustomDisease] = useState(false);
  const { isError, isLoading, data, isSuccess } = useSeveritiesQuery();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const {
    data: enfermedades,
    isSuccess: okEnfermedades,
    isFetching: fetchingEnfermedades,
  } = useDiagnosticosQuery(filter);
  const createOption = (label) => {
    return {
      label,
      value: label,
      id: label,
    };
  };

  const filterFn = (inputValue) => {
    return enfermedades
      ?.filter((i) => {
        return i?.nombres?.toLowerCase().includes(inputValue?.toLowerCase());
      })
      .map((item) => ({
        value: item.id,
        label: item.nombres,
        ...item,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    setFilter(inputValue);
    if (okEnfermedades) {
      callback(filterFn(inputValue));
    }
  };
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      diagnostico: '',
      estadoEnfermedad: '',
      enfermedadActiva: false,
      enfermedadInfecciosa: false,
      curada: false,
      severidad: '',
      fechaDiagnostico: '',
      edadAlMomentodelDiagnostico: '',
      enfermedad: '',
      contraidoSemanaEmbarazo: '',
      advertenciaEmbarazo: false,
      actualmenteEnTratamiento: false,
      diagnosticoId: null,
    },
  });

  useEffect(() => {
    if (!consultaId && id) return navigator(`/expedientes-medicos/${id}`);
    return;
  }, [consultaId, id, navigator]);

  useEffect(() => {
    if (diagnosticoActivo) {
      const fechaHora = diagnosticoActivo?.fechaInicio
        ? new Date(diagnosticoActivo?.fechaInicio)
        : null;
      setValue(
        'fechaDiagnostico',
        !fechaHora ? '' : format(fechaHora, 'yyyy-MM-dd')
      );
      setValue('estadoEnfermedad', diagnosticoActivo?.estadoEnfermedad);
      setValue('enfermedadActiva', diagnosticoActivo?.enfermedadActiva);
      setValue(
        'enfermedadInfacciosa',
        diagnosticoActivo?.enfermedadInfecciosa ?? false
      );
      setValue(
        'actualmenteEnTratamiento',
        diagnosticoActivo?.actualmenteTratamiento
      );
      setValue('advertenciaEmbarazo', diagnosticoActivo?.advertenciaEmbarazo);

      setValue(
        'contraidoSemanaEmbarazo',
        diagnosticoActivo?.contraidoSemanaEmbarazo
      );

      setValue('curada', diagnosticoActivo?.curada);

      setValue(
        'edadAlMomentodelDiagnostico',
        diagnosticoActivo?.edadEnfermedadDiagnostico
      );
      if (diagnosticoActivo?.diagnosticoId) {
        setValue('diagnostico', {
          label: diagnosticoActivo?.diagnostico,
          value: diagnosticoActivo?.diagnosticoId,
        });
      } else {
        setValue('diagnostico', createOption(diagnosticoActivo?.diagnostico));
      }

      setValue(
        'severidad',
        data
          ?.map((severity) => ({ label: severity.nombre, value: severity.id }))
          .find((severity) => severity.value === diagnosticoActivo?.severidadId)
      );
    }
  }, [diagnosticoActivo]);

  const onSaveDiagnostico = (data) => {
    const {
      diagnostico,
      estadoEnfermedad,
      enfermedadActiva,
      enfermedadInfecciosa,
      curada,
      severidad,
      fechaDiagnostico,
      edadAlMomentodelDiagnostico,
      enfermedad,
      contraidoSemanaEmbarazo,
      advertenciaEmbarazo,
      actualmenteEnTratamiento,
      diagnosticoId,
    } = data;
    const diagnostic = diagnostico?.label ? diagnostico?.label : diagnostico;

    const payload = {
      consultaId: consultaId,
      diagnosticoId,
      diagnostico: diagnostic,
      severidad: severidad?.value,
      enfermedadActiva,
      enfermedadInfecciosa,
      fechaDiagnostico,
      edadDiagnostico: edadAlMomentodelDiagnostico,
      curada,
      enfermedadAlergia: enfermedad,
      advertenciaEmbarazo,
      enTratamiento: actualmenteEnTratamiento,
      contraidoSemanaEmbarazo,
      estadoEnfermedad,
    };

    toastAdapter.promise({
      promise: createDiagnostico(payload).unwrap(),
      successMessage: () => {
        dispatch(toggleModal());
        reset();
        return 'diagnostico creado exitosamente';
      },
      errorMessage: 'Error al intentar guardar el diagnostico',
    });
  };
  const onUpdateDiagnostico = (data) => {
    const {
      diagnostico,
      estadoEnfermedad,
      enfermedadActiva,
      enfermedadInfecciosa,
      curada,
      severidad,
      fechaDiagnostico,
      edadAlMomentodelDiagnostico,
      enfermedad,
      contraidoSemanaEmbarazo,
      advertenciaEmbarazo,
      actualmenteEnTratamiento,
      diagnosticoId,
    } = data;
    const diagnostic = diagnostico?.label ? diagnostico?.label : diagnostico;

    const payload = {
      consultaId: consultaId,
      diagnosticoId,
      diagnostico: diagnostic,
      severidad: severidad?.value,
      enfermedadActiva,
      enfermedadInfecciosa,
      fechaDiagnostico,
      edadDiagnostico: edadAlMomentodelDiagnostico,
      curada,
      enfermedadAlergia: enfermedad,
      advertenciaEmbarazo,
      enTratamiento: actualmenteEnTratamiento,
      contraidoSemanaEmbarazo,
      estadoEnfermedad,
    };

    toastAdapter.promise({
      promise: updateDiagnostico({
        body: payload,
        id: diagnosticoActivo.id,
      }).unwrap(),
      loadingMessage: 'actualizando...',
      successMessage: () => {
        dispatch(toggleModal());
        reset();
        setCustomDisease(false);
        return 'diagnostico actualizado';
      },
      errorMessage: 'Error al intentar actualizar el diagnostico',
    });
  };

  return (
    <Fragment>
      <div className='card mb-4 shadow-none'>
        <div className='card-title p-2'>
          <h3>Listado de Enfermedades </h3>
        </div>
        <div className='card-body'>
          <BtnModal
            agregar={() => {
              dispatch(clearDiagnosticoActivo());
              dispatch(toggleModal());
            }}
            nombre='Crear Diagnóstico'
          />
          <TablePlugin
            columns={columns}
            data={consultas}
            filtering={filtering}
            onFilteringChange={(data) => setFiltering(data)}
            isFetching={isFetching}
            isInternalFiltering={false}
          />
        </div>
      </div>
      <NestedConsultasDetails
        title={'DETALLE DE ENFERMEDADES'}
        ButtonComponent={() => {
          if (!diagnosticoActivo) {
            return (
              <Button
                className='w-25'
                size='lg'
                onClick={handleSubmit(onSaveDiagnostico)}
              >
                Guardar Diagnostico
              </Button>
            );
          } else {
            return (
              <Button
                className='w-25'
                size='lg'
                onClick={handleSubmit(onUpdateDiagnostico)}
              >
                Actualizar Diagnostico
              </Button>
            );
          }
        }}
        resetFunction={() => {
          setCustomDisease(false);
          dispatch(clearDiagnosticoActivo());
          reset();
        }}
      >
        <Row>
          <Col md={6} sm={12} lg={12} className='mb-3'>
            <Form.Group>
              <Form.Label>Enfermedad:</Form.Label>

              <Controller
                control={control}
                name='diagnostico'
                rules={rules}
                render={({ field }) => (
                  <AsyncSelectCreate
                    {...field}
                    loadOptions={loadOptions}
                    isLoading={fetchingEnfermedades}
                    placeholder='Seleccione una enfermedad o cree una nueva'
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
          <Col md={6} sm={12} lg={12} className='mb-3'>
            <Form.Group>
              <Form.Label>Estado Enfermedad:</Form.Label>
              <Controller
                control={control}
                name='estadoEnfermedad'
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
                  name='enfermedadActiva'
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      type='switch'
                      id='enfermedadActiva'
                      label='Enfermedad Activa (opcional)'
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
                      label='Enfermedad Infecciosa (opcional)'
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
                      label='Curada? (opcional)'
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
                name='severidad'
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
          <Col md={6} sm={12} lg={12} className='mb-3'>
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
          <Col md={6} lg={12} className='mb-3'>
            <FormGroup>
              <Form.Label>
                Contraido en semana de embarazo numero? (opcional)
              </Form.Label>
              <Controller
                control={control}
                name='contraidoSemanaEmbarazo'
                render={({ field }) => (
                  <Form.Control type='number' placeholder='0' {...field} />
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
                name='advertenciaEmbarazo'
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type='switch'
                    id='advertenciaEmbarazo'
                    label='Advertencia durante el embarazo (opcional)'
                  />
                )}
              />
              <Controller
                control={control}
                name='actualmenteEnTratamiento'
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type='switch'
                    size={20}
                    id='actualmenteEnTratamiento'
                    label='Actualmente en tratamiento (opcional)'
                  />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
      </NestedConsultasDetails>
    </Fragment>
  );
}
