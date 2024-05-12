/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const ToraxRichText = () => {
  const { torax } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && torax) {
      setEditorContent(torax);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, torax]);
  return (
    <Stack>
      <FormDiagnostico
        title='Torax'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.TORAX}
      />
    </Stack>
  );
};
