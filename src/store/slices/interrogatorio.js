/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  analisis: {
    reasonConsultation: '',
    symptoms: '',
    description: '',
  },
  digestivo: '',
  endocrino: '',
  hermolinfatico: '',
  mamas: '',
  musculoEsqueletico: '',
  skin: '',
  reproductivo: '',
  respiratorio: '',
  sistemaNervioso: '',
  sistemasGenerales: '',
  urinario: '',
  cardioVascular: '',
};

export const interrogatorioSlice = createSlice({
  name: 'interrogatorio',
  initialState,
  reducers: {
    clearInterrogatorio: (state) => {
      state.analisis.reasonConsultation = '';
      state.analisis.symptoms = '';
      state.analisis.description = '';
      state.digestivo = '';
      state.endocrino = '';
      state.hermolinfatico = '';
      state.mamas = '';
      state.musculoEsqueletico = '';
      state.skin = '';
      state.reproductivo = '';
      state.respiratorio = '';
      state.sistemaNervioso = '';
      state.sistemasGenerales = '';
      state.urinario = '';
      state.cardioVascular = '';
    },

    setAnalyzes: (state, action) => {
      state.analisis.reasonConsultation = action.payload;
    },
    setSymptoms: (state, action) => {
      state.analisis.symptoms = action.payload;
    },
    setDescriptions: (state, action) => {
      state.analisis.description = action.payload;
    },
    setDigestive: (state, action) => {
      state.digestivo = action.payload;
    },
    setEndocrine: (state, action) => {
      state.endocrino = action.payload;
    },
    setHermoLinfatico: (state, action) => {
      state.hermolinfatico = action.payload;
    },
    setMamas: (state, action) => {
      state.mamas = action.payload;
    },
    setSqueletalMuscle: (state, action) => {
      state.musculoEsqueletico = action.payload;
    },
    setSkin: (state, action) => {
      state.skin = action.payload;
    },
    setReproductivo: (state, action) => {
      state.reproductivo = action.payload;
    },
    setRespiratorio: (state, action) => {
      state.respiratorio = action.payload;
    },
    setSistemaNervioso: (state, action) => {
      state.sistemaNervioso = action.payload;
    },
    setSistemasGenerales: (state, action) => {
      state.sistemasGenerales = action.payload;
    },
    setUrinario: (state, action) => {
      state.urinario = action.payload;
    },
    setCardioVascular: (state, action) => {
      state.cardioVascular = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCardioVascular,
  setUrinario,
  setSistemasGenerales,
  setSistemaNervioso,
  setRespiratorio,
  setReproductivo,
  setAnalyzes,
  setDescriptions,
  setSymptoms,
  setDigestive,
  setEndocrine,
  setHermoLinfatico,
  setMamas,
  setSqueletalMuscle,
  setSkin,
  clearInterrogatorio,
} = interrogatorioSlice.actions;
