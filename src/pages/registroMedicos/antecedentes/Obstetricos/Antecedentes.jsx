/** @format */

import React, { Fragment, useEffect } from 'react';
import {
  clinicalApi,
  useGetPregnancyHistoryQuery,
} from '../../../../services/rtk-query/clinicalApi';
import { Alert } from 'react-bootstrap';
import { Loader } from '../../../../components/ui/Loader';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHistoryOfPregnancies } from '../../../../store/slices/obstetricos';
import { useParams } from 'react-router-dom';

export default function Antecedentes() {
  const { id = null } = useParams();
  const { data: pregnancyData, isSuccess: isPregnancySuccess } =
    clinicalApi.endpoints.getObstetricDiseasesForFile.useQueryState(id);
  const { antecedentesEmbarazoPrevios } = useSelector((state) => state.obstetrico);
  const { data, isError, isLoading, isSuccess } = useGetPregnancyHistoryQuery();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [diase, setDiase] = useState([]);

  const handleOnChangeInput = (e, diaseId) => {
    const isChecked = e.target.checked;
    let updatedDiases = [...diase];

    if (isChecked) {
      updatedDiases.push({
        enfermedadId: diaseId,
        comentario: '',
        isChecked: true,
      });
    } else {
      updatedDiases = updatedDiases.filter((item) => item.enfermedadId !== diaseId);
    }
    setDiase(updatedDiases);
  };
  const handleTextareaChange = (e, enfermedadId) => {
    const updatedDiases = diase?.map((item) =>
      item.enfermedadId === enfermedadId
        ? { ...item, comentario: e.target.value }
        : item
    );
    setDiase(updatedDiases);
  };

  const handleCheckboxChange = (e, enfermedadId) => {
    if (!e.target.checked) {
      const updatedDiases = diase?.map((item) =>
        item.enfermedadId === enfermedadId ? { ...item, comentario: '' } : item
      );
      setDiase(updatedDiases);
    }

    handleOnChangeInput(e, enfermedadId);
  };

  useEffect(() => {
    if (isSuccess && isPregnancySuccess) {
      if (!pregnancyData.length) return;
      const [info] = pregnancyData;
      if (!info) return;
      const resp = data
        ?.map((enfermedad) => {
          const itemToReplace = info?.antecedentesEmbarazo?.find(
            (antecedenteEmbarazo) => antecedenteEmbarazo.id === enfermedad.id
          );

          if (!itemToReplace) return enfermedad;

          return {
            enfermedadId: itemToReplace.id,
            comentario: itemToReplace.comentario,
            isChecked: true,
          };
        })
        .filter((item) => item.isChecked);

      setDiase(resp);
    }
  }, [isSuccess, data, isPregnancySuccess, pregnancyData]);

  useEffect(() => {
    if (
      !loaded &&
      antecedentesEmbarazoPrevios &&
      antecedentesEmbarazoPrevios.length > 0
    ) {
      setDiase(antecedentesEmbarazoPrevios);
      setLoaded(true);
    }
  }, [antecedentesEmbarazoPrevios, loaded]);

  useEffect(() => {
    dispatch(setHistoryOfPregnancies(diase));
  }, [diase, dispatch]);

  return (
    <Fragment>
      <p>Antecedentes de los embarazos previos:</p>
      <table className='table  table-striped table-sm mb-5'>
        <thead>
          <tr>
            <th>Enfermedad</th>
            <th style={{ width: '125px' }}>Ha padecido</th>
            <th style={{ width: '35%' }}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Loader />}
          {isError && <Alert variant='danger'>Ha ocurrido un error</Alert>}

          {isSuccess &&
            data?.map((enfermedad) => (
              <tr key={enfermedad.id}>
                <td>{enfermedad.nombre}</td>
                <td className='align-middle'>
                  <div className='form-check form-switch center-x'>
                    <input
                      onChange={(e) => handleCheckboxChange(e, enfermedad.id)}
                      className='form-check-input'
                      data-disease={enfermedad.nombre}
                      data-model={`disease_${enfermedad.id}`}
                      type='checkbox'
                      checked={diase?.some((item) => {
                        return item?.enfermedadId === enfermedad?.id;
                      })}
                      key={enfermedad.id}
                    />
                  </div>
                </td>
                <td className='align-middle'>
                  <textarea
                    className='form-control'
                    disabled={
                      !diase.some((item) => item.enfermedadId === enfermedad.id)
                    }
                    onChange={(e) => handleTextareaChange(e, enfermedad.id)}
                    value={
                      diase.find((item) => item.enfermedadId === enfermedad.id)
                        ?.comentario || ''
                    }
                    style={{ height: '50px' }}
                  ></textarea>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}
