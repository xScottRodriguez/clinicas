/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { PiTrashSimple } from 'react-icons/pi';
import {
  useConsultaDiagnosticoQuery,
  useDeleteDiagnosticoMutation,
} from '../../../../services/rtk-query';
import { useDispatch } from 'react-redux';
import {
  setDiagnosticoActivo,
  toggleModal,
} from '../../../../store/slices/uiSlice';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { alertConfirm } from '../../../../plugins';
export const OptionsEnfermedades = ({ cell }) => {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);

  const { data, isSuccess } = useConsultaDiagnosticoQuery(cell, {
    skip,
  });
  const [deleteDiagnostico] = useDeleteDiagnosticoMutation();

  const onEvent = () => {
    setSkip(false);
  };

  const onDelete = () => {
    alertConfirm({
      title: 'Desea eliminar este diagnostico?',
      text: 'No podra eliminar revertir esto',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
      if (!resp) return;
      toastAdapter.promise({
        promise: deleteDiagnostico({ id: cell }).unwrap(),
        loadingMessage: 'Eliminando diagnostico',
        successMessage: 'Diagnostico eliminado',
        errorMessage: 'Error al intentar eliminar diagnostico',
      });
    });
  };

  // Actualizar el estado con los datos de la consulta cuando la consulta tenga éxito
  useEffect(() => {
    if (isSuccess) {
      dispatch(setDiagnosticoActivo(data));
      dispatch(toggleModal());
      setSkip(true);
    }
  }, [isSuccess, data, dispatch]);

  return (
    <Dropdown flip drop='left'>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        <CgMenuLeft />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEvent}>
          <FiEdit /> Actualizar
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>
          <PiTrashSimple /> Eliminar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
