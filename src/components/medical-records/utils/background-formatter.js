/** @format */

const formatAntecendentes = (antecedentes, obstetricos) => {
  const {
    alergias,
    hereditario,
    patologicos,
    noPatologicos,
    perinatales,
    ginecologicos,
  } = antecedentes;

  const formattedAllergies = formatAlergias(alergias);
  const formattedHereditary = formatHereditario(hereditario);
  const formattedPathological = formatPathological(patologicos);
  const formattedNoPathological = formatNoPathological(noPatologicos);
  const formattedPerinatal = formatPerinatales(perinatales);
  // const formattedGinecologicos = formatGinecologicos(ginecologicos);
  // const formattedObstetricos = formatObstetricos(obstetricos);
};

// FORMATTERS
const formatAlergias = (alergias) => {
  return alergias?.map((alergia) => {
    const { id, comentario, selectedSymptoms, isChecked } = alergia;

    if (!isChecked) return null;
    return {
      alergiaId: id,
      comentario,
      sintomas: formatSintomas(selectedSymptoms),
    };
  });
};
const formatSintomas = (sintomas) =>
  sintomas?.map(({ id, name }) => ({
    id,
    nombre: name,
  }));

// HEREDITARY
const formatHereditario = (hereditarios) => {
  return hereditarios?.map((hereditario) => {
    const { id, descripcion } = hereditario;
    return {
      enfermedadId: id,
      comentario: descripcion.trim(),
      parentesco: formatParentesco(hereditario.familiares),
    };
  });
};

const formatParentesco = (parentescos) => {
  return parentescos
    ?.map((parentesco) => {
      const { code, isChecked, valor } = parentesco;
      if (!isChecked) return null;
      return {
        id: +code,
        nombre: valor,
      };
    })
    .filter((parentesco) => parentesco !== null);
};

// PATOLOGICOS
const formatPathological = (patologicos) => {
  return patologicos?.map((patologico) => {
    const { idEnfermedad, idTipoEnfermedad } = patologico;
    return {
      patologicoId: +idEnfermedad,
      enfermedad: formatTypeDisease(idTipoEnfermedad),
    };
  });
};

const formatTypeDisease = (disease) =>
  disease?.map((disease) => ({ ...disease, activo: true }));

// NO PATOLOGICOS
const formatNoPathological = (noPatologicos) => {
  const {
    habitosAlimenticios,
    habitosHigiene,
    actividadFisicaAndDream,
    tipoHabitacionAndHacinamiento,
    exposicionToxicos,
    activeBlood,
    smokItemActive,
    alcoholismo,
    tabaquismo,
    drugs,
  } = noPatologicos;
  const noPathological = {};
  noPathological.otrosAntecedentes = {
    tipoAlimentacion: habitosAlimenticios,
    habitosHigiene,
    actividadFisica: actividadFisicaAndDream,
    habitacionAndHacinamiento: tipoHabitacionAndHacinamiento,
    toxinos: exposicionToxicos,
    tipoSangre: activeBlood,
    tabaquismo: {
      tipoFumador: smokItemActive,
      cigarroDiario: +tabaquismo?.dailySigarrillosCount ?? null,
      yearsFumando: +tabaquismo?.smokerYear ?? null,
      tipoTabaquismo: tabaquismo?.fumablesCollection?.values ?? null,
    },
    alcoholismo: {
      tipo: alcoholismo?.alcholismItemActive,
      indiceAlcoholismo: +alcoholismo?.alcoholCount?.value ?? null,
      notas: alcoholismo?.alcoholCount?.notes ?? null,
    },
    toxicomanias: {
      tipo: drugs?.drugsItemActive ?? null,
      drogasEstimulantes: drugs?.stimulants ? formatSDrugs(drugs?.stimulants) : [],
      drogasDepresoras: drugs?.depressants ? formatSDrugs(drugs?.depressants) : [],
      drogasAlucinogenas: drugs?.hallucinogens
        ? formatSDrugs(drugs?.hallucinogens)
        : [],
      nota: drugs?.notas ?? null,
    },
  };
};

const formatSDrugs = (drugs) => drugs?.map((drug) => ({ id: drug.drugId }));

// perinatales
const formatPerinatales = (perinatales) => {
  const {
    generales,
    tipoParto,
    respiroLloroAlNacer,
    datosPerimetro,
    puntajeAgar,
    tableApgar,
    puntajeSilverman,
    tableSilverman,
    puntajeBallar,
    tableBallar,
    puntajeCapurro,
    tableCapurro,
    notas,
    complicaciones,
  } = perinatales;

  const {
    horaNacimiento,
    numeroGestion,
    edadGestacional,
    sitionAtencion,
    pesoAlNacer,
    tallaCm,
  } = generales;
  const formattedPerinatal = {
    horaNacimiento,
    numeroGestion,
    edadGestacional,
    ubicacionParto: sitionAtencion,
    pesoAlNacer,
    talla: tallaCm,
    tipoParto,
    respiroYLloro: respiroLloroAlNacer,
    cefalico: +datosPerimetro.cefalico ?? 0,
    toracico: +datosPerimetro.toracico ?? 0,
    abdominal: +datosPerimetro.abdominal ?? 0,
    observaciones: notas,
    complicaciones,
    apgar: formatTalbe(tableApgar, puntajeAgar),
    silverman: formatTalbe(tableSilverman, puntajeSilverman),
    ballard: formatTalbe(tableBallar, puntajeBallar),
    capurro: formatTalbe(tableCapurro, puntajeCapurro),
  };
  return formattedPerinatal;
};

const formatTalbe = (table, score) => {
  return Object.entries(table)?.map(([, value]) => ({
    idPuntuacion: score,
    idDescripcion: value,
  }));
};

// ginecologicos

// obstetricos

export { formatAlergias, formatHereditario, formatPathological };
