/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const ExploracionGinecologicaRichText = () => {
  const { exploracionGinecologica } = useSelector(
    (state) => state.exploracionFisica
  );

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && exploracionGinecologica) {
      setEditorContent(exploracionGinecologica);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, exploracionGinecologica]);
  return (
    <Stack>
      <FormDiagnostico
        title='Exploración Ginecológica'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.EXPLORACION_GINECOLOGICA}
      />
    </Stack>
  );
};
