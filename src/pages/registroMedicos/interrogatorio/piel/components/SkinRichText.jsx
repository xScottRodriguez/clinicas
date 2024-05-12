/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import SpeechToText from '../../../../../plugins';

import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import { useSearchConsultaByIdQuery } from '../../../../../services/rtk-query';
import { setSkin } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const SkinRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { skin } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const speechToTextRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setSkin(data?.pielAnexos));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    speechToTextRef.current = new SpeechToText(handleFinalised);

    return () => {
      speechToTextRef.current.stopListening();
      setListening(false);
    };
  }, []);

  const handleFinalised = (transcript) => {
    setFinalTranscript(transcript);
  };

  useEffect(() => {
    if (!listening && !isLoading && skin) {
      setEditorContent(skin);
      setIsLoading(true);
    }

    if (!listening && finalTranscript) {
      setEditorContent(finalTranscript);
    }
  }, [dispatch, isLoading, listening, skin, finalTranscript]);
  return (
    <Stack>
      <FormDiagnostico
        title='Piel y Anexos'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.SKIN}
      />
    </Stack>
  );
};
