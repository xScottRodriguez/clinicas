/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { OBSTETRICOS, SLICES_NAMES } from '../../constants';

export const FormWithSpeech = () => {
  const { embarazoActual } = useSelector((state) => state.obstetrico);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && embarazoActual) {
      setEditorContent(embarazoActual);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, embarazoActual]);
  return (
    <Stack>
      <FormDiagnostico
        title='Datos Generales del Embarazo Actual:'
        trans={editorContent}
        sliceName={SLICES_NAMES.OBSTETRICO}
        propertySliceName={OBSTETRICOS.EMBARAZO_ACTUAL}
      />
    </Stack>
  );
};
