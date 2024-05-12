/* eslint-disable react-hooks/exhaustive-deps */
/** @format */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setAllergics } from '../../../../store/slices/antecedentes';
import {
  useGetAllergicsQuery,
  useGetAllergiesForFileQuery,
  useGetSymptomsOfAllergiesQuery,
} from '../../../../services/rtk-query/clinicalApi';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { mapAllergies, updateItemActives } from './utils';
import { useParams } from 'react-router-dom';

export default function TablaAlergias() {
  const { id = null } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetAllergicsQuery('');
  const {
    data: dataFileAllergie,
    isError: isErrorFileAllergie,
    isFetching: isFetchingFileAllergie,
  } = useGetAllergiesForFileQuery(id);

  const {
    data: dataSymptoms,
    isLoading: isLoadingSymptoms,
    isError: isErrorSymptoms,
    isSuccess: isSuccessSymptoms,
  } = useGetSymptomsOfAllergiesQuery('');
  const dispatch = useDispatch();
  const { alergias } = useSelector((state) => state.antecedente);
  const { queries } = useSelector((state) => state.clinicalApi);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set());
  const [selectedAlergiaId, setSelectedAlergiaId] = useState(null);

  const [tipoAlergias, setTipoAlergias] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isSuccess && !isLoaded && data) {
      const newData = data?.map((alergia) => ({
        ...alergia,
        isChecked: false,
        comentario: '',
        foto: `/assets/img/illustrations/profiles/${alergia.id}.svg`,
        selectedSymptoms: [],
      }));

      setTipoAlergias(newData);
    }
  }, [isSuccess, data, isLoaded, queries, isFetchingFileAllergie]);

  useEffect(() => {
    if (!isLoaded && Array.isArray(alergias) && alergias.length > 0) {
      setTipoAlergias(mapAllergies(alergias));
      setIsLoaded(true);
    }
  }, [alergias, data, isLoaded, queries]);

  useEffect(() => {
    if (
      isSuccess &&
      isSuccessSymptoms &&
      !isErrorFileAllergie &&
      !isFetchingFileAllergie &&
      isLoaded &&
      !!tipoAlergias.length
    ) {
      const fileAllergies = mapAllergies(dataFileAllergie);
      const uniqueData = _.uniqBy(fileAllergies, 'nombre');
      const newAllergiesType = updateItemActives({
        allergies: tipoAlergias,
        allergiesActives: uniqueData,
      });

      setTipoAlergias(newAllergiesType);
    }
  }, [
    dataFileAllergie,
    isErrorFileAllergie,
    isFetchingFileAllergie,
    isSuccess,
    isLoaded,
    isSuccessSymptoms,
  ]);

  useEffect(() => {
    dispatch(
      setAllergics(
        tipoAlergias?.map(
          ({ id, nombre, comentario, selectedSymptoms, isChecked }) => {
            return {
              id,
              comentario,
              nombre,
              selectedSymptoms: selectedSymptoms?.map(({ id, name }) => ({
                id,
                name,
              })),
              isChecked,
            };
          }
        )
      )
    );
  }, [tipoAlergias, dispatch]);

  const handleToggle = (e, id) => {
    const newAlergias = tipoAlergias?.map((alergia) => {
      if (alergia.id === id) {
        // if (!e.target.checked) {
        //   return {
        //     ...alergia,
        //     isChecked: false,
        //     comentario: "",
        //     selectedSymptoms: [],
        //   };
        // }
        return {
          ...alergia,
          isChecked: e.target.checked,
        };
      }
      return alergia;
    });
    setTipoAlergias(newAlergias);
    if (selectedCheckboxes.has(id)) {
      selectedCheckboxes.delete(id);
    } else {
      selectedCheckboxes.add(id);
    }
    setSelectedCheckboxes(new Set(selectedCheckboxes));
    setSelectedAlergiaId(id);
  };
  // Actualiza la función handleSymptomToggle para actualizar los síntomas seleccionados en el estado
  const handleSymptomToggle = (e, symptomId, symptomName, allergyId) => {
    const selectedAlergiaIndex = tipoAlergias.findIndex(
      (alergia) => alergia.id === allergyId
    );

    if (selectedAlergiaIndex !== -1) {
      const updatedTipoAlergias = [...tipoAlergias];
      const selectedSymptoms =
        updatedTipoAlergias[selectedAlergiaIndex].selectedSymptoms;

      if (e.target.checked) {
        // Agrega el síntoma seleccionado al array de síntomas seleccionados
        selectedSymptoms.push({ id: symptomId, name: symptomName });
      } else {
        // Remueve el síntoma deseleccionado del array de síntomas seleccionados
        const symptomIndex = selectedSymptoms.findIndex(
          (symptom) => symptom.id === symptomId
        );
        if (symptomIndex !== -1) {
          selectedSymptoms.splice(symptomIndex, 1);
        }
      }

      // Actualiza el estado con el array de síntomas seleccionados actualizado
      updatedTipoAlergias[selectedAlergiaIndex].selectedSymptoms = selectedSymptoms;
      setTipoAlergias(updatedTipoAlergias);
    }

    // Actualiza el estado de selectedAlergiaId para almacenar el ID de la alergia seleccionada
    setSelectedAlergiaId(allergyId);
  };
  const handleInputChange = (e, alergiaId) => {
    const newTipoAlergias = tipoAlergias?.map((tipoAlergia) => {
      if (tipoAlergia.id === alergiaId) {
        return {
          ...tipoAlergia,
          comentario: e.target.value,
        };
      }
      return tipoAlergia;
    });
    setTipoAlergias(newTipoAlergias);
  };

  const showModal = (alergiaId) => {
    setSelectedAlergiaId(alergiaId); // Actualiza el ID de la alergia seleccionada
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <Container className='table-responsive'>
      <table className='table-responsive table table-bordered table-striped table-sm '>
        <thead>
          <tr>
            <th>Selección</th>
            <th>Causa de alergia</th>
            <th>Síntomas</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Spinner animation='grow' />}
          {isError && (
            <Alert variant='danger'>Ocurrio un error al cargar las alergias</Alert>
          )}

          {isSuccess && isSuccessSymptoms && Object.keys(data).length <= 0 && (
            <Alert variant='secondary'>Aun no hay alergias</Alert>
          )}

          {isSuccess &&
            isSuccessSymptoms &&
            tipoAlergias?.map((alergia) => (
              <tr key={alergia.id}>
                <td className='align-middle'>
                  <div className='form-check form-switch center-x'>
                    <input
                      className='form-check-input allergies-cause'
                      type='checkbox'
                      id={`checkbox-${alergia.id}`}
                      // checked={selectedCheckboxes.has(alergia.id)}
                      checked={alergia.isChecked}
                      onChange={(e) => handleToggle(e, alergia.id)}
                    />
                  </div>
                </td>
                <td className='align-middle text-nowrap'>
                  <img
                    className='me-2'
                    src={`/assets/img/illustrations/profiles/${alergia.id}.svg`}
                    width='45px'
                    alt='allergy'
                  />
                  <span
                    className='cursor-pointer text-muted'
                    data-bs-toggle='tooltip'
                    title={alergia.id}
                  >
                    {/*<i className='fas fa-info-circle'></i>*/}
                  </span>
                  {alergia.nombre}
                </td>

                <td
                  className='btn-col align-middle allergies-synthoms-container'
                  style={{ width: '35%' }}
                >
                  <button
                    disabled={!alergia.isChecked}
                    type='button'
                    className='btn btn-sm btn-primary allergies-btn'
                    onClick={() => showModal(alergia.id)}
                  >
                    Seleccionar Síntomas
                  </button>
                  <ul
                    className='list-group mt-2'
                    // id={"allergies-synthoms-container" + alergia.id}
                  >
                    {Array.isArray(alergia?.selectedSymptoms) &&
                      alergia.selectedSymptoms?.map((symptom) => (
                        <li key={symptom.id} className='list-group-item'>
                          <img
                            className='me-2'
                            src={`/assets/img/allergy-symptoms/${symptom.id}.svg`}
                            width='45px'
                            alt='allergy-symptom'
                          />
                          <span>{symptom.name}</span>
                        </li>
                      ))}
                  </ul>
                </td>
                <td className='text-col align-middle' style={{ width: '35%' }}>
                  <textarea
                    disabled={!alergia.isChecked}
                    className='form-control'
                    value={alergia.comentario}
                    onChange={(e) => handleInputChange(e, alergia.id)}
                  ></textarea>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal title={'Lista de alergias'} cerrar={hideModal} abrir={isOpen}>
        <ul className='list-group' id='allergy-symptoms-list'>
          {isLoadingSymptoms && <Spinner animation='grow' color='primary' />}
          {isErrorSymptoms && (
            <Alert variant='danger'>Ocurrio un error al cargar los sintomas</Alert>
          )}
          {isSuccessSymptoms && Object.keys(dataSymptoms).length <= 0 && (
            <Alert variant='secondary'>NO se encontraron sintomas</Alert>
          )}
          {isSuccessSymptoms &&
            dataSymptoms?.map((sintoma) => (
              <label key={sintoma.id} className='list-group-item'>
                <input
                  id={`checkbox-${sintoma.id}-${selectedAlergiaId}`}
                  className='form-check-input me-1 mt-2'
                  type='checkbox'
                  value={sintoma.id}
                  checked={tipoAlergias
                    .find((alergia) => alergia.id === selectedAlergiaId)
                    ?.selectedSymptoms.some((symptom) => symptom.id === sintoma.id)}
                  name='allergy-symptom'
                  data-name={sintoma.nombre}
                  onChange={(e) =>
                    handleSymptomToggle(
                      e,
                      sintoma.id,
                      sintoma.nombre,
                      selectedAlergiaId
                    )
                  }
                />

                <img
                  className='me-2'
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/img/allergy-symptoms/${sintoma.id}.svg`
                  }
                  width='45px'
                  alt='allergy-symptom'
                />
                {sintoma.nombre}
              </label>
            ))}
        </ul>
      </Modal>
    </Container>
  );
}
