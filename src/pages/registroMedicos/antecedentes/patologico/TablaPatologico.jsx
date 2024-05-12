/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import {
  useGetPathologicalDiseasesForFileQuery,
  useGetPathologicalDiseasesQuery,
  useSavePathologicalDiseasesMutation,
} from '../../../../services/rtk-query/clinicalApi';
import { Spinner, Stack, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPathologicalDiseases } from '../../../../store/slices/antecedentes';
import { BsSave2 } from 'react-icons/bs';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { pathologicalDiseasesAdapter, payloadToPathologicalSaver } from './utils';
import { useParams } from 'react-router-dom';

const TablaPatologico = () => {
  const { id = null } = useParams();
  const {
    data: pathologicalDiseases,
    isLoading,
    isSuccess,
    isError,
  } = useGetPathologicalDiseasesQuery();
  const {
    data: pathologicalForExpedient,
    isLoading: isLoadingPathological,
    isError: isErrorPathological,
  } = useGetPathologicalDiseasesForFileQuery(id);

  const [savePathologicalDiseases] = useSavePathologicalDiseasesMutation();

  const { patologicos } = useSelector((state) => state.antecedente);
  const dispatch = useDispatch();
  const [subDiases, setSubDiases] = useState({});
  const [selectedTypeCount, setSelectedTypeCount] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClickCard = (id) => {
    setSelectedCard(id === selectedCard ? null : id);
  };

  const handleCheckboxChange = (event, accordionId, diseaseId) => {
    const isChecked = event.target.checked;

    const updatedSelectedCount = { ...subDiases };

    if (isChecked) {
      updatedSelectedCount[accordionId] = updatedSelectedCount[accordionId]
        ? [...updatedSelectedCount[accordionId], { id: diseaseId }]
        : [{ id: diseaseId }];
    } else {
      updatedSelectedCount[accordionId] = updatedSelectedCount[accordionId].filter(
        (item) => item.id !== diseaseId
      );

      if (updatedSelectedCount[accordionId].length === 0) {
        delete updatedSelectedCount[accordionId];
      }
    }
    const checkboxes = document.querySelectorAll(
      `[data-model="hereditary_disease_${accordionId}"]`
    );
    checkboxes.forEach((checkbox) => {
      const textarea = checkbox.closest('tr').querySelector('textarea');
      textarea.disabled = !checkbox.checked;
    });
    setSubDiases(updatedSelectedCount);
  };

  const handleOnChangeInput = (e, enfermedadId, patologicaId) => {
    const updatedSubDiases = { ...subDiases };

    const updatedEnfermedad = updatedSubDiases[enfermedadId]?.map((data) => {
      if (data.id === patologicaId) {
        return {
          ...data,
          comentario: e.target.value,
        };
      }
      return { ...data };
    });

    updatedSubDiases[enfermedadId] = updatedEnfermedad;
    setSubDiases(updatedSubDiases);
  };

  useEffect(() => {
    const typeCount = {};
    Object.entries(subDiases).forEach(([accordionId, diseases]) => {
      const [idEnfermedad] = accordionId.split(':');
      const count = diseases.length;
      typeCount[idEnfermedad] = count;
    });
    setSelectedTypeCount(typeCount);
    const selectedData = Object.keys(subDiases)?.map((accordionId) => {
      const [idEnfermedad] = accordionId.split(':');
      return {
        idEnfermedad: parseInt(idEnfermedad),
        idTipoEnfermedad: subDiases[accordionId],
      };
    });

    const payload = [...selectedData];

    dispatch(setPathologicalDiseases(payload));
  }, [subDiases, dispatch, isLoadingPathological]);

  useEffect(() => {
    if (!isError && isSuccess && !isLoadingPathological && !isErrorPathological) {
      dispatch(
        setPathologicalDiseases(
          pathologicalDiseasesAdapter(pathologicalForExpedient)
        )
      );
    }
    return () => {
      setPathologicalDiseases([]);
    };
  }, [isError, isLoadingPathological, isSuccess]);

  useEffect(() => {
    if (!isLoaded && patologicos && Object.keys(patologicos).length > 0) {
      const transformedData = patologicos.reduce((result, item) => {
        const { idEnfermedad, idTipoEnfermedad } = item;
        const transformedType = idTipoEnfermedad?.map(({ id, comentario }) => ({
          id,
          comentario: comentario ?? '',
        }));

        result[idEnfermedad] = transformedType;
        return result;
      }, {});

      setSubDiases(transformedData);
      setIsLoaded(true);
    }
  }, [isLoaded, patologicos, subDiases]);

  const handleSave = () => {
    setIsDisabled(true);
    const payload = payloadToPathologicalSaver(patologicos, id);
    toastAdapter
      .promise({
        promise: savePathologicalDiseases(payload).unwrap(),
        loadingMessage: 'Guardando...',
        successMessage: 'Se guardó correctamente',
        errorMessage: 'Ocurrió un error al guardar',
      })
      .finally(() => setIsDisabled(false));
  };

  return (
    <Fragment>
      <div className='row gap-3' id='pathologic-disease-table'>
        <div className='row col-md-4'>
          <Button variant='primary' onClick={handleSave} disabled={isDisabled}>
            <BsSave2 /> Guardar
          </Button>
        </div>
        {isLoading && (
          <Stack>
            <p>Cargando...</p>
            <Spinner animation='grow' />
          </Stack>
        )}
        {isError && (
          <Alert variant='danger'>
            Ocurrió un error al cargar las enfermedades patológicas.
          </Alert>
        )}

        {isSuccess &&
          pathologicalDiseases?.map((diasease) => (
            <div key={diasease.id} className='col-12'>
              <div className='accordion' id='accordionPanelsStayOpenExample'>
                <div className='accordion-item'>
                  <h2
                    className='accordion-header'
                    id={`panelsStayOpen-heading-${diasease.id}`}
                  >
                    <button
                      className={`accordion-button ${
                        selectedCard === diasease.id ? '' : 'collapsed'
                      }`}
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapse-${diasease.id}`}
                      aria-expanded={
                        selectedCard === diasease.id ? 'true' : 'false'
                      }
                      aria-controls={`collapse-${diasease.id}`}
                      onClick={() => handleClickCard(diasease.id)}
                    >
                      <div className='card-body d-flex align-items-center py-3'>
                        <img
                          className='me-2'
                          src={`${process.env.PUBLIC_URL}/assets/img/pathologic-diseases/${diasease.id}.svg`}
                          width='45px'
                          alt='pathologic-diseases'
                        />
                        <h5 className='card-title mb-0'>{diasease.nombre}</h5>
                      </div>
                      {selectedTypeCount[diasease.id] > 0 && (
                        <span
                          id={`pathologic-notification-${diasease.id}`}
                          className='position-absolute top-50 translate-middle-y badge rounded-pill bg-danger'
                          style={{ display: 'block', right: '2.5rem' }}
                        >
                          <span className='count'>
                            {selectedTypeCount[diasease.id]}
                          </span>
                        </span>
                      )}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${diasease.id}`}
                    className={`accordion-collapse collapse ${
                      selectedCard === diasease.id ? 'show' : ''
                    }`}
                    aria-labelledby={`panelsStayOpen-heading-${diasease.id}`}
                  >
                    <div className='accordion-body'>
                      <table className='table table-bordered table-striped table-sm'>
                        <thead>
                          <tr>
                            <th>Enfermedades</th>
                            <th>Ha padecido</th>
                            <th>Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {diasease.enfermedadPatologicaCarateristica?.map(
                            (enfermedad) => (
                              <tr>
                                <td>{enfermedad.nombre}</td>
                                <td className='align-middle'>
                                  <div className='form-check form-switch center-x '>
                                    <input
                                      className='form-check-input pathologic-diseases'
                                      type='checkbox'
                                      data-disease={diasease.nombre}
                                      data-model={`hereditary_disease_${diasease.id}`}
                                      name='pathologic-notification'
                                      checked={subDiases[diasease.id]?.some(
                                        (item) => item.id === enfermedad.id
                                      )}
                                      onChange={(event) =>
                                        handleCheckboxChange(
                                          event,
                                          diasease.id,
                                          enfermedad.id
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                                <td className='align-middle'>
                                  <textarea
                                    onChange={(e) =>
                                      handleOnChangeInput(
                                        e,
                                        diasease.id,
                                        enfermedad.id
                                      )
                                    }
                                    value={
                                      subDiases[diasease.id]?.find(
                                        (item) => item.id === enfermedad.id
                                      )?.comentario || ''
                                    }
                                    className='form-control'
                                    style={{ height: '50px' }}
                                    disabled={
                                      !subDiases[diasease.id]?.some(
                                        (item) => item.id === enfermedad.id
                                      )
                                    }
                                  ></textarea>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default TablaPatologico;
