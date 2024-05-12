/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAllergic: true,
  alergias: null,
  hereditario: null,
  patologicos: null,
  noPatologicos: {
    activeBlood: 'Ninguno',
    alcoholismo: {
      isAlcholism: false,
      alcholismItemActive: null,
      alcoholCount: null,
      notas: '',
    },
    tabaquismo: {
      isSmooker: false,
      smokItemActive: null,
      dailySigarrillosCount: 0,
      smokerYear: 0,
      smokerIndex: 0.0,
      fumablesCollection: null,
    },
    drugs: {
      isDrugs: false,
      drugsItemActive: null,
      stimulants: null,
      depressants: null,
      hallucinogens: null,
      notas: '',
    },
    habitosAlimenticios: '',
    actividadFisicaAndDream: '',
    tipoHabitacionAndHacinamiento: '',
    habitosHiene: '',
    exposicionToxicos: '',
  },
  perinatales: {
    generales: {
      horaNacimiento: '00:00',
      numeroGestion: 0,
      edadGestacional: 0,
      sitionAtencion: 0,
      pesoAlNacer: 0,
      tallaCm: 0,
    },
    tipoParto: 'true',
    respiroLloroAlNacer: 'true',
    datosPerimetro: {
      cefalico: 0,
      toracico: 0,
      abdominal: 0,
    },
    puntajeApgar: 0,
    tableApgar: {
      apgarHeartRate: 0,
      apgarLungMaturity: 0,
      apgarMuscleMovement: 0,
      apgarSkinColor: 0,
      apgarReflexes: 0,
    },
    puntajeSilverman: 0,
    tableSilverman: {
      silvermanNasalDilatation: 0,
      silvermanGrunt: 0,
      silvermanLowerChestRetractions: 0,
      silvermanXiphoidRetraction: 0,
      silvermanUpperChestRetractions: 0,
    },
    puntajeCapurro: 0,
    tableCapurro: {
      capurroSkin: 0,
      capurroEar: 0,
      capurroBreastGland: 0,
      capurroNipple: 0,
      capurroPlantarFoldes: 0,
    },
    puntajeBallar: 0,
    tableBallar: {
      ballardSkin: 0,
      ballardLanugo: 0,
      ballardPlanta: 0,
      ballardMamas: 0,
      ballardOrejas: 0,
      ballardGenitalesF: 0,
      ballardGenitalesM: 0,
    },
    notas: '',
    complicaciones: [],
  },
  ginecologicos: {
    enfermedadesTransmicionSexual: null,
    antecedentesG: {
      menarca: null,
      formulaMenstrual: null,
      menopausia: null,
      ultimaCitologia: null,
    },
    calculoPartoAndEdadGestional: {
      day: null,
      moth: null,
      year: null,
      pregnantWeeks: null,
      pregnantDays: null,
      dueDate: null,
    },
    alteracionesDeMenstruacion: {
      alteraciones: [],
      inicioVidaSexual: 0,
      numeroParejas: 0,
      tipoVaginitis: {},
      vaginitis: false,
    },
    anticoncepcion: {
      tipoAnticoncepcion: null,
      inicioAnticoncepcion: null,
      finAnticoncepcion: null,
      observaciones: '',
    },
  },
};

