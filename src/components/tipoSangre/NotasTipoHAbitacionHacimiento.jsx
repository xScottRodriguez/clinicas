/** @format */
import React, { useEffect, useState } from 'react';
import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { useDispatch, useSelector } from 'react-redux';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../constants';
export const NotasHabitos = () => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && noPatologicos?.habitosHiene) {
      setEditorContent(noPatologicos.habitosHiene);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, noPatologicos.habitosHiene]);

  return (
    <FormDiagnostico
      sliceName={SLICES_NAMES.ANTECEDENTES}
      trans={editorContent}
      propertySliceName={ANTECEDENTES_VIEWS.HYGIENE_HABITS}
    />
  );
};
