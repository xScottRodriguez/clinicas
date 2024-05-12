/** @format */

import React, { Fragment } from 'react';
import TablaPatologico from './TablaPatologico';
import { PiVirusLight } from 'react-icons/pi';

const FormPrincipalPatologico = () => {
  return (
    <Fragment>
      <div className='tab-content ' id='v-pills-1-2-tabContent'>
        <div
          className='tab-panel fade show active p-2'
          id='v-pills-1-2'
          role='tabpanel'
          aria-labelledby='v-pills-1-2-tab'
        >
          <h4 className='lh-base mb-3'>
            <PiVirusLight size={24} /> Patológicos
            <p className='text-muted fw-normal small mb-0'>
              Investigan las enfermedades que ha padecido el paciente desde la
              infancia hasta la actualidad y de preferencia que tengan alguna
              posible relación con el padecimiento actual.
            </p>
          </h4>
          <TablaPatologico />
        </div>
      </div>
    </Fragment>
  );
};

export default FormPrincipalPatologico;
