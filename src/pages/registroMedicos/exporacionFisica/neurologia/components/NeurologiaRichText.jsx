/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const NeurologiaRichText = () => {
  const { exploracionNeurologica } = useSelector(
    (state) => state.exploracionFisica
  );

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && exploracionNeurologica) {
      setEditorContent(exploracionNeurologica);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, exploracionNeurologica]);
  return (
    <Stack>
      <FormDiagnostico
        title='Exploracion Neurologica'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.EXPLORACION_NEUROLOGICA}
      />
    </Stack>
  );
};
