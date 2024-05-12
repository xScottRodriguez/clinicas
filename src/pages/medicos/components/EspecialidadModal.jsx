import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearActiveSpeciality,
  hideEspecialidadModal,
} from '../../../store/slices/uiSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  useCrearEspecialidadMutation,
  useUpdateEspecialidadMutation,
} from '../../../services/rtk-query/clinicalApi';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';

export const EspecialidadModal = () => {
  const { especialidadModal, activeSpeciality } = useSelector((state) => state.ui);
  const [createEspecialidad] = useCrearEspecialidadMutation();
  const [updateEspecialidad] = useUpdateEspecialidadMutation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      nombre: '',
    },
  });

  useEffect(() => {
    if (activeSpeciality) {
      setValue('nombre', activeSpeciality.nombre);
    }
  }, [activeSpeciality]);

  const handleClose = () => {
    reset();
    dispatch(hideEspecialidadModal());
    dispatch(clearActiveSpeciality());
  };
  const onSubmit = (data) => {
    if (activeSpeciality) {
      toastAdapter.promise({
        promise: updateEspecialidad({ id: activeSpeciality.id, ...data }).unwrap(),
        loadingMessage: 'Actualizando especialidad',
        successMessage: () => {
          reset();
          dispatch(clearActiveSpeciality());
          return 'Especialidad actualizada';
        },
        errorMessage: 'Error al actualizar especialidad',
      });
      return;
    }
    toastAdapter.promise({
      promise: createEspecialidad(data).unwrap(),
      loadingMessage: 'Creando especialidad',
      successMessage: () => {
        reset();
        return 'Especialidad creada';
      },
      errorMessage: 'Error al crear especialidad',
    });
  };
  return (
    <>
      <Modal
        show={especialidadModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Especialidades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre de la Especialidad</Form.Label>
            <Controller
              name='nombre'
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field }) => (
                <Form.Control
                  type='text'
                  placeholder='Nombre de la especialidad'
                  {...field}
                />
              )}
            />
            {errors.nombre && (
              <Form.Text className='text-danger'>{errors.nombre.message}</Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' type='button' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' type='button' onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
