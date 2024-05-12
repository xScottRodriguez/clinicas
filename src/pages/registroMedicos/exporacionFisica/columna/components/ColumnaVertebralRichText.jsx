/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { EXPLORACION_FISICA, SLICES_NAMES } from '../../../../../constants';

export const ColumnaVertebralRichText = () => {
  const { columnaVertebral } = useSelector((state) => state.exploracionFisica);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && columnaVertebral) {
      setEditorContent(columnaVertebral);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, columnaVertebral]);
  return (
    <Stack>
      <FormDiagnostico
        title='Columna Vertebral'
        trans={editorContent}
        sliceName={SLICES_NAMES.EXPLORACION_FISICA}
        propertySliceName={EXPLORACION_FISICA.COLUMNA_VERTEBRAL}
      />
    </Stack>
  );
};
