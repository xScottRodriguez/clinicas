/** @format */

import React from 'react';
import Alteraciones from './Alteraciones';
import AntecedentesG from './AntecedentesG';
import Anticonceptivos from './Anticonceptivos';
import CalculoPArto from './CalculoPArto';
import PosiblesDiagnostico from './PosiblesDiagnostico';
import { CustomTable } from '../../../../components/ginecologicos/CustomTable';
import {
  useGetGinecologicalForFileQuery,
  useGetSexuallyTransmittedDiseasesQuery,
  useSaveGinecologicalMutation,
} from '../../../../services/rtk-query';
import { Loader } from '../../../../components/ui/Loader';
import { Alert, Button } from 'react-bootstrap';
import { LiaTransgenderSolid } from 'react-icons/lia';
import { LuCalendarCheck } from 'react-icons/lu';
import { TbDropletOff } from 'react-icons/tb';
import { BsSave } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { formatGinecologicos } from './utils';
import { toastAdapter } from '../../../../plugins';
import { useParams } from 'react-router-dom';

export default function FormGinecológicos() {
  const { id = null, consultaId } = useParams();

  useGetGinecologicalForFileQuery(consultaId);
  const { data, isError, isSuccess, isLoading } =
    useGetSexuallyTransmittedDiseasesQuery();
  const [saveMutation] = useSaveGinecologicalMutation();
  const { ginecologicos } = useSelector((state) => state.antecedente);

  const handleSaveGinecologicos = () => {
    if (!ginecologicos)
      toastAdapter.info({
        message: 'No se encontraron datos ginecológicos',
      });

    const data = formatGinecologicos(ginecologicos);
    const payload = {
      ...data,
      expedienteId: id,
    };

    toastAdapter.promise({
      promise: saveMutation(payload).unwrap(),
      errorMessage: 'Error al intentar guardar los antecedentes ginecologicos',
      loadingMessage: 'Guardando Antecedentes Ginecologicos',
      successMessage: 'Antecedentes Ginecologicos Guardados',
    });
  };

  return (
    <div className='tab-content ' id='v-pills-1-tabContent'>
      <div
        className='tab-pane fade show active'
        id='v-pills-1-5'
        role='tabpanel'
        aria-labelledby='v-pills-1-5-tab'
      >
        <h5 className='mb-3'>
          <LiaTransgenderSolid size={30} />
          Antecedentes Ginecológicos
          <p className='text-muted fw-normal small mb-0'>
            Recopilación de información sobre la salud reproductiva de una mujer.
          </p>
        </h5>
        <AntecedentesG />
        <h5 className='mb-3'>
          <LuCalendarCheck /> Calculo de parto y edad gestional
        </h5>
        <CalculoPArto />
        <h4 className='mb-3'>
          <TbDropletOff /> Alteraciones De La Menstruación
        </h4>
        <Alteraciones />
        {/* Posibles diagnostico */}
        <PosiblesDiagnostico />

        {/* <ETS /> */}
        {isLoading && <Loader />}
        {isError && (
          <Alert variant='danger'>
            Ocurrio un error al cargar las enfermedades
          </Alert>
        )}
        {isSuccess && <CustomTable diseases={data} />}
        <Anticonceptivos />

        <Button
          variant='primary'
          type='button'
          className='position-relative my-5 btn-lg'
          onClick={handleSaveGinecologicos}
        >
          <BsSave /> Guardar{' '}
        </Button>
      </div>
    </div>
  );
}
