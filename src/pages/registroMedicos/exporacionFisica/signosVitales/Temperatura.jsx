/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatura } from '../../../../store/slices/exploracionFisica';
import { clinicalApi } from '../../../../services/rtk-query/clinicalApi';
import { useParams } from 'react-router-dom';

const Temperatura = () => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);

  const dispatch = useDispatch();
  const { signosVitales } = useSelector((state) => state.exploracionFisica);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temperature, setTemperature] = useState(36.5);
  const [temperatureColor, setTemperatureColor] = useState('#4caf50');
  const [temperatureAlert, setTemperatureAlert] = useState('Temperatura Normal');

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const [info] = data;
      if (!info) return;
      const {
        signosVitales: { temperatura },
      } = info;
      dispatch(setTemperatura(temperatura));
      setTemperature(temperatura);
    }
  }, [data, isSuccess, isFetching]);

  useEffect(() => {
    if (!isLoaded && signosVitales?.temperatura) {
      setTemperature(signosVitales?.temperatura);
      setIsLoaded(true);
    }
  }, [isLoaded, signosVitales?.temperatura]);

  const handleTemperatureChange = (e) => {
    const value = parseFloat(e.target.value);
    setTemperature(value);
  };

  const getTemperatureClass = (temperatureValue) => {
    if (temperatureValue < 35) {
      return 'alert-info';
    } else if (temperatureValue > 37.5 && temperatureValue <= 39.5) {
      return 'alert-warning';
    } else if (temperatureValue > 39.5 && temperatureValue <= 41) {
      return 'alert-warning';
    } else if (temperatureValue > 41) {
      return 'alert-danger';
    } else {
      return 'alert-success';
    }
  };
  useEffect(() => {
    const calculateTemperatureProperties = () => {
      let fillPercentage = temperature / 100;
      let fillHeight = fillPercentage * 100;
      let calculatedTemperature = Math.floor(temperature);

      let color = '#4caf50';
      let alertText = 'Temperatura Normal';

      if (calculatedTemperature < 35) {
        color = '#03a9f4';
        alertText = 'Hipotermia';
      } else if (calculatedTemperature > 37.5 && calculatedTemperature <= 39.5) {
        color = '#ff9800';
        alertText = 'Fiebre';
      } else if (calculatedTemperature > 39.5 && calculatedTemperature <= 41) {
        color = '#ff5722';
        alertText = 'Fiebre Alta';
      } else if (calculatedTemperature > 41) {
        color = '#f54753';
        alertText = 'Hipertermia';
      }

      setTemperatureColor(color);
      setTemperatureAlert(alertText);

      return {
        fillHeight,
        calculatedTemperature,
      };
    };

    const updateTemperatureUI = () => {
      const { fillHeight, calculatedTemperature } =
        calculateTemperatureProperties();

      document.getElementById('thermometer-fill').style.height = fillHeight + '%';
      document
        .getElementById('thermometer-bottom')
        .getElementsByTagName('span')[0].textContent = calculatedTemperature;

      document.getElementById('thermometer-fill').style.background =
        temperatureColor;
      document.getElementById('thermometer-bottom').style.background =
        temperatureColor;

      const temperatureAlertElement = document.getElementById(
        'body-temperature-alert'
      );
      temperatureAlertElement.classList.remove(
        'alert-info',
        'alert-success',
        'alert-danger',
        'alert-warning'
      );
      temperatureAlertElement.classList.add(
        getTemperatureClass(calculatedTemperature)
      );
      temperatureAlertElement.textContent = temperatureAlert;
    };
    updateTemperatureUI();

    const temperatureInput = document.getElementById('body-temperature');
    temperatureInput.addEventListener('input', handleTemperatureChange);

    return () => {
      temperatureInput.removeEventListener('input', handleTemperatureChange);
    };
  }, [temperature, temperatureAlert, temperatureColor]);

  return (
    <div className='row mb-5'>
      <div className='mb-3 col-12 col-sm-12'>
        <h4 className='lh-base mb-3'>
          <i className='fas fa-thermometer-half me-2'></i> Temperatura (TM°):
          <p className='text-muted fw-normal small mb-0'>
            La temperatura normal del cuerpo humano es el rango de temperatura
            típico que se encuentra en los humanos.
          </p>
        </h4>

        <div className='row'>
          <div className='col-12'>
            <label htmlFor='body-temperature' className='form-label'>
              Temperatura <span>{temperature.toFixed(2)}</span>°:
            </label>
            <input
              type='range'
              min='0'
              max='100'
              step='.05'
              className='form-range'
              id='body-temperature'
              value={temperature}
              onChange={(e) => {
                dispatch(setTemperatura(e.target.value));
                setTemperature(parseFloat(e.target.value));
              }}
            />
          </div>
        </div>

        <div id='thermometer'>
          <div id='thermometer-top'>
            <div
              id='thermometer-fill'
              style={{
                height: `${temperature}%`,
                background: temperatureColor,
              }}
            ></div>
          </div>
          <div id='thermometer-bottom' style={{ background: temperatureColor }}>
            <span>{Math.floor(temperature)}</span>
          </div>
        </div>

        <div className='row mt-3' id='body-temperature-container'>
          <div className='col-12'>
            <div className='d-flex align-items-center'>
              <img
                src={'/assets/img/vital-signs/temperature.svg'}
                width='45px'
                alt='lungs'
              />
              <div className='ms-2'>
                <p className='fw-bold mb-1'>Temperatura:</p>
                <h1 className='fs-1 mb-0'>
                  <span>{temperature.toFixed(2)}</span>°
                </h1>
              </div>
            </div>
          </div>
          <div className='col-12'>
            <div
              id='body-temperature-alert'
              role='alert'
              className={`alert mt-2 ${getTemperatureClass(
                Math.floor(temperature)
              )}`}
            >
              <b>Paciente:</b> {temperatureAlert}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temperatura;
