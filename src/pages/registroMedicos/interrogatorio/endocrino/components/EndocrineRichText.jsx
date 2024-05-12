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
import { setEndocrine } from '../../../../../store/slices/interrogatorio';
import { useParams } from 'react-router-dom';

export const EndocrineRichText = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess } = useSearchConsultaByIdQuery(consultaId);
  const { endocrino } = useSelector((state) => state.interrogatorio);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const speechToTextRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      if (!data) return;
      dispatch(setEndocrine(data?.endocrino));
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

  const startListeningHandler = () => {
    requestPermissionMicrofone()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        speechToTextRef.current.stopListening();
        setListening(false);
        if (err.message === 'Permission denied') {
          toast.error('Permiso de microfono denegado');
          return;
        }
        if (err.message === 'Permission dismissed') {
          toast.error('Permiso de microfono denegado');
          return;
        }

        toast.error('Error al conceder permiso de microfono');
        return;
      });

    speechToTextRef.current.startListening({
      lang: 'es-ES',
    });
    setListening(true);
  };

  const stopListeningHandler = () => {
    speechToTextRef.current.stopListening();
    setListening(false);
  };

  useEffect(() => {
    if (!listening && !isLoading && endocrino) {
      setEditorContent(endocrino);
      setIsLoading(true);
    }

    if (!listening && finalTranscript) {
      setEditorContent(finalTranscript);
    }
  }, [dispatch, isLoading, listening, endocrino, finalTranscript]);
  return (
    <Stack>
      <FormDiagnostico
        title='Endocrino'
        trans={editorContent}
        sliceName={SLICES_NAMES.INTERROGATORIO}
        propertySliceName={INTERROGATORIO.ENDOCRINO}
      />
    </Stack>
  );
};
