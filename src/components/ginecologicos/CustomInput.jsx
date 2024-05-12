/** @format */

import React, { useEffect, useState } from 'react';
import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
export const CustomInput = () => {
  const { ginecologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && ginecologicos?.anticoncepcion?.observaciones) {
      setEditorContent(ginecologicos?.anticoncepcion?.observaciones);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, ginecologicos?.anticoncepcion?.observaciones]);

  return (
    <FormDiagnostico
      title='Observaciones'
      sliceName={SLICES_NAMES.ANTECEDENTES}
      propertySliceName={ANTECEDENTES_VIEWS.ANTICONCEPCION}
      trans={editorContent}
    />
  );
};
