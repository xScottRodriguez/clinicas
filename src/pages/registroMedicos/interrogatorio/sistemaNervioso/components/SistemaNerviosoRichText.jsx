/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import { useSearchConsultaByIdQuery } from '../../../../../services/rtk-query';
import { useParams } from 'react-router-dom';
import { setSistemaNervioso } from '../../../../../store/slices/interrogatorio';

export const SistemaNerviosoRichText = () => {
  const { consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { sistemaNervioso } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setSistemaNervioso(data?.sistemaNervioso));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (!isLoading && sistemaNervioso) {
      setEditorContent(sistemaNervioso);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, sistemaNervioso]);
  return (
    <Stack>
      <FormDiagnostico
        title='Sistema Nervioso'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.SISTEMA_NERVIOSO}
      />
    </Stack>
  );
};
