/** @format */

import React from 'react';
import Antecedentes from './Antecedentes';
import DatosGenerales from './DatosGenerales';
import Formulas from './Formulas';
import EnfermedadesyDatosGe from './EnfermedadesyDatosGe';
import { Button } from 'react-bootstrap';
import { BsSave2 } from 'react-icons/bs';
import { formatObstetricos } from './utils';
import { useSelector } from 'react-redux';
import {
  useGetObstetricDiseasesForFileQuery,
  useSaveObstetricMutation,
} from '../../../../services/rtk-query';
import { toastAdapter } from '../../../../plugins';
import { useParams } from 'react-router-dom';

export default function FormPrincipa() {
  const { id = null } = useParams();
  const obstetricos = useSelector((state) => state.obstetrico);
  useGetObstetricDiseasesForFileQuery(id);
  const [saveObstetric] = useSaveObstetricMutation();
  const handleSave = () => {
    const data = formatObstetricos(obstetricos);
    const payload = {
      expedienteId: id,
      ...data,
    };
    toastAdapter.promise({
      promise: saveObstetric(payload).unwrap(),
      successMessage: 'Datos Obstetricos guardados correctamente',
      errorMessage: 'Error al guardar los datos Obstetricos',
      loadingMessage: 'Guardando datos Obstetricos',
    });
  };
  return (
    <div className='tab-content ' id='v-pills-1-tabContent'>
      <div
        className='tab-pane fade show active'
        id='v-pills-1-6'
        role='tabpanel'
        aria-labelledby='v-pills-1-6-tab'
      >
        <DatosGenerales />

        {/* Formula obstetrica */}
        <Formulas />
        {/* Antecedentes */}
        <Antecedentes />
        <EnfermedadesyDatosGe />
      </div>

      <Button variant='primary' size='lg' onClick={handleSave}>
        <BsSave2 /> Guardar Datos Obstetricos
      </Button>
    </div>
  );
}
