/** @format */

const addMonths = (date, amount) => {
  const endDate = new Date(date.getTime());
  const originalTimeZoneOffset = endDate.getTimezoneOffset();
  endDate.setMonth(endDate.getMonth() + amount);
  while (monthDiff(date, endDate) > amount) {
    endDate.setDate(endDate.getDate() - 1);
  }

  const endTimeZoneOffset = endDate.getTimezoneOffset();
  const diff = endTimeZoneOffset - originalTimeZoneOffset;
  const finalDate = diff
    ? endDate.setMinutes(endDate.getMinutes() - diff)
    : endDate;
  return new Date(finalDate);
};

const monthDiff = (from, to) => {
  const years = to.getFullYear() - from.getFullYear();
  const months = to.getMonth() - from.getMonth();
  return 12 * years + months;
};

const weekDiff = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
};

const dayDiff = (dt2, dt1) => {
  var time_difference = dt2.getTime() - dt1.getTime();
  var diff = time_difference / (1000 * 60 * 60 * 24);
  return Math.abs(Math.round(diff));
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const zeroPad = (number, length) => {
  return String(number).length >= length
    ? String(number)
    : ('0'.repeat(length) + number).slice(-length);
};

const formatGinecologicos = (ginecologicos) => {
  const {
    antecedentesG,
    enfermedadesTransmicionSexual,
    calculoPartoAndEdadGestional,
    alteracionesDeMenstruacion,
    anticoncepcion,
  } = ginecologicos;

  const { year, day, moth } = calculoPartoAndEdadGestional;
  const edadGestional = `${year}-${moth}-${day}`;
  const {
    alteraciones,
    inicioVidaSexual,
    numeroParejas,
    tipoVaginitis,
    vaginitis,
  } = alteracionesDeMenstruacion;

  const { tipoAnticoncepcion, ...rest } = anticoncepcion;
  const { menarca, formulaMenstrual, menopausia, ultimaCitologia } = antecedentesG;
  const formattedGinecologicos = {
    formulaMenstrual: formulaMenstrual,
    menopausia: menopausia,
    ultimaCitologia,
    manarca: +menarca,
    alteracionMenstrual: formatAlterations(alteraciones),
    inicioVidaSexual,
    numeroDeParejas: numeroParejas,
    vaginitis,
    tipoVaginitis: +tipoVaginitis?.value ?? null,
    inicio: rest.inicioAnticoncepcion,
    edadGestional,
    anticonceptivos: tipoAnticoncepcion?.value ?? null,
    suspension: anticoncepcion?.finAnticoncepcion ?? null,
    transmisionSexual: formatSexuallyTransmittedDiseases(
      enfermedadesTransmicionSexual
    ),
    observaciones: rest.observaciones,
  };

  return formattedGinecologicos;
};

const formatAlterations = (alterations) => alterations?.map(({ value }) => value);

const formatSexuallyTransmittedDiseases = (diseases) =>
  diseases?.map((disease) => disease);

const ginecologicalaAdapter = (ginecologicos) => {
  const antecedentesG = {
    menarca: ginecologicos.manarca,
    formulaMenstrual: ginecologicos.formulaMenstrual,
    menopausia: ginecologicos.menopausia,
    ultimaCitologia: ginecologicos.ultimaCitologia,
  };
  const calculoPartoAndEdadGestional = {
    year: ginecologicos?.calculoPartoGestional?.split('-')[0] ?? null,
    moth: ginecologicos?.calculoPartoGestional?.split('-')[1] ?? null,
    day: ginecologicos?.calculoPartoGestional?.split('-')[2] ?? null,
    pregnantWeeks: null,
    pregnantDays: null,
    dueDate: null,
  };

  const alteracionesDeMenstruacion = {
    alteraciones: ginecologicos.alteracionMenstruacion,
    inicioVidaSexual: ginecologicos.edadInicioVidaSexual,
    numeroParejas: ginecologicos.numeroParejas,
    tipoVaginitis: ginecologicos.tipoVaginitis,
    vaginitis: ginecologicos.vaginisitis,
  };
  const anticoncepcion = {
    inicioAnticoncepcion: ginecologicos.inicioAnticoncepcion,
    finAnticoncepcion: ginecologicos.suspencionAnticoncepcion,
    observaciones: ginecologicos.observaciones,
    tipoAnticoncepcion: ginecologicos.anticonceptivo,
  };
  return {
    anticoncepcion,
    antecedentesG,
    calculoPartoAndEdadGestional,
    alteracionesDeMenstruacion,
    enfermedadesTransmicionSexual: ginecologicos.transmisioSexual,
  };
};
const formatAlteraciones = (alteraciones, dbAlteraciones) => {
  return alteraciones?.map((alteracion) => {
    const { id, nombre } = dbAlteraciones.find(({ id }) => id === alteracion);
    return {
      value: id,
      label: nombre,
    };
  });
};
export {
  formatAlteraciones,
  addMonths,
  monthDiff,
  weekDiff,
  dayDiff,
  capitalize,
  zeroPad,
  formatGinecologicos,
  ginecologicalaAdapter,
};
