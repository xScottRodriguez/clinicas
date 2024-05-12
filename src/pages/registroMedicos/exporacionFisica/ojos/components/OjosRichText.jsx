/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const OjosRichText = () => {
  const { ojos } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && ojos) {
      setEditorContent(ojos);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, ojos]);
  return (
    <Stack>
      <FormDiagnostico
        title='Ojos'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.OJOS}
      />
    </Stack>
  );
};
