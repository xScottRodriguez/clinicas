/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const ExteriosRichText = () => {
  const { habitusExterior } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && habitusExterior) {
      setEditorContent(habitusExterior);
      setIsLoading(true);
    }
  }, [isLoading, habitusExterior]);
  return (
    <Stack>
      <FormDiagnostico
        title='Detalle Complicaciones'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.HABITUS_EXTERIOR}
      />
    </Stack>
  );
};
