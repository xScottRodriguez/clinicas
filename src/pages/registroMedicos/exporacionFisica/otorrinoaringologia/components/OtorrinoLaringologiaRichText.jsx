/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const OtorrinoLaringologiaRichText = () => {
  const { otorrinoLarigologia } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && otorrinoLarigologia) {
      setEditorContent(otorrinoLarigologia);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, otorrinoLarigologia]);

  return (
    <Stack>
      <FormDiagnostico
        title='Otorrinolaringologia'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.OTO_LARINGOLOGIA}
      />
    </Stack>
  );
};
