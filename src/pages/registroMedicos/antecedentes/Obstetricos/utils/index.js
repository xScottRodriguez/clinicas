const formatObstetricos = (obstetricos) => {
  const {
    datosGenerales,
    formulaObstetrica,
    embarazoActual,
    antecedentesEmbarazoPrevios,
    enfermedadObstetrica,
  } = obstetricos;
  const { noConsultas, medicacionGestacional, examenesComplementarios, notas } =
    datosGenerales;

  const { a: A, g: G, p: P, c: C } = formulaObstetrica;
  const formattedObstetricos = {
    numeroConsulta: +noConsultas,
    gestional: +medicacionGestacional ?? 0,
    examenesComplementario: examenesComplementarios,
    observaciones: notas,
    formulaObstretica: {
      A: +A ?? 0,
      C: +C ?? 0,
      G: +G ?? 0,
      P: +P ?? 0,
    },
    nacidoVivos: +formulaObstetrica.nacidosVivos ?? 0,
    nacidoMuertos: +formulaObstetrica.nacidosMuertos ?? 0,
    viven: +formulaObstetrica.viven ?? 0,
    muertoEnPrimeraSemana: +formulaObstetrica.muertoPrimeraSemana ?? 0,
    muertoDespuePrimeraSemana: +formulaObstetrica.muertoDespuesPrimeraSemana ?? 0,
    antecedentesEmbarazoPrevio: mapAntecedentesEmbarazosPrevios(
      antecedentesEmbarazoPrevios
    ),
    enfermedadObstretica: mapData(enfermedadObstetrica, 'value'),
    datosGeneralesEmbarazoActual: embarazoActual,
  };

  return formattedObstetricos;
};

const mapAntecedentesEmbarazosPrevios = (data) =>
  data?.map(({ enfermedadId, comentario, isChecked }) => {
    return {
      id: +enfermedadId,
      padece: isChecked,
      comentario,
    };
  });

const mapData = (data, target = 'id') => data?.map((item) => item[target]);

export { formatObstetricos };
