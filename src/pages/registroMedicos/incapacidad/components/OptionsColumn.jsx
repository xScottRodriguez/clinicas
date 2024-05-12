/* eslint-disable no-restricted-globals */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { PiTrashSimple } from 'react-icons/pi';
import {
  clinicalApi,
  useDeleteIncapcityMutation,
} from '../../../../services/rtk-query';
import { useDispatch } from 'react-redux';
import { setActiveIncapacity } from '../../../../store/slices/incapacidad';
import { useParams } from 'react-router-dom';
import { toastAdapter } from '../../../../plugins';
export const OptionsColumn = ({ cell }) => {
  const { id = null } = useParams();
  const [deleteIncapacity] = useDeleteIncapcityMutation();
  const {
    data: current,
    isSuccess,
    isLoading,
  } = clinicalApi.endpoints.getIncapacities.useQuery({
    id,
  });
  const dispatch = useDispatch();
  const onEvent = () => {
    const incapacity = current?.find((incapacity) => incapacity.id === cell);

    if (!incapacity) return;

    dispatch(setActiveIncapacity(incapacity));
  };

  const onDelete = () => {
    const response = confirm('Desea Eliminar esta Incapacidad?');
    if (response) {
      toastAdapter.promise({
        promise: deleteIncapacity(cell).unwrap(),
        successMessage: 'Incapacidad Eliminada',
        errorMessage: 'Ocurrio un error al intentar eliminar una incapacidad',
      });
    }
  };
  return (
    <Dropdown flip drop='left'>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        <CgMenuLeft />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEvent} disabled={isLoading && !isSuccess}>
          <FiEdit /> Actualizar
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete} disabled={isLoading && !isSuccess}>
          <PiTrashSimple /> Eliminar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
