/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const ExtremidadesRichText = () => {
  const { extremidades } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && extremidades) {
      setEditorContent(extremidades);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, extremidades]);
  return (
    <Stack>
      <FormDiagnostico
        title='Extremidades'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.EXTREMIDADES}
      />
    </Stack>
  );
};
