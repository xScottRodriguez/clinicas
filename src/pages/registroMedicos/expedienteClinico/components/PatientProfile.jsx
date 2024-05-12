import React from 'react';
import { FiUser } from 'react-icons/fi';
import FormInfoPaciente from '../FormInfoPaciente';
import FormInfoResponsanle from '../FormInfoResponsanle';
import { Button, CardTitle } from 'react-bootstrap';
import { BsSave } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { formatCreatePatient } from '../utils';
import { useSaveExpedientMutation } from '../../../../services/rtk-query';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { toggleDisableTabs } from '../../../../store/slices/expedienteSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const PatientProfile = () => {
  const { id = null } = useParams();
  const [saveExpedient] = useSaveExpedientMutation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    control,
    setValue,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      paciente: null,
      profesion: null,
      descripcion: '',
      responsable: {
        telefono: null,
        nombre: null,
        parentesco: null,
        tipoDocumento: null,
        numeroDocumento: null,
      },
    },
  });
  const onSubmit = async (data) => {
    const payload = formatCreatePatient(data);
    toastAdapter.promise({
      promise: saveExpedient(payload).unwrap(),
      errorMessage: (error) => {
        if (error.status === 400) {
          return (
            error?.data?.message ??
            error?.data?.map((item) => item?.message).join(',')
          );
        }
        return 'Ocurrio un error al intentar crear el expediente';
      },
      loadingMessage: 'Creando Expediente...',
      successMessage: (data) => {
        dispatch(toggleDisableTabs(data.id));
        navigator(`/expedientes-medicos/${data.id}`);
        return `Expediente creado con exitos`;
      },
    });
  };
  return (
    <>
      <CardTitle className='fs-4'>
        <FiUser /> Información del paciente
      </CardTitle>

      <FormInfoPaciente
        control={control}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Informacion del paciente */}
      <div className=' my-3'>
        <CardTitle className='fs-4'>
          <FiUser /> Información del responsable
        </CardTitle>
        <FormInfoResponsanle
          control={control}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        <Button size='lg' onClick={handleSubmit(onSubmit)}>
          <BsSave />
          {!id ? 'Crear' : 'Actualizar'} Expediente
        </Button>
      </div>
    </>
  );
};
