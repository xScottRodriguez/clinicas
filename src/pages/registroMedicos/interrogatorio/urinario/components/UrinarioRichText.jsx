/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import SpeechToText from '../../../../../plugins';

import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import { useSearchConsultaByIdQuery } from '../../../../../services/rtk-query';
import { setUrinario } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const UrinarioRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);

  const { urinario } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setUrinario(data?.urinario));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!isLoading && urinario) {
      setEditorContent(urinario);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, urinario]);
  return (
    <Stack>
      <FormDiagnostico
        title='Urinario'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.URINARIO}
      />
    </Stack>
  );
};
