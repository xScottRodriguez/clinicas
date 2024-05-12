/** @format */

import React, { Fragment, useState } from 'react';
import TablaAlergias from './TablaAlergias';
import { Button } from 'react-bootstrap';
import { BsSave2 } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useSaveAllergiesMutation } from '../../../../services/rtk-query/clinicalApi';
import { formatAlergias } from '../../../../components/medical-records/utils/background-formatter';
import { useSelector } from 'react-redux';
import { toastAdapter } from '../../../../plugins';
import { LiaAllergiesSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';

export default function Alergias() {
  const { id = null } = useParams();
  const { alergias: allergies } = useSelector((state) => state.antecedente);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [saveAllergies] = useSaveAllergiesMutation();

  const handleSaveAllergies = async () => {
    setIsDisableButton(true);
    const formattedAllergies = formatAlergias(allergies);
    const newFormattedAllergies = formattedAllergies.filter(
      (alergia) => alergia !== null
    );

    if (!newFormattedAllergies.length) {
      setIsDisableButton(false);
      return toast.error('Seleccione al menos una alergia');
    }

    const existsSymptoms = newFormattedAllergies.every(
      (alergia) => alergia.sintomas?.length
    );
    if (!existsSymptoms) {
      setIsDisableButton(false);
      return toast.error('Seleccione al menos un sintoma');
    }

    toastAdapter
      .promise({
        promise: saveAllergies({
          expedienteId: id,
          alergias: newFormattedAllergies,
        }).unwrap(),
        loadingMessage: 'Guardando alergias',
        successMessage: 'Alergias guardadas',
        errorMessage: 'Error al guardar alergias',
      })
      .catch((error) => console.log(error))
      .finally(() => setIsDisableButton(false));

    // if (isLoading) toast.loading('Guardando alergias');
    // if (isError) toast.error('Error al guardar alergias');
    // if (data) toast.success('Alergias guardadas');
  };
  return (
    <div className='tab-content' id='v-pills-1-tabContent'>
      <div
        className='tab-panel fade show active container'
        id='v-pills-1-0'
        role='tabpanel'
        aria-labelledby='v-pills-1-0-tab'
      >
        <h4 className='lh-base mb-3'>
          <p>
            Alergias <LiaAllergiesSolid />
          </p>
          <p className='text-muted fw-normal small mb-0'>
            La alergia es una susceptibilidad especial de algunas personas que hace
            que respondan de una forma exagerada ante la exposición a uno o varios
            elementos externos o alérgenos.
          </p>
        </h4>

        <div id='allergies-table'>
          <h6 className='  mb-2'>Seleccione las alergias y agregue sus sintomas</h6>
          <Button
            variant='primary'
            className='my-2 align-items-center'
            onClick={handleSaveAllergies}
            disabled={isDisableButton}
          >
            <BsSave2 /> Guardar Sintomas de Alergias
          </Button>
          <TablaAlergias />
        </div>
      </div>
    </div>
  );
}
