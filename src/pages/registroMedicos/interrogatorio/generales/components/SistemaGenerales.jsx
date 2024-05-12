/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import SpeechToText from '../../../../../plugins';
import { requestPermissionMicrofone } from '../../../../../helpers/requestPermitions';
import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import {
  clinicalApi,
  useSearchConsultaByIdQuery,
} from '../../../../../services/rtk-query';
import { setSistemasGenerales } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const SistemaGeneralRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { sistemasGenerales } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setSistemasGenerales(data?.musuculoEsquelitico));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!isLoading && sistemasGenerales) {
      setEditorContent(sistemasGenerales);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, sistemasGenerales]);
  return (
    <Stack>
      <FormDiagnostico
        title='Sistemas Generales'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.SISTEMAS_GENERALES}
      />
    </Stack>
  );
};
