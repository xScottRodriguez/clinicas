import { IoCreateOutline } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { RiMenuFill } from 'react-icons/ri';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  setActiveSubSpeciality,
  showSubEspecialidadModal,
} from '../../../store/slices/uiSlice';
import { alertConfirm } from '../../../plugins/sweetAlert.plugin';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';
import { useDeleteSubEspecialidadMutation } from '../../../services/rtk-query/clinicalApi';

export const ModalSubOptions = ({ cell }) => {
  const dispatch = useDispatch();
  const [deleteEspecialiad] = useDeleteSubEspecialidadMutation();
  const edit = () => {
    dispatch(setActiveSubSpeciality(cell));
    dispatch(showSubEspecialidadModal());
  };
  const onDelete = async () => {
    const response = await alertConfirm({
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      text: 'No podras revertir esta acción',
      title: '¿Estás seguro?',
    });
    if (response) {
      toastAdapter.promise({
        promise: deleteEspecialiad(cell.id).unwrap(),
        loadingMessage: 'Eliminando subbv especialidad',
        successMessage: 'Sub Especialidad eliminada con éxito',
        errorMessage: 'No se pudo eliminar la sub  especialidad',
      });
    }
  };
  return (
    <Dropdown drop='up-centered'>
      <Dropdown.Toggle variant='outline-primary' id='dropdown-basic'>
        <RiMenuFill />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={edit}>
          <IoCreateOutline /> Editar
        </Dropdown.Item>
        <Dropdown.Item className='text-danger' onClick={onDelete}>
          <BsTrash3 /> Eliminar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
