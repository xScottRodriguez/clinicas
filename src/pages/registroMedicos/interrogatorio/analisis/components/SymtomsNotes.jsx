/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { useParams } from 'react-router-dom';
import {
  clinicalApi,
  useSearchConsultaByIdQuery,
} from '../../../../../services/rtk-query/clinicalApi';
import { setSymptoms } from '../../../../../store/slices/interrogatorio';
export const SymtomsNotes = () => {
  const { id = null, consultaId } = useParams();
  const {
    isLoading: isLoad,
    isSuccess,
    data,
  } = useSearchConsultaByIdQuery(consultaId);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoad && isSuccess) {
      if (!data) return;
      dispatch(setSymptoms(data?.analisis?.sintomas));
      setEditorContent(data?.analisis?.sintomas);
    }
  }, [isSuccess, isLoad]);

  return (
    <Stack className='mb-5'>
      <FormDiagnostico
        trans={editorContent}
        title='Sintomas'
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.SINTOMAS}
      />
    </Stack>
  );
};
