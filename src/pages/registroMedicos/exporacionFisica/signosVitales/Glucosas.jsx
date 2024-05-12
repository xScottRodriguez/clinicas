/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { setGlucomeriaCapilar } from '../../../../store/slices/exploracionFisica';
import { useDispatch, useSelector } from 'react-redux';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';
export default function Glucosas() {
  const { id = null, consultaId } = useParams();
  const { isSuccess, isFetching, data } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const dispatch = useDispatch();
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);
  const [glucemia, setGlucemia] = useState(15);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      const {
        signosVitales: { glucometriaCapilar },
      } = info;
      dispatch(setGlucomeriaCapilar(glucometriaCapilar));
      setGlucemia(glucometriaCapilar);
    }
  }, [data, isFetching, isSuccess]);

  const handleGlucosas = (e) => {
    dispatch(setGlucomeriaCapilar(e.target.value));
    setGlucemia(e.target.value);
  };

  useEffect(() => {
    if (!isLoaded && signosVitales?.glucomeriaCapilar) {
      setGlucemia(signosVitales?.glucomeriaCapilar);
      setIsLoaded(true);
    }
  }, [isLoaded, signosVitales?.glucomeriaCapilar]);

  return (
    <Fragment>
      <div className='row mb-5'>
        <div className='mb-3 col-12 col-sm-12'>
          <h4 className='lh-base mb-3'>
            <i className='fas fa-tint me-2'></i> Glucometría Capilar:
            <p className='text-muted fw-normal small mb-0'>
              La glucosa capilar  es la cantidad de azúcar en la sangre que puede
              ser verificada a través del análisis de una gota de sangre en el dedo.
            </p>
          </h4>

          <div className='row'>
            <div className='col-12'>
              <label htmlFor='capillary-glucemia' className='form-label'>
                Glucometría Capilar :{' '}
                <strong id='capillary-glucemia-title'>{glucemia}</strong>
              </label>
              <input
                type='range'
                min='5'
                max='100'
                value={glucemia}
                className='form-range'
                id='capillary-glucemia'
                onChange={handleGlucosas}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
