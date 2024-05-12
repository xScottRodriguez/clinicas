import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  tabsExpediente: {
    paciente: true,
    antecedentes: false,
    incapacidad: false,
    exploracionFisica: false,
    interrogatorio: true,
    enfermedadesCIE: false,
    consulta: false,
    prescripciones: false,
  },
  tabPreEscripciones: {
    preEscripcion: true,
    diagnostico: false,
  },
  detallesConsulta: false,
  detallesDeConsulta: null,
  prescripcion: null,
  toastLoader: false,
  toastUri: null,
  expedienteId: null,
  disableTabsConsulta: false,
  consultaId: null,
  diagnosticoActivo: null,
  auth: null,
  modalOpen: false,
  activeEvent: null,
  doctorFilter: '',
  especialidadModal: false,
  activeSpeciality: null,
  activeSubSpeciality: null,
  subEspecialidadModal: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    toggleModal: (state) => {
      state.detallesConsulta = !state.detallesConsulta;
    },
    setDetalleConsulta: (state, action) => {
      state.detallesDeConsulta = action.payload.detalles;
      state.prescripcion = action.payload.prescripcion;
    },
    clearInfo: (state) => {
      state.detallesDeConsulta = null;
      state.prescripcion = null;
    },
    setPreEscripcion: (state) => {
      state.tabPreEscripciones.diagnostico = false;
      state.tabPreEscripciones.preEscripcion = true;
    },
    setDiagnostico: (state) => {
      state.tabPreEscripciones.diagnostico = true;
      state.tabPreEscripciones.preEscripcion = false;
    },
    setAntecedentesTab: (state, action) => {
      state.tabsExpediente.antecedentes = true;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setIncapacidadTab: (state, action) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = true;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setExploracionFisicaTab: (state, action) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = true;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setInterrogatorioTab: (state, action) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = true;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setEnfermedadesCIETab: (state, action) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = true;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setConsultaTab: (state, action) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = true;
      state.tabsExpediente.prescripciones = false;
    },
    setPacienteTab: (state) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = true;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = false;
    },
    setPrescripcionTab: (state) => {
      state.tabsExpediente.antecedentes = false;
      state.tabsExpediente.paciente = false;
      state.tabsExpediente.incapacidad = false;
      state.tabsExpediente.exploracionFisica = false;
      state.tabsExpediente.interrogatorio = false;
      state.tabsExpediente.enfermedadesCIE = false;
      state.tabsExpediente.consulta = false;
      state.tabsExpediente.prescripciones = true;
    },
    clearActives: (state) => {
      state.detallesDeConsulta = null;
      state.prescripcion = null;
    },
    clearAllTabs: (state) => {
      state = initialState;

      // state.tabsExpediente.antecedentes = false;
      // state.tabsExpediente.paciente = true;
      // state.tabsExpediente.incapacidad = false;
      // state.tabsExpediente.exploracionFisica = false;
      // state.tabsExpediente.interrogatorio = false;
      // state.tabsExpediente.enfermedadesCIE = false;
      // state.tabsExpediente.consulta = false;
    },
    setExpedienteId: (state, action) => {
      state.expedienteId = +action.payload;
    },
    setShowToastLoader: (state) => {
      state.toastLoader = !state.toastLoader;
    },
    setUri: (state, action) => {
      state.toastUri = action.payload;
    },
    clearUri: (state) => {
      state.toastUri = null;
    },
    toggleConsultasTab: (state) => {
      state.disableTabsConsulta = !state.disableTabsConsulta;
    },
    setConsulta: (state, action) => {
      state.consultaId = action.payload;
    },
    setConsultaTabFalse: (state) => {
      state.disableTabsConsulta = false;
    },

    setDiagnosticoActivo: (state, action) => {
      state.diagnosticoActivo = action.payload;
    },
    clearDiagnosticoActivo: (state) => {
      state.diagnosticoActivo = null;
    },
    setUser: (state, action) => {
      state.auth = action.payload;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    eventSetActive: (state, action) => {
      state.activeEvent = action.payload;
    },
    eventClearActiveEvent: (state) => {
      state.activeEvent = null;
    },
    newDate: (state, action) => {
      state.dates.push({
        ...action.payload,
        start: format(action.payload.start, 'yyyy-MM-dd HH:mm:ss'),
        end: format(action.payload.end, 'yyyy-MM-dd HH:mm:ss'),
      });
    },
    clearDates: (state) => {
      state.dates = [];
    },
    updateDate: (state, action) => {
      state.dates = state.dates.map((date) =>
        date.id === action.payload.id ? action.payload : date
      );
    },
    deleteDate: (state, action) => {
      state.dates = state.dates.filter((date) => +date.id !== +action.payload);
    },
    setDoctorFilter: (state, action) => {
      state.doctorFilter = action.payload;
    },
    clearDoctorFilter: (state) => {
      state.doctorFilter = '';
    },
    showEspecialidadModal: (state) => {
      state.especialidadModal = true;
    },
    hideEspecialidadModal: (state) => {
      state.especialidadModal = false;
    },
    setActiveSpeciality: (state, action) => {
      state.activeSpeciality = action.payload;
    },
    clearActiveSpeciality: (state) => {
      state.activeSpeciality = null;
    },
    showSubEspecialidadModal: (state) => {
      state.subEspecialidadModal = true;
    },
    hideSubEspecialidadModal: (state) => {
      state.subEspecialidadModal = false;
    },
    setActiveSubSpeciality: (state, action) => {
      state.activeSubSpeciality = action.payload;
    },
    clearActiveSubSpeciality: (state) => {
      state.activeSubSpeciality = null;
    },
  },
});

export const {
  clearAllTabs,
  setAntecedentesTab,
  setConsultaTab,
  setEnfermedadesCIETab,
  setExploracionFisicaTab,
  setIncapacidadTab,
  setPacienteTab,
  setInterrogatorioTab,
  setPreEscripcion,
  setDiagnostico,
  setPrescripcionTab,
  setDetalleConsulta,
  toggleModal,
  clearInfo,
  setShowToastLoader,
  setUri,
  clearUri,
  setExpedienteId,
  toggleConsultasTab,
  setConsulta,
  setConsultaTabFalse,
  setDiagnosticoActivo,
  clearDiagnosticoActivo,
  setUser,
  closeModal,
  openModal,
  clearActives,
  eventClearActiveEvent,
  eventSetActive,
  newDate,
  clearDates,
  deleteDate,
  updateDate,
  setDoctorFilter,
  clearDoctorFilter,
  hideEspecialidadModal,
  showEspecialidadModal,

  setActiveSpeciality,
  clearActiveSpeciality,

  clearActiveSubSpeciality,
  hideSubEspecialidadModal,
  setActiveSubSpeciality,
  showSubEspecialidadModal,
} = uiSlice.actions;
