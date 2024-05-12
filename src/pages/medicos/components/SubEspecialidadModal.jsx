import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearActiveSubSpeciality,
  hideSubEspecialidadModal,
} from '../../../store/slices/uiSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  useCrearSubEspecialidadMutation,
  useUpdateSubEspecialidadMutation,
} from '../../../services/rtk-query/clinicalApi';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';

export const SubEspecialidadModal = () => {
  const { subEspecialidadModal, activeSubSpeciality } = useSelector(
    (state) => state.ui
  );
  const [createEspecialidad] = useCrearSubEspecialidadMutation();
  const [updateEspecialidad] = useUpdateSubEspecialidadMutation();
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
    console.log(activeSubSpeciality);
    if (activeSubSpeciality) {
      console.log(activeSubSpeciality);
      setValue('nombre', activeSubSpeciality.nombre);
    }
  }, [activeSubSpeciality]);

  const handleClose = () => {
    reset();
    dispatch(hideSubEspecialidadModal());
    dispatch(clearActiveSubSpeciality());
  };
  const onSubmit = (data) => {
    if (activeSubSpeciality) {
      toastAdapter.promise({
        promise: updateEspecialidad({
          id: activeSubSpeciality.id,
          ...data,
        }).unwrap(),
        loadingMessage: 'Actualizando sub especialidad',
        successMessage: () => {
          reset();
          dispatch(clearActiveSubSpeciality());
          return 'Sub Especialidad actualizada';
        },
        errorMessage: 'Error al actualizar especialidad',
      });
      return;
    }
    toastAdapter.promise({
      promise: createEspecialidad(data).unwrap(),
      loadingMessage: 'Creando sub especialidad',
      successMessage: () => {
        reset();
        return 'Sub Especialidad creada';
      },
      errorMessage: 'Error al crear  sub  especialidad',
    });
  };
  return (
    <>
      <Modal
        show={subEspecialidadModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sub Especialidades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre de la Sub Especialidad</Form.Label>
            <Controller
              name='nombre'
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field }) => (
                <Form.Control
                  type='text'
                  placeholder='Nombre de la sub especialidad'
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
