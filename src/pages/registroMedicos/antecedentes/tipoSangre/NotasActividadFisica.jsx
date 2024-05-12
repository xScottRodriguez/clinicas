/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../../../constants';
export const NotasActividadFisica = () => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && noPatologicos?.actividadFisicaAndDream) {
      setEditorContent(noPatologicos.actividadFisicaAndDream);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, noPatologicos.actividadFisicaAndDream]);

  return (
    <FormDiagnostico
      title='Actividad física y sueño:'
      sliceName={SLICES_NAMES.ANTECEDENTES}
      trans={editorContent}
      propertySliceName={ANTECEDENTES_VIEWS.PHYSICAL_ACTIVITY}
    />
  );
};
