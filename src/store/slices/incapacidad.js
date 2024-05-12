/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fechaInicial: null,
  fechaFinal: null,
  notas: null,
  activeIncapacity: null,
};

export const incapacidadSlice = createSlice({
  name: 'incapacidad',
  initialState,
  reducers: {
    setInitialDate: (state, action) => {
      state.fechaInicial = action.payload;
    },
    setEndDate: (state, action) => {
      state.fechaFinal = action.payload;
    },
    setIncapacityNotes: (state, action) => {
      state.notas = action.payload;
    },
    setActiveIncapacity: (state, action) => {
      state.activeIncapacity = action.payload;
    },
    clearActiveIncapacity: (state) => {
      state.activeIncapacity = null;
    },
    clearIncapacity: (state) => {
      state.activeIncapacity = null;
      state.fechaFinal = null;
      state.fechaInicial = null;
      state.notas = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearIncapacity,
  setInitialDate,
  setEndDate,
  setIncapacityNotes,
  clearActiveIncapacity,
  setActiveIncapacity,
} = incapacidadSlice.actions;
