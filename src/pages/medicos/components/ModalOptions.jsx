import { IoCreateOutline } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { RiMenuFill } from 'react-icons/ri';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  setActiveSpeciality,
  showEspecialidadModal,
} from '../../../store/slices/uiSlice';
import { alertConfirm } from '../../../plugins/sweetAlert.plugin';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';
import { useDeleteEspecialidadMutation } from '../../../services/rtk-query/clinicalApi';

export const ModalOptions = ({ cell }) => {
  const dispatch = useDispatch();
  const [deleteEspecialiad] = useDeleteEspecialidadMutation();
  const edit = () => {
    dispatch(setActiveSpeciality(cell));
    dispatch(showEspecialidadModal());
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
        loadingMessage: 'Eliminando especialidad',
        successMessage: 'Especialidad eliminada con éxito',
        errorMessage: 'No se pudo eliminar la especialidad',
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
