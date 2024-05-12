/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const CuelloRichText = () => {
  const { cuello } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && cuello) {
      setEditorContent(cuello);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, cuello]);
  return (
    <Stack>
      <FormDiagnostico
        title='Cuello'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.CUELLO}
      />
    </Stack>
  );
};
