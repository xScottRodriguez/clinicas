/* eslint-disable no-restricted-globals */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { PiTrashSimple } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import {
  setConsulta,
  setConsultaTabFalse,
  setInterrogatorioTab,
  setUser,
} from '../../../../store/slices/uiSlice';
import {
  useDeleteConsultaMutation,
  useLazyMedicosQuery,
  useUpdateMedicoByConsultaMutation,
} from '../../../../services/rtk-query';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataCookie } from '../../../../utils';
import { BiUser } from 'react-icons/bi';
import {
  alertConfirm,
  loadingAlert,
  selectAlert,
} from '../../../../plugins/sweetAlert.plugin';
export const OptionsColumnConsultas = ({ cell }) => {
  const [loadMedicos] = useLazyMedicosQuery();
  const [changeDoctorMutation] = useUpdateMedicoByConsultaMutation();
  const navigator = useNavigate();
  const { id = null } = useParams();

  const [deleteConsulta, { isLoading }] = useDeleteConsultaMutation();

  const dispatch = useDispatch();
  const onEvent = () => {
    dispatch(setConsulta(cell));
    dispatch(setConsultaTabFalse());
    dispatch(setInterrogatorioTab());
    const data = getDataCookie('medico');
    dispatch(setUser(data));
    navigator(`/expedientes-medicos/${id}/consultas/${cell}`);
  };
  const onDelete = () => {
    alertConfirm({
      title: '¿Estas seguro?',
      text: 'No podras revertir esto',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result) {
        toastAdapter.promise({
          promise: deleteConsulta({ id: cell }).unwrap(),
          successMessage: 'Consulta Eliminada',
          errorMessage: 'Error al intentar eliminar la consulta',
          loadingMessage: 'Eliminando...',
        });
      }
    });
  };
  const changeDoctor = async () => {
    loadingAlert({
      flag: true,
      text: 'Cargando Medicos',
      title: 'Cargando...',
    });
    const { data, isSuccess } = await loadMedicos();
    if (!isLoading) {
      loadingAlert({
        flag: false,
        text: 'Cargando Medicos',
        title: 'Cargando...',
      });
    }
    if (!isSuccess) return;
    const response = await selectAlert({
      title: 'Seleccione un medico',
      text: 'Seleccione un Medico para continuar',
      inputOptions: data
        ?.map((medico) => ({ [medico.id]: medico.nombres }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    });
    if (response.isConfirmed) {
      toastAdapter.promise({
        promise: changeDoctorMutation({
          consultaId: cell,
          medicoId: +response.value,
        }).unwrap(),
        successMessage: 'Medico Actualizado',
        errorMessage: (error) => {
          console.log(error);
          return 'Error al intentar actualizar el medico';
        },
        loadingMessage: 'Actualizando...',
      });
    }
  };

  return (
    <Dropdown className='text-center' flip drop='left'>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        <CgMenuLeft />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEvent} className='d-flex justify-content-evenly'>
          <FiEdit className='mx-auto' /> <small>Ver Detalles</small>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={changeDoctor}
          className='d-flex justify-content-evenly'
        >
          <BiUser /> Cambiar Medico
        </Dropdown.Item>
        <Dropdown.Item
          className='text-center d-flex justify-content-evenly  '
          onClick={onDelete}
        >
          <PiTrashSimple /> Eliminar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
