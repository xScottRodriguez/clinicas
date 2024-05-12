/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { useParams } from 'react-router-dom';
import {
  clinicalApi,
  useSearchConsultaByIdQuery,
} from '../../../../../services/rtk-query/clinicalApi';
import { setDescriptions } from '../../../../../store/slices/interrogatorio';
export const DescriptionNotes = () => {
  const { id = null, consultaId } = useParams();
  const { analisis } = useSelector((state) => state.interrogatorio);
  const {
    isLoading: isLoad,
    isSuccess,
    data,
  } = useSearchConsultaByIdQuery(consultaId);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoad && isSuccess && data) {
      dispatch(setDescriptions(data?.analisis?.descripciones));
    }
  }, [isLoad, isSuccess]);

  useEffect(() => {
    if (!isLoading && analisis?.description) {
      setEditorContent(analisis?.description);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, analisis?.description]);
  return (
    <Stack className='mb-5'>
      <FormDiagnostico
        trans={editorContent}
        title='Descripcion'
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.DESCRIPCION}
      />
    </Stack>
  );
};
