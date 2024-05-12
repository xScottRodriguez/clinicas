/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner, Stack } from 'react-bootstrap';
import {
  useGetHereditariesForFileQuery,
  useGetHereditaryDiseasesQuery,
  useGetRelationShipToDiseasesQuery,
  useSaveHereditaryMutation,
} from '../../../../services/rtk-query/clinicalApi';
import { setHereditaryDiseases } from '../../../../store/slices/antecedentes';
import { useDispatch, useSelector } from 'react-redux';
import { BsSave2 } from 'react-icons/bs';
import { formatHereditario } from '../../../../components/medical-records/utils/background-formatter';
import {
  filterRelationshipWithEmptyArray,
  mapToLoadData,
  mapUpdateDataToHereditary,
} from './utils';
import { toastAdapter } from '../../../../plugins/hot-toast.plugin';
import { useParams } from 'react-router-dom';
const TablaHeredado = (props) => {
  const { id = null } = useParams();
  const [saveHereditary] = useSaveHereditaryMutation();
  const [isDisableButton, setIsDisableButton] = useState(false);
  const { data, isLoading, isError, isSuccess } = useGetHereditaryDiseasesQuery('');
  const {
    data: dataRelationShip,
    isLoading: isLoadingRelationShip,
    isError: isErrorRelationShip,
    isSuccess: isSuccessRelationShip,
  } = useGetRelationShipToDiseasesQuery();

  const {
    data: expedientHereditary,
    isLoading: isLoadingHereditary,
    isSuccess: isSuccessExpedient,
  } = useGetHereditariesForFileQuery(id);

  const { hereditario } = useSelector((state) => state.antecedente);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isSuccess && isSuccessRelationShip && hereditario) {
      const updatedData = mapUpdateDataToHereditary(data, dataRelationShip);
      setDataTable(updatedData);
    }
  }, [isSuccess, isSuccessRelationShip, isSuccessExpedient]);

  useEffect(() => {
    if (!isLoaded && hereditario && Object.keys(hereditario).length) {
      let hereditaryFormatted;
      if (!isLoadingHereditary) {
        hereditaryFormatted = mapToLoadData(hereditario, expedientHereditary);
      } else {
        hereditaryFormatted = hereditario;
      }

      setDataTable(hereditaryFormatted);
      setIsLoaded(true);

      hereditario.forEach((enfermedad) => {
        enfermedad.familiares.forEach((familiar) => {
          if (familiar.isChecked) {
            setCounterTree(familiar.valor, familiar.isChecked);
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hereditario]);

  const onChangeCheckboxes = (e, enfermedad, parentesco) => {
    const checkboxId = parentesco.id;
    const updatedDataTable = dataTable?.map((data) => {
      if (enfermedad.id === data.id) {
        const updatedFamiliares = data.familiares?.map((familiar) => {
          if (familiar.id === checkboxId) {
            return {
              ...familiar,
              isChecked: e.target.checked,
            };
          }
          return familiar;
        });
        return {
          ...data,
          familiares: updatedFamiliares,
        };
      }
      return data;
    });
    setDataTable(updatedDataTable);

    setCounterTree(parentesco.valor, e.target.checked);
  };

  const onChangeInput = (e, enfermedadId) => {
    const updatedDataTable = dataTable?.map((enfermedad) => {
      if (enfermedad.id === enfermedadId) {
        return { ...enfermedad, descripcion: e.target.value };
      }
      return enfermedad;
    });
    setDataTable(updatedDataTable);
  };

  useEffect(() => {
    dispatch(setHereditaryDiseases(dataTable));
  }, [dataTable, dispatch]);

  const setCounterTree = (parentesco, isChecked) => {
    const functionMapping = {
      Abuelos: {
        true: props.abuelos,
        false: props.desAbuelos,
      },
      Padres: {
        true: props.contador,
        false: props.des,
      },
      Tios: {
        true: props.tios,
        false: props.desTio,
      },
      Hermanos: {
        true: props.hermanos,
        false: props.desHermanos,
      },
      Primos: {
        true: props.primos,
        false: props.desPrimos,
      },
    };
    const func = functionMapping[parentesco][String(isChecked)];
    if (func) {
      func();
    }
  };
  const handleSave = () => {
    setIsDisableButton(true);
    const formatedHereditaryArr = formatHereditario(hereditario);
    const relationShips = filterRelationshipWithEmptyArray(formatedHereditaryArr);
    const payload = {
      expedienteId: id,
      hereditario: relationShips,
    };
    toastAdapter
      .promise({
        promise: saveHereditary(payload).unwrap(),
        loadingMessage: 'Guardando Parentesco...',
        successMessage: 'Parentescos guardadas',
        errorMessage: 'Error al guardar Parentescos',
      })
      .finally(() => {
        setIsDisableButton(false);
      });
  };
  return (
    <div className='d-block w-100'>
      <Button
        variant='primary'
        className='my-2'
        onClick={handleSave}
        disabled={isDisableButton}
      >
        <BsSave2 /> Guardar
      </Button>
      <p className='text-muted fw-normal small mb-2'>
        Seleccione las enfermedades hereditarias del paciente
      </p>
      {isError ||
        (isErrorRelationShip && (
          <Alert variant='danger'>
            Ocurrio un error al cargar las enfermedades
          </Alert>
        ))}
      <table className='table table-bordered table-striped '>
        <thead>
          <tr>
            {isSuccess && isSuccessRelationShip && (
              <>
                <th>Enfermedad</th>
                {dataRelationShip?.map((relationShip) => (
                  <th key={relationShip.id}>{relationShip.valor}</th>
                ))}
                <th>Descripción</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {isLoading && isLoadingRelationShip && (
            <tr>
              <Stack>
                <p>Cargando...</p>
                <Spinner animation='grow' />
              </Stack>
            </tr>
          )}
          {isSuccess &&
            isSuccessRelationShip &&
            dataTable?.map((enfermedadHereditaria) => (
              <tr>
                <td>{enfermedadHereditaria.nombre}</td>
                {enfermedadHereditaria?.familiares?.map((relationShip) => (
                  <td className='align-middle' key={relationShip.id}>
                    <Form.Check
                      type='switch'
                      onChange={(e) =>
                        onChangeCheckboxes(e, enfermedadHereditaria, relationShip)
                      }
                      checked={relationShip.isChecked}
                    />
                  </td>
                ))}

                <td className='align-middle'>
                  <Form.Control
                    as='textarea'
                    onChange={(e) => onChangeInput(e, enfermedadHereditaria.id)}
                    value={enfermedadHereditaria.descripcion}
                    type='text'
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaHeredado;
