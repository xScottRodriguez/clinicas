/** @format */

import React, { useEffect } from 'react';
import { ExteriosRichText } from './components/ExteriosRichText';
import { clinicalApi } from '../../../../services/rtk-query';
import { setHabitusExterior } from '../../../../store/slices/exploracionFisica';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const FormExterios = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      dispatch(setHabitusExterior(info.habitusExteriores));
    }
  }, [data, dispatch, isFetching, isSuccess]);
  return (
    <div class='tab-content ' id='v-pills-2-tabContent'>
      <div
        classNameName='tab-pane fade show active '
        id='v-pills-2-1'
        role='tabpanel'
        aria-labelledby='v-pills-2-1-tab'
      >
        <ExteriosRichText />
      </div>
    </div>
  );
};

export default FormExterios;
