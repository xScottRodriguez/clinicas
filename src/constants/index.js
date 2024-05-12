/* eslint-disable no-useless-escape */
/** @format */
// Define un objeto que mapee las vistas con los campos correspondientes en el estado Redux
const viewFieldsMapping = {
  incapacidad: 'setIncapacityNotes',
  antecedentes: {
    perinatales: 'setPerinatalNotes',
    anticoncepcion: 'setObservaciones',
    noPatologicos: 'setNoPatologicosNotes',
    drugs: 'setDrugsNotes',
    eatingHabits: 'setEatingHabits',
    physicalActivity: 'setPhysicalActivityAndSleep',
    roomTypeAndOverCrowding: 'setRoomTypeAndOvercrowding',
    hygieneHabits: 'setHygieneHabits',
    exposureToToxics: 'setExposureToToxics',
  },
  obstetrico: {
    datosGenerales: 'setObstetriciansNotes',
    embarazoActual: 'setCurrentPregnancyNotes',
  },
  interrogatorio: {
    analisis: 'setAnalyzes',
    sintomas: 'setSymptoms',
    descripcion: 'setDescriptions',
    digestivo: 'setDigestive',
    endocrino: 'setEndocrine',
    hermolinfatico: 'setHermoLinfatico',
    mamas: 'setMamas',
    musculoEsqueletico: 'setSqueletalMuscle',
    skin: 'setSkin',
    reproductivo: 'setReproductivo',
    respiratorio: 'setRespiratorio',
    sistemaNervioso: 'setSistemaNervioso',
    sistemasGenerales: 'setSistemasGenerales',
    urinario: 'setUrinario',
    cardioVascular: 'setCardioVascular',
  },
  exploracionFisica: {
    habitusExterior: 'setHabitusExterior',
    cabeza: 'setCabeza',
    ojos: 'setOjos',
    otorrinoLarigologia: 'setOtorrinoLarigologia',
    cuello: 'setCuello',
    torax: 'setTorax',
    abdomen: 'setAbdomen',
    exploracionGinecologica: 'setExploracionGinecologica',
    genitales: 'setGenitales',
    columnaVertebral: 'setColumnaVertebral',
    extremidades: 'setExtremidades',
    exploracionNeurologica: 'setExploracionNeurologica',
  },
  // Añadir más vistas y campos según sea necesario
};
const ANTECEDENTES_VIEWS = {
  PERINATALES: 'perinatales',
  ANTICONCEPCION: 'anticoncepcion',
  NO_PATOLOGICOS: 'noPatologicos',
  EATING_HABITS: 'eatingHabits',
  PHYSICAL_ACTIVITY: 'physicalActivity',
  ROOM_TYPE_AND_OVERCROWDING: 'roomTypeAndOverCrowding',
  HYGIENE_HABITS: 'hygieneHabits',
  EXPOSURE_TO_TOXICS: 'exposureToToxics',
  DRUGS: 'drugs',
};
const OBSTETRICOS = {
  DATOS_GENERALES: 'datosGenerales',
  EMBARAZO_ACTUAL: 'embarazoActual',
};
const SLICES_NAMES = {
  ANTECEDENTES: 'antecedentes',
  INCAPACIDAD: 'incapacidad',
  OBSTETRICO: 'obstetrico',
  INTERROGATORIO: 'interrogatorio',
  EXPLORACION_FISICA: 'exploracionFisica',
  PRE_ESCRIPICONES: 'preEscripcion',
};

const INCAPACIDAD = 'setIncapacityNotes';
const INTERROGATORIO = {
  ANALISIS: 'analisis',
  SINTOMAS: 'sintomas',
  DESCRIPCION: 'descripcion',
  DIGESTIVO: 'digestivo',
  ENDOCRINO: 'endocrino',
  HERMOLINFATICO: 'hermolinfatico',
  MAMAS: 'mamas',
  MUSCULO_ESQUELETICO: 'musculoEsqueletico',
  SKIN: 'skin',
  REPRODUCTIVO: 'reproductivo',
  RESPIRATORIO: 'respiratorio',
  SISTEMA_NERVIOSO: 'sistemaNervioso',
  SISTEMAS_GENERALES: 'sistemasGenerales',
  URINARIO: 'urinario',
  CARDIO_VASCULAR: 'cardioVascular',
};
const EXPLORACION_FISICA = {
  HABITUS_EXTERIOR: 'habitusExterior',
  CABEZA: 'cabeza',
  OJOS: 'ojos',
  OTO_LARINGOLOGIA: 'otorrinoLarigologia',
  CUELLO: 'cuello',
  TORAX: 'torax',
  ABDOMEN: 'abdomen',
  EXPLORACION_GINECOLOGICA: 'exploracionGinecologica',
  GENITALES: 'genitales',
  COLUMNA_VERTEBRAL: 'columnaVertebral',
  EXTREMIDADES: 'extremidades',
  EXPLORACION_NEUROLOGICA: 'exploracionNeurologica',
};

