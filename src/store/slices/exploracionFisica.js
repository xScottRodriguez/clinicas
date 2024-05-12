/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signosVitales: {
    precionAlterial: {
      sistolica: 120,
      diastolica: 80,
    },
    frecuenciaCardiaca: 0,
    frecuenciaRespiratoria: 0,
    temperatura: 0,
    glucomeriaCapilar: 0,
    saturacionoxigeno: 0,
  },
  habitusExterior: '',
  cabeza: '',
  ojos: '',
  otorrinoLarigologia: '',
  cuello: '',
  torax: '',
  abdomen: '',
  exploracionGinecologica: '',
  genitales: '',
  columnaVertebral: '',
  extremidades: '',
  exploracionNeurologica: '',
};

export const exploracionFisicaSlice = createSlice({
  name: 'exploracionFisica',
  initialState,
  reducers: {
    clearExploracionFisica: (state) => {
      // state.signosVitales.precionAlterial.sistolica = 120;
      // state.signosVitales.precionAlterial.diastolica = 80;
      // state.signosVitales.frecuenciaCardiaca = 0;
      // state.signosVitales.frecuenciaRespiratoria = 0;
      // state.signosVitales.temperatura = 0;
      // state.signosVitales.glucomeriaCapilar = 0;
      // state.signosVitales.saturacionoxigeno = 0;
      // state.habitusExterior = '';
      // state.cabeza = '';
      // state.ojos = '';
      // state.otorrinoLarigologia = '';
      // state.cuello = '';
      // state.torax = '';
      // state.abdomen = '';
      // state.exploracionGinecologica = '';
      // state.genitales = '';
      // state.columnaVertebral = '';
      // state.extremidades = '';
      // state.exploracionNeurologica = '';
      state = initialState;
    },

    setSistolica: (state, action) => {
      state.signosVitales.precionAlterial.sistolica = action.payload;
    },
    setDiastolica: (state, action) => {
      state.signosVitales.precionAlterial.diastolica = action.payload;
    },
    setFrecuenciaCardiaca: (state, action) => {
      state.signosVitales.frecuenciaCardiaca = +action.payload;
    },
    setFrecuenciaRespiratoria: (state, action) => {
      state.signosVitales.frecuenciaRespiratoria = +action.payload;
    },
    setTemperatura: (state, action) => {
      state.signosVitales.temperatura = +action.payload;
    },
    setGlucomeriaCapilar: (state, action) => {
      state.signosVitales.glucomeriaCapilar = +action.payload;
    },
    setOxigeno: (state, action) => {
      state.signosVitales.saturacionoxigeno = +action.payload;
    },
    setHabitusExterior: (state, action) => {
      state.habitusExterior = action.payload;
    },
    setCabeza: (state, action) => {
      state.cabeza = action.payload;
    },
    setOjos: (state, action) => {
      state.ojos = action.payload;
    },
    setOtorrinoLarigologia: (state, action) => {
      state.otorrinoLarigologia = action.payload;
    },
    setCuello: (state, action) => {
      state.cuello = action.payload;
    },
    setTorax: (state, action) => {
      state.torax = action.payload;
    },
    setAbdomen: (state, action) => {
      state.abdomen = action.payload;
    },
    setExploracionGinecologica: (state, action) => {
      state.exploracionGinecologica = action.payload;
    },
    setGenitales: (state, action) => {
      state.genitales = action.payload;
    },
    setColumnaVertebral: (state, action) => {
      state.columnaVertebral = action.payload;
    },
    setExtremidades: (state, action) => {
      state.extremidades = action.payload;
    },
    setExploracionNeurologica: (state, action) => {
      state.exploracionNeurologica = action.payload;
    },
  },
});

export const {
  setOxigeno,
  setGlucomeriaCapilar,
  setTemperatura,
  setSistolica,
  setDiastolica,
  setFrecuenciaCardiaca,
  setFrecuenciaRespiratoria,
  setHabitusExterior,
  setCabeza,
  setOjos,
  setOtorrinoLarigologia,
  setCuello,
  setTorax,
  setAbdomen,
  setExploracionGinecologica,
  setGenitales,
  setColumnaVertebral,
  setExtremidades,
  setExploracionNeurologica,
  clearExploracionFisica,
} = exploracionFisicaSlice.actions;
