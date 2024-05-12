/** @format */

import React, { Fragment } from 'react';
import FormCardiaca from './FormCardiaca';
import FormPresion from './FormPresion';
import FormRespiratoria from './FormRespiratoria';
import Glucosas from './Glucosas';
import Oxigeno from './Oxigeno';
import Temperatura from './Temperatura';

export default function FormSignosVitales() {
  return (
    <Fragment>
      <div className='tab-content ' id='v-pills-2-tabContent'>
        <div
          className='tab-pane fade show active'
          id='v-pills-2-0'
          role='tabpanel'
          aria-labelledby='v-pills-2-0-tab'
        >
          <FormPresion />
          {/* Frecuencia cardiaca */}
          <FormCardiaca />
          {/* FormRespiratoria */}
          <FormRespiratoria />
          {/*  temperatura*/}
          <Temperatura />
          <Glucosas />
          {/* Oxigen */}
          <Oxigeno />
        </div>
      </div>
    </Fragment>
  );
}