const PRE_ESCRIPCIONES = {
  OBSERVACIONES: 'observaciones',
  RECETAS: 'recetas',
  ESTUDIOS: 'estudios',
};
const permissions = {
  expedientesMedicos: ['a9b741b3-80a4-43d3-88b2-fbce12e41e35'],
  seguridad: [
    '855c38cd-adc4-4a4f-85e2-9d0cf9078594',
    '7db77ba8-1766-4c94-8357-48121205e43f',
  ],
};

const ACTIONS = {
  SAVE: 'save',
  UPDATE: 'update',
  CANCEL: 'cancel',
};

const VIEWS_TO_REDIRECT = {
  paciente: 'setPacienteTab',
  antecedentes: 'setAntecedentesTab',
  incapacidad: 'setIncapacidadTab',
  exploracionFisica: 'setExploracionFisicaTab',
  interrogatorio: 'setInterrogatorioTab',
  enfermedadesCIE: 'setEnfermedadesCIETab',
  consulta: 'setConsultaTab',
};
const PROVIDES_AND_INVALIDATE_TAGS = {
  ALLERGIES: 'Allergies',
  HEREDITARIES: 'Hereditaries',
  PATHOLOGICAL_DISEASES: 'PathologicalDiseases',
  NO_PATHOLOGICAL_DISEASES: 'NoPathologicalDiseases',
  PERINATAL_DATA: 'PerinatalData',
  GINECOLOGICAL: 'Ginecological',
  OBSTETRIC: 'Obstetric',
  FISICAL_EXPLORATION: 'FisicalExploration',
  INTERROGATION: 'Interrogation',
  CLINICAL_RECORDS: 'ClinicalRecords',
  INCAPACITIES: 'Incapacity',
  PRE_ESCRIPCIONES: 'preEscripciones',
  DIAGNOSTICOS: 'diagnosticos',
  CONSULTAS: 'consultas',
  MEDICOS: 'medicos',
  DATES: 'dates',
  ESPECIALIDADES: 'especialidades',
  SUB_ESPECIALIDAD: 'subEspecialidad',
};

export * from './position-toasts';

const ARR_TAGS = Object.values(PROVIDES_AND_INVALIDATE_TAGS);

const BLOOD_TYPES = {
  'O−': ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A−': ['A−', 'A+', 'AB−', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B−': ['B−', 'B+', 'AB−', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB−': ['AB−', 'AB+'],
  'AB+': ['AB+'],
  // Ninguno: ['Ninguno'],
};

const COOKIES_NAMES = {
  TOKEN: 'token',
  USER: 'user',
  MODULES: 'modules',
};

const NIT_REGEX = /^\d{4}-\d{6}-\d{3}-\d$/;
const ZONE = 'America/El_Salvador';
const PASSWORD_REGE =
  /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/;
const STATUS_DATES = {
  PENDIENTE: '#868686',
  CONFIRMADA: '#3174ad',
  CANCELADA: '#E74C3C',
  REPROGRAMADA: '#AF7AC5',
  FINALIZADA: '#005E3A',
};

const STATUS_BORDER_DATES = {
  PENDIENTE: '#818E91',
  CONFIRMADA: '#3174ad',
  CANCELADA: '#E81500',
  REPROGRAMADA: '#6900C7',
  FINALIZADA: '#005E3A',
};
const BADGE_COLORS = {
  PENDIENTE: 'dark',
  CONFIRMADA: 'info',
  CANCELADA: 'danger',
  REPROGRAMADA: 'purple',
  FINALIZADA: 'success',
};

const UUID_MEDICOS = 'c3ee826f-6c9b-4809-9f4c-47ce8b183f9e';
const UUID_LISTA_MEDICOS = 'f7eb2102-5fc5-4bff-af08-bb70dff5f62f';
const UUID_ESPECIALIDADES = '21f7f8e5-054e-4ba0-9590-f94429ae8bb8';
const UUID_LISTA_EXPEDIENTE = 'a9b741b3-80a4-43d3-88b2-fbce12e41e35';
const UUID_AGENDA_CITAS = '4dc4f1ef-25ae-4ceb-aaf3-e137de2195d4';
const UUID_SUB_ESPECIALIDADS = 'a096a663-5d1b-4271-bf17-7bf7ed475fc0';
export {
  ZONE,
  PASSWORD_REGE,
  BADGE_COLORS,
  STATUS_BORDER_DATES,
  STATUS_DATES,
  NIT_REGEX,
  viewFieldsMapping,
  SLICES_NAMES,
  ANTECEDENTES_VIEWS,
  OBSTETRICOS,
  INTERROGATORIO,
  EXPLORACION_FISICA,
  permissions,
  ACTIONS,
  VIEWS_TO_REDIRECT,
  PROVIDES_AND_INVALIDATE_TAGS,
  ARR_TAGS,
  BLOOD_TYPES,
  PRE_ESCRIPCIONES,
  INCAPACIDAD,
  COOKIES_NAMES,
  UUID_LISTA_EXPEDIENTE,
  UUID_MEDICOS,
  UUID_AGENDA_CITAS,
  UUID_LISTA_MEDICOS,
  UUID_ESPECIALIDADES,
  UUID_SUB_ESPECIALIDADS,
};
