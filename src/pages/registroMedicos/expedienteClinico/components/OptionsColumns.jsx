import PropTypes from 'prop-types';
import React from 'react';
import { TbFileReport } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import {
  setPacienteTab,
  setShowToastLoader,
  setUri,
} from '../../../../store/slices/uiSlice';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { useReports } from '../../../../hooks/useReports';
import { obtenerURLBlob } from '../../../../utils';

export const OptionsColumns = ({ id }) => {
  const { handleFetch } = useReports({ endpoint: 'consultas/reporte', id });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const onEvent = () => {
    dispatch(setPacienteTab());
    navigator(`/expedientes-medicos/${id}`);
  };

  const generarReporte = async () => {
    toastAdapter.promise({
      promise: handleFetch(),
      successMessage: (data) => {
        const uriBlog = obtenerURLBlob(data);
        dispatch(setUri(uriBlog));
        dispatch(setShowToastLoader());
        return 'Reporte generado';
      },
      errorMessage: 'Error al generar reporte...',
      loadingMessage: 'Generando Reporte...',
    });
  };

  return (
    <Dropdown flip drop='left'>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        <CgMenuLeft />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEvent}>
          <FiEdit /> Actualizar
        </Dropdown.Item>

        <Dropdown.Item onClick={generarReporte}>
          <TbFileReport /> Generar Reporte
        </Dropdown.Item>
        {/* <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};
PropTypes.OptionsColumns = {
  onEvent: PropTypes.func.isRequired,
};
