/** @format */

import React, { useState } from 'react';
import Antecedentes from './Antecedentes';
import TablaHeredado from './TablaHeredado';
import { PiDnaThin } from 'react-icons/pi';

const FormPrincipalHereditario = () => {
  const [contador, setContador] = useState(0);
  const [abuelos, setAbuelos] = useState(0);
  const [hermanos, setHermanos] = useState(0);
  const [tios, setTios] = useState(0);
  const [primos, setPrimos] = useState(0);

  const contadores = () => {
    setContador((prevContador) => prevContador + 1);
  };

  const descontador = () => {
    setContador((prevContador) => prevContador - 1);
  };

  const incrementarTio = () => {
    setTios((prevTios) => prevTios + 1);
  };

  const desTio = () => {
    setTios((prevTios) => prevTios - 1);
  };

  const incrementarHermanos = () => {
    setHermanos((prevHermanos) => prevHermanos + 1);
  };

  const desHermanos = () => {
    setHermanos((prevHermanos) => prevHermanos - 1);
  };

  const incrementarAbuelos = () => {
    setAbuelos((prevAbuelos) => prevAbuelos + 1);
  };

  const desAbuelos = () => {
    setAbuelos((prevAbuelos) => prevAbuelos - 1);
  };

  const incrementarPrimos = () => {
    setPrimos((prevPrimos) => prevPrimos + 1);
  };

  const desPrimo = () => {
    setPrimos((prevPrimos) => prevPrimos - 1);
  };

  return (
    <div className='tab-content ' id='v-pills-1-1-tabContent'>
      <div
        className='tab-pane fade show active'
        id='v-pills-1-1'
        role='tabpanel'
        aria-labelledby='v-pills-1-1-tab'
      >
        <h5 className='lh-base mb-3'>
          <PiDnaThin size={24} /> Enfermedades Hereditarias
          <p className='text-muted fw-normal small mb-0'>
            En este apartado se describe cualquier padecimiento de los familiares de
            línea directa del paciente (abuelos, padres, hermanos, tíos y primos
            sanguíneos no políticos).
          </p>
        </h5>

        <>
          <Antecedentes
            abuelos={abuelos}
            tios={tios}
            hermanos={hermanos}
            prim={primos}
            cont={contador}
          />
          <TablaHeredado
            tios={incrementarTio}
            desTio={desTio}
            hermanos={incrementarHermanos}
            desHermanos={desHermanos}
            abuelos={incrementarAbuelos}
            desAbuelos={desAbuelos}
            desPrimos={desPrimo}
            primos={incrementarPrimos}
            des={descontador}
            contador={contadores}
          />
        </>
      </div>
    </div>
  );
};

export default FormPrincipalHereditario;
