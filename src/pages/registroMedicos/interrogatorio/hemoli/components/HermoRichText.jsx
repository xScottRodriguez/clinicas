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
import { setHermoLinfatico } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const HermoRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { hermolinfatico } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const speechToTextRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setHermoLinfatico(data?.hemolinfatico));
    }
  }, [data, isSuccess]);

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
    if (!listening && !isLoading && hermolinfatico) {
      setEditorContent(hermolinfatico);
      setIsLoading(true);
    }

    if (!listening && finalTranscript) {
      setEditorContent(finalTranscript);
    }
  }, [dispatch, isLoading, listening, hermolinfatico, finalTranscript]);
  return (
    <Stack>
      <FormDiagnostico
        title='Hermolinfatico'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.HERMOLINFATICO}
      />
    </Stack>
  );
};
