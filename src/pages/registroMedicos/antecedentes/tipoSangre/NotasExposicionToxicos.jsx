/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDiagnostico from '../../incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../../../constants';
export const NotasExposicionToxicos = () => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!isLoading && noPatologicos?.exposicionToxicos) {
      setEditorContent(noPatologicos.exposicionToxicos);
      setIsLoading(true);
    }
  }, [dispatch, isLoading, noPatologicos.exposicionToxicos]);

  return (
    <FormDiagnostico
      title='Exposición a tóxicos:'
      sliceName={SLICES_NAMES.ANTECEDENTES}
      trans={editorContent}
      propertySliceName={ANTECEDENTES_VIEWS.EXPOSURE_TO_TOXICS}
    />
  );
};