export const antecedenteSlice = createSlice({
  name: 'antecedentes',
  initialState,
  reducers: {
    setPatientState: (state, action) => {
      state.noPatologicos = action.payload;
    },
    toggleIsAllergic: (state, action) => {
      state.isAllergic = action.payload;
    },
    setAllergics: (state, action) => {
      state.alergias = action.payload;
    },
    setHereditaryDiseases: (state, action) => {
      state.hereditario = action.payload;
    },
    setPathologicalDiseases: (state, action) => {
      state.patologicos = action.payload;
    },

    setPerinatalGeneral: (state, action) => {
      state.perinatales.generales.horaNacimiento = action.payload.horaNacimiento;
      state.perinatales.generales.numeroGestion = action.payload.numeroGestion;
      state.perinatales.generales.edadGestacional = action.payload.edadGestacional;
      state.perinatales.generales.sitionAtencion = action.payload.sitionAtencion;
      state.perinatales.generales.pesoAlNacer = action.payload.pesoAlNacer;
      state.perinatales.generales.tallaCm = action.payload.tallaCm;
    },
    setPerinatalDeliveryType: (state, action) => {
      state.perinatales.tipoParto = action.payload.tipoParto;
      state.perinatales.respiroLloroAlNacer = action.payload.respiroLloroAlNacer;
    },
    setPerimeterData: (state, action) => {
      const { toracico, cefalico, abdominal } = action.payload;
      state.perinatales.datosPerimetro.toracico = toracico;
      state.perinatales.datosPerimetro.cefalico = cefalico;
      state.perinatales.datosPerimetro.abdominal = abdominal;
    },
    setApgarScore: (state, action) => {
      state.perinatales.puntajeApgar = action.payload;
    },
    setSilvermanScore: (state, action) => {
      state.perinatales.puntajeSilverman = action.payload;
    },
    setCapurroScore: (state, action) => {
      state.perinatales.puntajeCapurro = action.payload;
    },
    setBallarScore: (state, action) => {
      state.perinatales.puntajeBallar = action.payload;
    },
    setPerinatalNotes: (state, action) => {
      state.perinatales.notas = action.payload;
    },

    setPrecedentG: (state, action) => {
      state.ginecologicos.antecedentesG.menarca = action.payload.menarca;
      state.ginecologicos.antecedentesG.formulaMenstrual =
        action.payload.formulaMenstrual;
      state.ginecologicos.antecedentesG.menopausia = action.payload.menopausia;

      state.ginecologicos.antecedentesG.ultimaCitologia =
        action.payload.ultimaCitologia;
    },
    setGestationalAgeAndChildbirthCalculation: (state, action) => {
      state.ginecologicos.calculoPartoAndEdadGestional.day = action.payload.day;
      state.ginecologicos.calculoPartoAndEdadGestional.moth = action.payload.moth;
      state.ginecologicos.calculoPartoAndEdadGestional.year = action.payload.year;
      state.ginecologicos.calculoPartoAndEdadGestional.pregnantWeeks =
        action.payload.pregnantWeeks;
      state.ginecologicos.calculoPartoAndEdadGestional.pregnantDays =
        action.payload.pregnantDays;
      state.ginecologicos.calculoPartoAndEdadGestional.dueDate =
        action.payload.dueDate;
    },
    setNoPatologicosNotes: (state, action) => {
      state.noPatologicos.alcoholismo.notas = action.payload;
    },
    setMenstrualDisorders: (state, action) => {
      state.ginecologicos.alteracionesDeMenstruacion.alteraciones =
        action.payload.alteraciones;
      state.ginecologicos.alteracionesDeMenstruacion.inicioVidaSexual =
        action.payload.inicioVidaSexual;
      state.ginecologicos.alteracionesDeMenstruacion.numeroParejas =
        action.payload.numeroParejas;
      state.ginecologicos.alteracionesDeMenstruacion.tipoVaginitis =
        action.payload.tipoVaginitis;
      state.ginecologicos.alteracionesDeMenstruacion.vaginitis =
        action.payload.vaginitis;
    },
    setContraception: (state, action) => {
      state.ginecologicos.anticoncepcion.tipoAnticoncepcion =
        action.payload.tipoAnticoncepcion;
      state.ginecologicos.anticoncepcion.inicioAnticoncepcion =
        action.payload.inicioAnticoncepcion;
      state.ginecologicos.anticoncepcion.finAnticoncepcion =
        action.payload.finAnticoncepcion;
      if (action.payload.observaciones) {
        state.ginecologicos.anticoncepcion.observaciones =
          action.payload.observaciones;
      }
    },

    setObservaciones: (state, action) => {
      state.ginecologicos.anticoncepcion.observaciones = action.payload;
    },
    setSmookerTrue: (state) => {
      state.noPatologicos.tabaquismo.isSmooker = true;
    },
    setSmookerFalse: (state) => {
      state.noPatologicos.tabaquismo.isSmooker = false;
      state.noPatologicos.tabaquismo.fumablesCollection = null;
      state.noPatologicos.tabaquismo.dailySigarrillosCount = 0;
      state.noPatologicos.tabaquismo.smokerYear = 0;
      state.noPatologicos.tabaquismo.smokerIndex = 0;
    },
    setAlcholismTrue: (state) => {
      state.noPatologicos.alcoholismo.isAlcholism = true;
    },
    setAlcholismFalse: (state) => {
      state.noPatologicos.alcoholismo.isAlcholism = false;
      state.noPatologicos.alcoholismo.alcoholCount = null;
    },
    setDrugsTrue: (state) => {
      state.noPatologicos.drugs.isDrugs = true;
    },
    setDrugsFalse: (state) => {
      state.noPatologicos.drugs.isDrugs = false;
      state.noPatologicos.drugs.stimulants = null;
      state.noPatologicos.drugs.depressants = null;
      state.noPatologicos.drugs.hallucinogens = null;
    },
    setDrugsNotes: (state, action) => {
      state.noPatologicos.drugs.notas = action.payload;
    },

    setSmokerData: (state, action) => {
      state.noPatologicos.tabaquismo.dailySigarrillosCount =
        action.payload.dailySigarrillosCount;
      state.noPatologicos.tabaquismo.smokerYear = action.payload.smokerYear;
      state.noPatologicos.tabaquismo.fumablesCollection =
        action.payload.fumablesCollection;
      state.noPatologicos.tabaquismo.smokerIndex =
        (action.payload.dailySigarrillosCount * action.payload.smokerYear) / 20;
    },
    setSmokItemActive: (state, action) => {
      state.noPatologicos.tabaquismo.smokItemActive = action.payload;
    },
    setAlcholismItemActive: (state, action) => {
      state.noPatologicos.alcoholismo.alcholismItemActive = action?.payload;
    },
    setdrugsItemActive: (state, action) => {
      state.noPatologicos.drugs.drugsItemActive = action.payload;
    },
    setAlcholismData: (state, action) => {
      state.noPatologicos.alcoholismo.alcoholCount = action.payload;
    },
    setClearSmokerData: (state) => {
      state.noPatologicos.tabaquismo.dailySigarrillosCount = 0;
      state.noPatologicos.tabaquismo.smokerYear = 0;
      state.noPatologicos.tabaquismo.fumablesCollection = null;
      state.noPatologicos.tabaquismo.smokerIndex = 0;
    },
    setClearAlcoholismData: (state) => {
      state.noPatologicos.alcoholismo.alcoholCount = null;
    },

    setSexuallyTransmittedDiseases: (state, action) => {
      state.ginecologicos.enfermedadesTransmicionSexual = action.payload;
    },

    setStimulants: (state, action) => {
      state.noPatologicos.drugs.stimulants = action.payload;
    },
    setHallucinogens: (state, action) => {
      state.noPatologicos.drugs.hallucinogens = action.payload;
    },
    setDepressants: (state, action) => {
      state.noPatologicos.drugs.depressants = action.payload;
    },
    setComplications: (state, action) => {
      state.perinatales.complicaciones = action.payload;
    },
    setTableApgar: (state, action) => {
      state.perinatales.tableApgar = action.payload;
    },
    setTableSilverman: (state, action) => {
      state.perinatales.tableSilverman = action.payload;
    },
    setCapurroSkin: (state, action) => {
      state.perinatales.tableCapurro.capurroSkin = action.payload;
    },
    setCapurroEar: (state, action) => {
      state.perinatales.tableCapurro.capurroEar = action.payload;
    },
    setCapurroBreastGland: (state, action) => {
      state.perinatales.tableCapurro.capurroBreastGland = action.payload;
    },
    setCapurroNipple: (state, action) => {
      state.perinatales.tableCapurro.capurroNipple = action.payload;
    },
    setCapurroPlantarFoldes: (state, action) => {
      state.perinatales.tableCapurro.capurroPlantarFoldes = action.payload;
    },

    // setTestCapurro: (state, action) => {
    //   state.perinatales.tableCapurro = action.payload;
    // },
    setBallarSkin: (state, action) => {
      state.perinatales.tableBallar.ballardSkin = action.payload;
    },
    setBallarLanugo: (state, action) => {
      state.perinatales.tableBallar.ballardLanugo = action.payload;
    },
    setBallarPlanta: (state, action) => {
      state.perinatales.tableBallar.ballardPlanta = action.payload;
    },
    setBallarMamas: (state, action) => {
      state.perinatales.tableBallar.ballardMamas = action.payload;
    },
    setBallarOrejas: (state, action) => {
      state.perinatales.tableBallar.ballardOrejas = action.payload;
    },
    setBallarGenitalesF: (state, action) => {
      state.perinatales.tableBallar.ballardGenitalesF = action.payload;
    },
    setBallarGenitalesM: (state, action) => {
      state.perinatales.tableBallar.ballardGenitalesM = action.payload;
    },
    setEatingHabits: (state, action) => {
      state.noPatologicos.habitosAlimenticios = action.payload;
    },
    setPhysicalActivityAndSleep: (state, action) => {
      state.noPatologicos.actividadFisicaAndDream = action.payload;
    },
    setRoomTypeAndOvercrowding: (state, action) => {
      state.noPatologicos.tipoHabitacionAndHacinamiento = action.payload;
    },
    setHygieneHabits: (state, action) => {
      state.noPatologicos.habitosHiene = action.payload;
    },
    setExposureToToxics: (state, action) => {
      state.noPatologicos.exposicionToxicos = action.payload;
    },
    setActiveBloodCompatibility: (state, action) => {
      state.noPatologicos.activeBlood = action.payload;
    },
    clearAll: (state) => {
      return (state = initialState);
    },
    loadDataFromServerPerinatales: (state, action) => {
      state.perinatales = action.payload;
    },

    setGinegologicalForFile: (state, action) => {
      state.ginecologicos.antecedentesG = action.payload.antecedentesG;
      state.ginecologicos.calculoPartoAndEdadGestional =
        action.payload.calculoPartoAndEdadGestional;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGinegologicalForFile,
  setDepressants,
  setHallucinogens,
  clearAll,
  setDrugsNotes,
  setActiveBloodCompatibility,
  setExposureToToxics,
  setHygieneHabits,
  setRoomTypeAndOvercrowding,
  setEatingHabits,
  setBallarTable,
  setTableSilverman,
  setTableApgar,
  setStimulants,
  toggleIsAllergic,
  setAllergics,
  setHereditaryDiseases,
  setPathologicalDiseases,
  setPerinatalGeneral,
  setPerinatalDeliveryType,
  setPerimeterData,
  setApgarScore,
  setSilvermanScore,
  setCapurroScore,
  setBallarScore,
  setPerinatalNotes,
  setPrecedentG,
  setGestationalAgeAndChildbirthCalculation,
  setNoPatologicosNotes,
  setMenstrualDisorders,
  setContraception,
  setObservaciones,
  setSmookerTrue,
  setSmookerFalse,
  setAlcholismFalse,
  setAlcholismTrue,
  setDrugsFalse,
  setDrugsTrue,
  setSmokerData,
  setSmokItemActive,
  setAlcholismItemActive,
  setdrugsItemActive,
  setAlcholismData,
  setClearSmokerData,
  setClearAlcoholismData,
  setSexuallyTransmittedDiseases,
  setComplications,
  setPatientState,
  loadDataFromServerPerinatales,
  setCapurroBreastGland,
  setCapurroEar,
  setCapurroNipple,
  setCapurroPlantarFoldes,
  setCapurroSkin,
  setPhysicalActivityAndSleep,
  setBallarGenitalesF,
  setBallarLanugo,
  setBallarMamas,
  setBallarOrejas,
  setBallarPlanta,
  setBallarSkin,
  setBallarGenitalesM,
} = antecedenteSlice.actions;
