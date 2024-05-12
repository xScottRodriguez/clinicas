/** @format */
import React, { useEffect, useState } from 'react';
import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { useDispatch, useSelector } from 'react-redux';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../constants';

export const NotasTipoAlimentacion = () => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && noPatologicos?.habitosAlimenticios) {
      setEditorContent(noPatologicos.habitosAlimenticios);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, noPatologicos.habitosAlimenticios]);

  return (
    <>
      <FormDiagnostico
        title='Tipo de alimentación y consumo de agua'
        sliceName={SLICES_NAMES.ANTECEDENTES}
        trans={editorContent}
        propertySliceName={ANTECEDENTES_VIEWS.EATING_HABITS}
      />
    </>
  );
};
