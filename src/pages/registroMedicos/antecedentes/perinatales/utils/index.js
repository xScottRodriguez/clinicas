const mapToSavePerinatales = (data, expedienteId) => {
  const {
    generales,
    datosPerimetro,
    tipoParto,
    respiroLloroAlNacer,
    puntajeApgar,
    tableApgar,
    puntajeSilverman,
    tableSilverman,
    puntajeCapurro,
    tableCapurro,
    puntajeBallar,
    tableBallar,
    notas,
    complicaciones,
  } = data;
  return {
    expedienteId,
    horaNacimiento: generales.horaNacimiento,
    numeroGestion: +generales.numeroGestion,
    edadGestacional: +generales.edadGestacional,
    sitionAtencion: +generales.sitionAtencion,
    pesoAlNacer: +generales.pesoAlNacer,
    tallaCm: +generales.tallaCm,
    tipoParto: tipoParto === 'true',
    respiroLloroAlNacer: respiroLloroAlNacer === 'true',
    cefalico: +datosPerimetro.cefalico,
    toracico: +datosPerimetro.toracico,
    abdominal: +datosPerimetro.abdominal,
    apgar: {
      puntajeApgar: +puntajeApgar ?? 0,
      apgarHeartRate: isNaN(+tableApgar.apgarHearRate)
        ? 0
        : +tableApgar.apgarHearRate,
      apgarLungMaturity: +tableApgar.apgarLungMaturity,
      apgarMuscleMovement: +tableApgar.apgarMuscleMovement,
      apgarSkinColor: +tableApgar.apgarSkinColor,
      apgarReflexes: +tableApgar.apgarReflexes,
    },
    silverman: {
      puntajeSilverman: +puntajeSilverman ?? 0,
      silvermanNasalDilatation: +tableSilverman.silvermanNasalDilatation,
      silvermanGrunt: +tableSilverman.silvermanGrunt,
      silvermanLowerChestRetractions:
        +tableSilverman.silvermanLowerChestRetractions,
      silvermanXiphoidRetraction: +tableSilverman.silvermanXiphoidRetraction,
      silvermanUpperChestRetractions:
        +tableSilverman.silvermanUpperChestRetractions,
    },
    capurro: {
      puntajeCapurro,
      capurroSkin: isNaN(+tableCapurro.capurroSkin) ? 0 : +tableCapurro.capurroSkin,
      capurroEar: isNaN(+tableCapurro.capurroEar) ? 0 : +tableCapurro.capurroEar,
      capurroBreastGland: isNaN(+tableCapurro.capurroBreastGland)
        ? 0
        : +tableCapurro.capurroBreastGland,
      capurroNipple: isNaN(+tableCapurro.capurroNipple)
        ? 0
        : +tableCapurro.capurroNipple,
      capurroPlantarFoldes: isNaN(+tableCapurro.capurroPlantarFoldes)
        ? 0
        : +tableCapurro.capurroPlantarFoldes,
    },
    ballard: {
      puntajeBallar: +puntajeBallar ?? 0,
      ballardSkin: isNaN(+tableBallar.ballardSkin) ? 0 : +tableBallar.ballardSkin,
      ballardLanugo: isNaN(+tableBallar.ballardLanugo)
        ? 0
        : +tableBallar.ballardLanugo,
      ballardPlanta: isNaN(+tableBallar.ballardPlanta)
        ? 0
        : +tableBallar.ballardPlanta,
      ballardMamas: isNaN(+tableBallar.ballardMamas)
        ? 0
        : +tableBallar.ballardMamas,
      ballardOrejas: isNaN(+tableBallar.ballardOrejas)
        ? 0
        : +tableBallar.ballardOrejas,
      ballardGenitalesF: isNaN(+tableBallar.ballardGenitalesF)
        ? 0
        : +tableBallar.ballardGenitalesF,
      ballardGenitalesM: isNaN(+tableBallar.ballardGenitalesM)
        ? 0
        : +tableBallar.ballardGenitalesM,
    },
    notas,
    complicaciones: complicaciones ?? [],
  };
};

const mapToLoadPerinatales = (data) => {
  // return a new object with the data to load in the form same as the data to save
  // but with the data from the server
  const {
    expedienteId,
    horaNacimiento,
    numeroGestion,
    tipoParto,
    respiroYLloro,
    cefalico,
    toracico,
    abdominal,
    apgar,
    silverman,
    capurro,
    ballard,
    complicaciones,
    detalles,
    pesoNacimiento,
    edadGestional,
    atencionParto,
    talla,
  } = data;
  return {
    generales: {
      horaNacimiento,
      numeroGestion,
      edadGestional,
      sitionAtencion: atencionParto,
      pesoAlNacer: pesoNacimiento,
      tallaCm: talla,
    },
    datosPerimetro: {
      cefalico,
      toracico,
      abdominal,
    },
    tipoParto: tipoParto ? 'true' : 'false',
    respiroLloroAlNacer: `${respiroYLloro}`,
    puntajeApgar: apgar?.puntajeApgar,
    tableApgar: {
      apgarHeartRate: apgar?.apgarHeartRate ?? 0,
      apgarLungMaturity: apgar?.apgarLungMaturity ?? 0,
      apgarMuscleMovement: apgar?.apgarMuscleMovement ?? 0,
      apgarSkinColor: apgar?.apgarSkinColor ?? 0,
      apgarReflexes: apgar?.apgarReflexes ?? 0,
    },
    puntajeSilverman: +silverman?.puntajeSilverman ?? 0,
    tableSilverman: {
      silvermanNasalDilatation: silverman?.silvermanNasalDilatation ?? 0,
      silvermanGrunt: silverman?.silvermanGrunt ?? 0,
      silvermanLowerChestRetractions:
        silverman?.silvermanLowerChestRetractions ?? 0,
      silvermanXiphoidRetraction: silverman?.silvermanXiphoidRetraction ?? 0,
      silvermanUpperChestRetractions:
        silverman?.silvermanUpperChestRetractions ?? 0,
    },
    puntajeCapurro: +capurro?.puntajeCapurro ?? 0,
    tableCapurro: {
      capurroSkin: capurro?.capurroSkin ?? 0,
      capurroEar: capurro?.capurroEar ?? 0,
      capurroBreastGland: capurro?.capurroBreastGland ?? 0,
      capurroNipple: capurro?.capurroNipple ?? 0,
      capurroPlantarFoldes: capurro?.capurroPlantarFoldes ?? 0,
    },
    puntajeBallar: +ballard?.puntajeBallar ?? 0,
    tableBallar: {
      ballardSkin: ballard?.ballardSkin ?? 0,
      ballardLanugo: ballard?.ballardLanugo ?? 0,
      ballardPlanta: ballard?.ballardPlanta ?? 0,
      ballardMamas: ballard?.ballardMamas ?? 0,
      ballardOrejas: ballard?.ballardOrejas ?? 0,
      ballardGenitalesF: ballard?.ballardGenitalesF ?? 0,
      ballardGenitalesM: ballard?.ballardGenitalesM ?? 0,
    },
    complicaciones: detalles,
    notas: complicaciones,
  };
};

const isGreaterThanZero = (value) => +value > 0;
const anyGreaterThanZero = (...values) => values.some(isGreaterThanZero);

export {
  mapToSavePerinatales,
  mapToLoadPerinatales,
  isGreaterThanZero,
  anyGreaterThanZero,
};
