/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../../../constants';
export const NotasHabitacion = () => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && noPatologicos?.tipoHabitacionAndHacinamiento) {
      setEditorContent(noPatologicos.tipoHabitacionAndHacinamiento);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, noPatologicos.tipoHabitacionAndHacinamiento]);

  return (
    <FormDiagnostico
      title='Tipo de habitación y hacinamiento:'
      sliceName={SLICES_NAMES.ANTECEDENTES}
      trans={editorContent}
      propertySliceName={ANTECEDENTES_VIEWS.ROOM_TYPE_AND_OVERCROWDING}
    />
  );
};
