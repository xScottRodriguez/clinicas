/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { informacionBasicaPacienteSlice } from './slices/expedienteSlice';
import { clinicalApi } from '../services/rtk-query';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { antecedenteSlice } from './slices/antecedentes';
import { incapacidadSlice } from './slices/incapacidad';
import { obstetricosSlice } from './slices/obstetricos';
import { interrogatorioSlice } from './slices/interrogatorio';
import { exploracionFisicaSlice } from './slices/exploracionFisica';
import { uiSlice } from './slices/uiSlice';
import { resetStoreMiddleware } from './middlewares';
import { preEscripcionSlice } from './slices/pre-escripciones';

export const store = configureStore({
  reducer: {
    informacionBasicaPaciente: informacionBasicaPacienteSlice.reducer,
    antecedente: antecedenteSlice.reducer,
    incapacidad: incapacidadSlice.reducer,
    obstetrico: obstetricosSlice.reducer,
    interrogatorio: interrogatorioSlice.reducer,
    exploracionFisica: exploracionFisicaSlice.reducer,
    preEscripcion: preEscripcionSlice.reducer,
    ui: uiSlice.reducer,
    [clinicalApi.reducerPath]: clinicalApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clinicalApi.middleware)
      .concat(resetStoreMiddleware),
});

setupListeners(store.dispatch);
