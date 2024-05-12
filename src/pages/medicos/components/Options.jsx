/* eslint-disable no-restricted-globals */
import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { PiTrashSimple } from 'react-icons/pi';

import {
  clinicalApi,
  useDeleteMedicoMutation,
  useDepartamentosQuery,
  useGeneroQuery,
  useMunicipioQuery,
  usePaisesQuery,
} from '../../../services/rtk-query/clinicalApi';
import { toastAdapter } from '../../../plugins/hot-toast.plugin';
import { alertConfirm } from '../../../plugins/sweetAlert.plugin';
export const Options = ({ cell, setValue, handleShow, setAction }) => {
  const [deleteMedico] = useDeleteMedicoMutation();

  const { data: especialidades, isSuccess: isSuccessEspecialidad } =
    clinicalApi.endpoints.especialidades.useQuery();
  const { data: subEspecialidades, isSuccess: isSuccessSubEspecialidades } =
    clinicalApi.endpoints.subEspecialidades.useQuery();
  const { data, isSuccess } = useDepartamentosQuery(cell.paisId);
  const { data: paises, isSuccess: successPaises } = usePaisesQuery();
  const { data: municipios, isSuccess: successMunicipios } = useMunicipioQuery(
    +cell.estadoId
  );
  const { data: genders, isSuccess: successGender } = useGeneroQuery();

  const onEvent = useCallback(async () => {
    if (
      isSuccess &&
      successPaises &&
      successMunicipios &&
      successGender &&
      isSuccessEspecialidad &&
      isSuccessSubEspecialidades
    ) {
      const departamento = data.find((depa) => depa.id === cell.estadoId);
      handleShow();

      const newDepa = {
        id: departamento.id,
        label: departamento.value,
        value: departamento.id,
      };

      const { value, ...rest } = paises.find((pais) => pais.id === cell.paisId);
      const newPais = {
        label: value,
        value: rest.id,
        ...rest,
      };

      const { value: muni, ...restM } = municipios.find(
        (municipio) => municipio.id === cell.municipioId
      );

      const { value: gender, ...restG } = genders.find(
        (gender) => gender.id === cell.genero
      );

      const newMunicipio = {
        label: muni,
        value: restM.id,
        ...restM,
      };

      const newGender = {
        label: gender,
        value: restG.id,
        ...restG,
      };

      const espcialidad = especialidades.find(
        (especialidad) => especialidad.id === cell.especialidadId
      );
      const subEspecialidad = subEspecialidades.find(
        (subEspecialidad) => subEspecialidad.id === cell.subEspecialidadId
      );
      const newEspecialidad = {
        label: espcialidad.nombre,
        value: espcialidad.id,
      };

      const newSubEspecialidad = {
        label: subEspecialidad.nombre,
        value: subEspecialidad.id,
      };
      setValue('nombres', cell.nombres);
      setValue('apellidos', cell.apellidos);
      setValue('genero', newGender);
      setValue('direccion', cell.direccion);
      setValue('localidad', cell.localidad);
      setValue('pais', newPais);
      setValue('departamento', newDepa);
      setValue('municipio', newMunicipio);
      setValue('telefono', cell.telefono);
      setValue('email', cell.email);
      setValue('jvpm', cell.jvpm);
      setValue('especialidad', newEspecialidad);
      setValue('subEspecialidad', newSubEspecialidad);
      setValue('medicoId', cell.id);
      setAction('UPDATE');
    }
  }, [
    cell.paisId,
    cell.estadoId,
    cell.municipioId,
    cell.genero,
    data,
    paises,
    municipios,
    genders,
    isSuccess,
    successPaises,
    successMunicipios,
    successGender,
    setValue,
    handleShow,
    setAction,
  ]);

  const onDelete = () => {
    alertConfirm({
      title: 'Desea eliminar esta incapacidad?',
      text: 'No podras revertir cosas',
      confirmButtonText: 'Si, Eliminalo',
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
      if (!resp) return;

      toastAdapter.promise({
        promise: deleteMedico(cell.id).unwrap(),
        successMessage: 'Incapacidad Eliminada',
        errorMessage: 'Ocurrio un error al intentar eliminar una incapacidad',
      });
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
        <Dropdown.Item onClick={onDelete}>
          <PiTrashSimple /> Eliminar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
