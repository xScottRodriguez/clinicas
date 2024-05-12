/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormDiagnostico from '../../../incapacidad/FormDiagnostico';

import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import { useSearchConsultaByIdQuery } from '../../../../../services/rtk-query';
import { setCardioVascular } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const CardioRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { cardioVascular } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setCardioVascular(data?.cardiovascular));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isLoading && cardioVascular) {
      setEditorContent(cardioVascular);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, cardioVascular]);
  return (
    <Stack>
      <FormDiagnostico
        title='Cardio Vascular'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.CARDIO_VASCULAR}
      />
    </Stack>
  );
};
