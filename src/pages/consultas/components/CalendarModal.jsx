import moment from 'moment';

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Modal, Row, Stack } from 'react-bootstrap';
import { LuCalendarCheck } from 'react-icons/lu';
import { LiaTimesSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';

import 'react-contexify/dist/ReactContexify.css';

import { closeModal, eventClearActiveEvent } from '../../../store/slices/uiSlice';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';
import { agendaSchema } from '../../../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatInTimeZone } from 'date-fns-tz';

import { AsyncSelectCustom } from '../../../components/selects/AsyncSelect';
import {
  useGetFolderPeoplesQuery,
  useMedicosQuery,
  useNewDateMutation,
  useStatusDatesQuery,
  useUpdateDateMutation,
} from '../../../services/rtk-query/clinicalApi';
import PhoneInput from 'react-phone-number-input';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { RichTextEditor } from '../../../components/inputs/RichTextEditor';
import { AsyncSelectCreate } from '../../../components/selects/AsyncSelectCreate';
import { compareAsc, parse } from 'date-fns';
import { ZONE } from '../../../constants';
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
  title: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
  notes: '',
  estado: null,
  medico: null,
  paciente: null,
};
registerLocale('es', es);

export const CalendarModal = () => {
  const [doctorFilter, setDoctorFilter] = useState('');
  const [searchFolderPeople, setSearchFolderPeople] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { isFetching, data: medicos, isSuccess } = useMedicosQuery(doctorFilter);
  const {
    data: statusDates,
    isFetching: isFetchingStatus,
    isSuccess: isSuccessStatus,
  } = useStatusDatesQuery(statusFilter);
  const {
    isFetching: isFetchingFolderPeople,
    data: folderPepoples,
    isSuccess: isSuccessPeople,
  } = useGetFolderPeoplesQuery(searchFolderPeople);

  const [newDate] = useNewDateMutation();
  const [updateDate] = useUpdateDateMutation();

  const { modalOpen, activeEvent } = useSelector((state) => state.ui);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: initEvent,
    resolver: yupResolver(agendaSchema),
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    onUpdate: ({ editor }) => {
      setValue('notes', editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {},

    onCreate: ({ editor }) => {
      editor.commands.setContent(getValues('notes'));
    },
  });

  const filterMedicos = (inputValue) => {
    return medicos
      ?.filter((i) =>
        `${i.nombres} ${i.apellidos}`
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
      .map((item) => ({
        value: item.id,
        label: `${item.nombres} ${item.apellidos}`,
        ...item,
      }));
  };
  const filterPeople = (inputValue) => {
    return folderPepoples
      ?.filter((i) => i?.nombre.toLowerCase().includes(inputValue.toLowerCase()))
      .map((item) => ({
        value: item.id,
        label: item.nombre,
        ...item,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    setDoctorFilter(inputValue);
    if (isSuccess) {
      callback(filterMedicos(inputValue));
    }
  };
  const loadOptionsFolderPeople = (inputValue, callback) => {
    setSearchFolderPeople(inputValue);

    if (isSuccessPeople) {
      callback(filterPeople(inputValue));
    }
  };

  const filterStatus = (inputValue) => {
    return statusDates
      ?.filter((i) => {
        return i?.nombre?.toLowerCase().includes(inputValue?.toLowerCase());
      })
      .map((item) => ({
        value: item.id,
        label: item.nombre,
        ...item,
      }));
  };

  const loadOptionsStatus = (inputValue, callback) => {
    setStatusFilter(inputValue);
    if (isSuccessStatus) {
      callback(filterStatus(inputValue));
    }
  };

  const onCloseModal = () => {
    reset();
    dispatch(closeModal());
    dispatch(eventClearActiveEvent());
    setDateStart(now.toDate());
    setDateEnd(nowPlus1.toDate());
    editor?.commands?.clearContent();
  };
  const createOption = (label) => {
    return {
      label,
      value: label,
    };
  };

  useEffect(() => {
    if (activeEvent) {
      reset();
      setValue('title', activeEvent.title);
      setValue('notes', activeEvent.observaciones);
      if (editor) {
        editor?.commands?.setContent(activeEvent.observaciones);
      }

      setValue(
        'start',
        formatInTimeZone(activeEvent.start, ZONE, 'yyyy/MM/dd, HH:mm:ss')
      );
      setValue(
        'end',
        formatInTimeZone(activeEvent.end, ZONE, 'yyyy/MM/dd, HH:mm:ss')
      );

      const medo = medicos.find((m) => m.id === activeEvent.medicoId);
      setValue('medico', {
        id: medo.id,
        label: medo.nombres,
        value: medo.id,
      });
      const item = statusDates.find((s) => {
        return s.id === activeEvent.estado.id;
      });
      setValue('estado', {
        id: item.id,
        label: item.nombre,
        value: item.id,
      });
      setValue('telefono', activeEvent.telefono);
      const people = folderPepoples?.find((p) => p.id === activeEvent.pacienteId);

      if (activeEvent?.pacienteId) {
        setValue('paciente', {
          label: people.nombre,
          value: people.id,
          id: people.id,
        });
      } else {
        setValue('paciente', createOption(activeEvent.paciente));
      }
    } else {
      reset();
      setDateStart(now.toDate());
      setDateEnd(nowPlus1.toDate());
      editor?.commands?.clearContent();
      dispatch(eventClearActiveEvent());
    }
  }, [activeEvent, editor, reset, setValue]);

  const handleStartDateChange = (e) => {
    setDateStart(e);
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
  };

  const onSubmit = ({
    title,
    start,
    end,
    notes,
    estado,
    medico,
    paciente,
    telefono,
  }) => {
    if (!start || !end) {
      setError('start', {
        message: 'La fecha de inicio es requerida',
      });
      setError('end', { message: 'La fecha de fin es requerida' });
    }

    const parsedStart = formatInTimeZone(start, ZONE, 'yyyy-MM-dd HH:mm:ss');
    const parsedEnd = formatInTimeZone(end, ZONE, 'yyyy-MM-dd HH:mm:ss');
    const isSame = compareAsc(parsedStart, parsedEnd);
    if (isSame !== -1) {
      return toastAdapter.error({
        message: 'La fecha fin debe ser mayor a la fecha de inicio',
      });
    }
    const fechaInicio = formatInTimeZone(
      start,
      'America/El_Salvador',
      'yyyy/MM/dd'
    );
    const horaInicio = formatInTimeZone(start, 'America/El_Salvador', 'HH:mm:ss');
    const horaFin = formatInTimeZone(end, 'America/El_Salvador', 'HH:mm:ss');
    const data = {
      fecha: fechaInicio,
      hora: horaInicio,
      horaFin,
      estadoId: +estado.value,
      medicoId: +medico.value,
      pacienteId: +paciente?.value ? +paciente.value : null,
      nombrePaciente: !paciente?.value ? null : paciente.label, // si no se selecciona un paciente se guarda el nombre
      telefono,
      titulo: title,
      observaciones: notes,
    };
    if (activeEvent) {
      toastAdapter.promise({
        promise: updateDate({ dateId: activeEvent.id, body: data }).unwrap(),
        loadingMessage: 'Actualizando',
        errorMessage: (error) => {
          return 'Error al actualizar la cita';
        },
        successMessage: () => {
          onCloseModal();
          return 'Cita actualizada';
        },
      });
    } else {
      toastAdapter.promise({
        promise: newDate(data).unwrap(),
        loadingMessage: 'Guardando',
        successMessage: () => {
          onCloseModal();
          return 'Cita agendada';
        },
        errorMessage: (error) => {
          if (typeof error.data?.message === 'string') {
            return error.data.message;
          }

          if (Array.isArray(error.data.message))
            return error.data.message.join(', ');

          return 'Error al agendar la cita';
        },
      });
    }
  };

  return (
    <Modal
      show={modalOpen}
      onHide={onCloseModal}
      backdrop='static'
      keyboard={false}
      centered
      scrollable
      animation
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>{activeEvent ? 'Editar Cita' : 'Agendar Cita'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className='mb-3'>
              <Form.Group className='w-100 overflow-auto'>
                <Form.Label>Fecha y hora inicio:</Form.Label>
                <Controller
                  name='start'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      dateFormat='Pp'
                      className='form-control '
                      locale='es'
                      showTimeSelect
                      selected={dateStart}
                      {...field}
                      onChange={(date) => {
                        handleStartDateChange(date);
                        field.onChange(date);
                      }}
                    />
                  )}
                />
                {errors.start && (
                  <Form.Text className='text-danger'>
                    {errors.start.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className='mb-3'>
              <Form.Group className='d-flex flex-column'>
                <Form.Label>Fecha y hora fin:</Form.Label>
                <Controller
                  name='end'
                  control={control}
                  rules
                  render={({ field }) => (
                    <DatePicker
                      dateFormat='Pp'
                      locale='es'
                      className='form-control'
                      showTimeSelect
                      selected={dateEnd}
                      {...field}
                      onChange={(date) => {
                        handleEndDateChange(date);
                        field.onChange(date);
                      }}
                    />
                  )}
                />
                {errors.end && (
                  <Form.Text className='text-danger'>
                    {errors.end.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col className='mb-3' md={12}>
              <Form.Group>
                <Form.Label>Estado:</Form.Label>
                <Controller
                  name='estado'
                  control={control}
                  render={({ field }) => (
                    <AsyncSelectCustom
                      {...field}
                      loadOptions={loadOptionsStatus}
                      isLoading={isFetchingStatus}
                      placeholder='Seleccione un estado'
                    />
                  )}
                />
                {errors.estado && (
                  <Form.Text className='text-danger'>
                    {errors.estado.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col className='mb-3' md={12}>
              <Form.Group className='d-flex flex-column'>
                <Form.Label>Telefono:</Form.Label>
                <Controller
                  name='telefono'
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      inputComponent={FormControl}
                      defaultCountry='SV'
                      international
                      initialValueFormat='national'
                      {...field}
                    />
                  )}
                />
                {errors.telefono && (
                  <Form.Text className='text-danger'>
                    {errors.telefono.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Paciente:</Form.Label>
                <Controller
                  name='paciente'
                  control={control}
                  render={({ field }) => (
                    <AsyncSelectCreate
                      {...field}
                      loadOptions={loadOptionsFolderPeople}
                      isLoading={isFetchingFolderPeople}
                      placeholder='Seleccione un paciente o cree uno nuevo'
                    />
                  )}
                />
                <Stack>
                  <Form.Text className='text-secondary'>
                    Si crea un paciente este solo sera informativo para la cita
                  </Form.Text>
                </Stack>
                {errors.paciente && (
                  <Form.Text className='text-danger'>
                    {errors.paciente.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Medico:</Form.Label>
                <Controller
                  name='medico'
                  control={control}
                  render={({ field }) => (
                    <AsyncSelectCustom
                      {...field}
                      loadOptions={loadOptions}
                      isLoading={isFetching}
                      defaultOptions={true}
                    />
                  )}
                />
                {errors.medico && (
                  <Form.Text className='text-danger'>
                    {errors.medico.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mb-3'>
            <Form.Label>Titulo :</Form.Label>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Escribe una descripción de la cita'
                />
              )}
            />
            {errors.title && (
              <Form.Text className='text-danger'>{errors.title.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              Notas <small>(Opcional)</small>:
            </Form.Label>
            <Controller
              name='notes'
              control={control}
              render={({ field }) => <RichTextEditor {...field} editor={editor} />}
            />
            {errors.notes && (
              <Form.Text className='text-danger'>{errors.notes.message}</Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSubmit(onSubmit)}>
          <span style={{ fontSize: '16px' }}>Agendar</span>{' '}
          <LuCalendarCheck size={20} />
        </Button>
        <Button variant='outline-secondary' onClick={onCloseModal}>
          Cerrar <LiaTimesSolid />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
