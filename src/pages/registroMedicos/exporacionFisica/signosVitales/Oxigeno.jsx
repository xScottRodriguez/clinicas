/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOxigeno } from '../../../../store/slices/exploracionFisica';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';
export default function Oxigeno() {
  const { id = null, consultaId } = useParams();
  const { data, isFetching, isSuccess } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const dispatch = useDispatch();
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saturacionOxigeno, setSaturacionOxigeno] = useState(15);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      const {
        signosVitales: { saturacionOxigeno },
      } = info;
      dispatch(setOxigeno(saturacionOxigeno));
      setSaturacionOxigeno(saturacionOxigeno);
    }
  }, [data, isFetching, isSuccess]);

  const handleOxigeno = (e) => {
    dispatch(setOxigeno(e.target.value));
    setSaturacionOxigeno(e.target.value);
  };
  useEffect(() => {
    if (!isLoaded && signosVitales?.saturacionoxigeno) {
      setSaturacionOxigeno(signosVitales?.saturacionoxigeno);
      setIsLoaded(true);
    }
  }, [isLoaded, signosVitales?.saturacionoxigeno]);

  return (
    <Fragment>
      <div className='row mb-5'>
        <div className='mb-3 col-12 col-sm-12'>
          <h4 className='lh-base mb-3'>
            <i className='fas fa-microscope me-2'></i> Saturación de Oxígeno
            (SatO2):
            <p className='text-muted fw-normal small mb-0'>
              Consite en medir el nivel de oxígeno en la sangre.
            </p>
          </h4>

          <div className='row'>
            <div className='col-12'>
              <label htmlFor='oxygen-saturation' className='form-label'>
                Saturación de Oxígeno :{' '}
                <strong id='oxygen-saturation-title'>{saturacionOxigeno}</strong>
              </label>
              <input
                type='range'
                min='5'
                max='100'
                value={saturacionOxigeno}
                onChange={handleOxigeno}
                className='form-range'
                id='oxygen-saturation'
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
