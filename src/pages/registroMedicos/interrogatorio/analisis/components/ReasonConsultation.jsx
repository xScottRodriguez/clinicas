/** @format */

import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { INTERROGATORIO, SLICES_NAMES } from '../../../../../constants';
import FormDiagnostico from '../../../incapacidad/FormDiagnostico';
import { useSearchConsultaByIdQuery } from '../../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';
import { setAnalyzes } from '../../../../../store/slices/interrogatorio';
export const ReasonConsultation = () => {
  const { id = null, consultaId } = useParams();
  const {
    isLoading: isLoad,
    isSuccess,
    data,
    isFetching,
  } = useSearchConsultaByIdQuery(consultaId);
  // clinicalApi.endpoints.searchConsultaById.useQueryState(consultaId);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  useEffect(() => {
    if (!isLoad && isSuccess) {
      // const [info] = data;
      dispatch(setAnalyzes(data?.analisis?.motivoConsulta));
      setContent(data?.analisis?.motivoConsulta);
    }
  }, [isLoad, isSuccess, setContent]);

  return (
    <Stack className='mb-5'>
      <FormDiagnostico
        sliceName={SLICES_NAMES.INTERROGATORIO}
        trans={content}
        title='Motivo de Consulta'
        propertySliceName={INTERROGATORIO.ANALISIS}
      />
    </Stack>
  );
};
