/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  datosGenerales: {
    noConsultas: null,
    medicacionGestacional: null,
    examenesComplementarios: null,
    notas: '',
  },
  formulaObstetrica: {
    g: null,
    p: null,
    a: null,
    c: null,
    nacidosVivos: null,
    nacidosMuertos: null,
    viven: null,
    muertoPrimeraSemana: null,
    muertoDespuesPrimeraSemana: null,
  },
  embarazoActual: '',
  antecedentesEmbarazoPrevios: null,
  enfermedadObstetrica: null,
};

export const obstetricosSlice = createSlice({
  name: 'obstetrico',
  initialState,
  reducers: {
    clearObstetricos: (state) => {
      // state.datosGenerales.noConsultas = null;
      // state.datosGenerales.medicacionGestacional = null;
      // state.datosGenerales.examenesComplementarios = null;
      // state.datosGenerales.notas = "";
      // state.formulaObstetrica.g = null;
      // state.formulaObstetrica.p = null;
      // state.formulaObstetrica.a = null;
      // state.formulaObstetrica.c = null;
      // state.formulaObstetrica.nacidosVivos = null;
      // state.formulaObstetrica.nacidosMuertos = null;
      // state.formulaObstetrica.viven = null;
      // state.formulaObstetrica.muertoPrimeraSemana = null;
      // state.formulaObstetrica.muertoDespuesPrimeraSemana = null;
      // state.embarazoActual = "";
      // state.antecedentesEmbarazoPrevios = null;
      // state.enfermedadObstetrica = null;
      state = initialState;
    },

    setDatosGenerales: (state, action) => {
      state.datosGenerales.examenesComplementarios =
        action.payload.examenesComplementarios;
      state.datosGenerales.medicacionGestacional =
        action.payload.medicacionGestacional;
      state.datosGenerales.noConsultas = action.payload.noConsultas;
    },

    setObstetriciansNotes: (state, action) => {
      state.datosGenerales.notas = action.payload;
    },
    setObstetricalFormula: (state, action) => {
      state.formulaObstetrica.g = action.payload.g;
      state.formulaObstetrica.p = action.payload.p;
      state.formulaObstetrica.a = action.payload.a;
      state.formulaObstetrica.c = action.payload.c;
      state.formulaObstetrica.nacidosVivos = action.payload.nacidosVivos;
      state.formulaObstetrica.nacidosMuertos = action.payload.nacidosMuertos;
      state.formulaObstetrica.viven = action.payload.viven;
      state.formulaObstetrica.muertoPrimeraSemana =
        action.payload.muertoPrimeraSemana;
      state.formulaObstetrica.muertoDespuesPrimeraSemana =
        action.payload.muertoDespuesPrimeraSemana;
    },
    setCurrentPregnancyNotes: (state, action) => {
      state.embarazoActual = action.payload;
    },
    setObstetricDiseases: (state, action) => {
      state.enfermedadObstetrica = action.payload;
    },
    setHistoryOfPregnancies: (state, action) => {
      state.antecedentesEmbarazoPrevios = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearObstetricos,
  setDatosGenerales,
  setObstetriciansNotes,
  setObstetricalFormula,
  setCurrentPregnancyNotes,
  setObstetricDiseases,
  setHistoryOfPregnancies,
} = obstetricosSlice.actions;
