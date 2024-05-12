/** @format */

import React, { useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearIncapacity,
  setEndDate,
  setIncapacityNotes,
  setInitialDate,
} from '../../../store/slices/incapacidad';
import FormDiagnostico from './FormDiagnostico';
import { SLICES_NAMES } from '../../../constants';
import { toastAdapter } from '../../../plugins';
import { BsSave2 } from 'react-icons/bs';
import {
  useGetIncapacitiesQuery,
  useSaveIncapacityMutation,
  useUpdateIncapacityMutation,
} from '../../../services/rtk-query';
import { useParams } from 'react-router-dom';
import { formatPayload } from './utils';
import { OptionsColumn } from './components/OptionsColumn';
import { AiOutlineClear } from 'react-icons/ai';
import { TablePlugin } from '../../../plugins/components/TablePlugin';
import { SanitizeRichText } from '../../../components/ui/SanitizeRichText';
const textParcer = ({ row: { original } }) => {
  return <SanitizeRichText html={original?.Notas?.slice(0, 80)} />;
};
const columns = [
  { header: 'Feha Inicial', accessorKey: 'fechaInicio', sort: true },
  { header: 'Feha Final', accessorKey: 'fechaFin', sort: true },
  {
    header: 'Notas',
    accessorKey: 'Notas',
    sort: true,
    cell: textParcer,
  },
  {
    header: 'acciones',
    accessorKey: 'id',
    cell: ({ row: { original } }) => <OptionsColumn cell={original.id} />,
  },
];
export default function FormIncapacidad() {
  const [saveIncapacity] = useSaveIncapacityMutation();
  const [updateIncapacity] = useUpdateIncapacityMutation();
  const { id = null } = useParams();
  const { data, isFetching } = useGetIncapacitiesQuery({ id });

  const { notas, fechaInicial, fechaFinal, activeIncapacity } = useSelector(
    (state) => state.incapacidad
  );
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      fechaInicio: null,
      fechaFinal: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!activeIncapacity) return;
    setValue('fechaInicio', activeIncapacity?.fechaInicio);
    setValue('fechaFinal', activeIncapacity?.fechaFin);
    dispatch(setInitialDate(activeIncapacity?.fechaInicio));
    dispatch(setEndDate(activeIncapacity?.fechaFin));
    dispatch(setIncapacityNotes(activeIncapacity?.Notas));
    setContent(activeIncapacity?.Notas);
  }, [activeIncapacity, dispatch, setValue]);

  const [content, setContent] = useState('');
  useEffect(() => {
    if (!isLoading && notas) {
      setContent(notas);
      setValue('fechaInicio', fechaInicial);
      setValue('fechaFinal', fechaFinal);
      setIsLoading(true);
    }
  }, [dispatch, fechaFinal, fechaInicial, isLoading, notas, setValue]);

  const onChangeInitialDate = (e) => {
    dispatch(setInitialDate(e.target.value));
  };
  const onChangeEndDate = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  const handleSave = (data) => {
    if (activeIncapacity) {
      return toastAdapter.promise({
        promise: updateIncapacity({
          ...formatPayload({ ...data, notas }),
          expedienteId: id,
          id: activeIncapacity.id,
        }).unwrap(),
        loadingMessage: 'Guardando incapacidad...',
        successMessage: () => {
          dispatch(clearIncapacity());
          handleClean();
          return 'Incapacidad guardada';
        },
        errorMessage: 'Error al guardar la incapacidad',
      });
    }

    return toastAdapter.promise({
      promise: saveIncapacity({
        ...formatPayload({ ...data, notas }),
        expedienteId: id,
      }).unwrap(),
      loadingMessage: 'Guardando incapacidad...',
      successMessage: () => {
        dispatch(clearIncapacity());
        handleClean();
        // setValue('fechaInicio', '');
        // setValue('fechaFinal', '');
        return 'Incapacidad guardada';
      },
      errorMessage: 'Error al guardar la incapacidad',
    });
  };
  const handleClean = () => {
    setValue('fechaFinal', '');
    setValue('fechaInicio', '');
    setContent('');
    dispatch(clearIncapacity());
    dispatch(setEndDate(''));
    dispatch(setInitialDate(''));
    dispatch(setIncapacityNotes(null));
  };
  return (
    <Container fluid className='my-3'>
      <Row>
        <Col
          md={6}
          lg={6}
          sm={12}
          className='order-xs-last order-sm-last order-md-first'
        >
          <TablePlugin data={data} columns={columns} isFetching={isFetching} />
        </Col>
        <Col
          md={6}
          lg={6}
          sm={12}
          className='order-xs-first order-sm-first  order-md-last'
        >
          <Row>
            <Col md={6} sm={12} className='mb-3 '>
              <Form.Group className='mb-3'>
                <label className='form-label' htmlFor='inhability_start_date'>
                  Fecha de inicio
                </label>
                <Controller
                  name='fechaInicio'
                  control={control}
                  rules={{
                    required: { value: true, message: 'Fecha Inicio Obligatoria' },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeInitialDate(e);
                      }}
                      type='date'
                      className='form-control'
                      data-model='inhability_start_date'
                      id='inhability_start_date'
                    />
                  )}
                />
                {errors.fechaInicio?.type && (
                  <Form.Text className='text-danger'>
                    {errors.fechaInicio?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12} className='mb-3 '>
              <Form.Group className='mb-3'>
                <label className='form-label' htmlFor='inhability_start_date'>
                  Fecha de Final
                </label>
                <Controller
                  name='fechaFinal'
                  control={control}
                  rules={{
                    required: { value: true, message: 'Fecha Final Obligatoria' },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeEndDate(e);
                      }}
                      type='date'
                      className='form-control'
                      data-model='inhability_start_date'
                      id='inhability_end_date'
                    />
                  )}
                />
                {errors.fechaFinal?.type && (
                  <Form.Text className='text-danger'>
                    {errors.fechaFinal?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col lg={12} sm={12} className='my-4 '>
              <FormDiagnostico
                sliceName={SLICES_NAMES.INCAPACIDAD}
                title='Notas'
                trans={content}
              />
            </Col>
            <Col
              lg={12}
              sm={12}
              className='my-4 d-flex justify-content-around flex-wrap gap-2'
            >
              <Button
                variant='outline-primary'
                size='lg'
                onClick={handleSubmit(handleSave)}
                className=''
              >
                <BsSave2 /> Guardar
              </Button>
              <Button variant='outline-primary' size='lg' onClick={handleClean}>
                <AiOutlineClear /> Limpiar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
