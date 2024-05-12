/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: null,
  isDisableTabs: true,
  activePatient: null,
  activeProfesion: null,
  descripcion: '',
  activeRelationShip: null,
  activeIdentityCard: null,
  nombreResponsable: '',
  numeroDocumento: '',
  telefono: null,
};

export const informacionBasicaPacienteSlice = createSlice({
  name: 'informacionBasicaPaciente',
  initialState,
  reducers: {
    toggleDisableTabs: (state, action) => {
      state.selected = action.payload ?? null;

      state.isDisableTabs = !state.selected;
      if (!state.selected) {
        state.patient = null;
      }
    },
    setActivePatient: (state, action) => {
      state.activePatient = action.payload;
    },
    clearActivePatient: (state) => {
      state.activePatient = null;
    },
    setActiveProfession: (state, action) => {
      state.activeProfesion = action.payload;
    },
    clearActiveProfesion: (state) => {
      state.activeProfesion = null;
    },
    setActiveRelationShip: (state, action) => {
      state.activeRelationShip = action.payload;
    },
    clearActiveRelationShip: (state) => {
      state.activeRelationShip = null;
    },
    setActiveIdentityCard: (state, action) => {
      state.activeIdentityCard = action.payload;
    },
    clearActiveIdentityCard: (state) => {
      state.activeIdentityCard = null;
    },

    setDescription: (state, action) => {
      state.descripcion = action.payload;
    },
    setNameResponsible: (state, action) => {
      state.nombreResponsable = action.payload;
    },
    setDocumentNumber: (state, action) => {
      state.numeroDocumento = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.telefono = action.payload;
    },
    clearAllBasicInformation: (state) => {
      state.selected = null;
      state.selected = null;
      state.isDisableTabs = true;
      state.activePatient = null;
      state.activeProfesion = null;
      state.descripcion = '';
      state.activeRelationShip = null;
      state.activeIdentityCard = null;
      state.nombreResponsable = '';
      state.numeroDocumento = '';
      state.telefono = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleDisableTabs,
  setActivePatient,
  clearActivePatient,
  clearActiveProfesion,
  setActiveProfession,
  setActiveIdentityCard,
  clearActiveIdentityCard,
  setActiveRelationShip,
  clearActiveRelationShip,
  setDescription,
  setNameResponsible,
  setDocumentNumber,
  setPhoneNumber,
  clearAllBasicInformation,
} = informacionBasicaPacienteSlice.actions;
