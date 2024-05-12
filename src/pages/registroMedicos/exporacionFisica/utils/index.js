const formattPayload = (data) => {
  const {
    signosVitales: {
      precionAlterial: { sistolica, diastolica },
      frecuenciaCardiaca,
      frecuenciaRespiratoria,
      temperatura,
      glucomeriaCapilar,
      saturacionoxigeno,
    },
    habitusExterior,
    cabeza,
    ojos,
    otorrinoLarigologia,
    cuello,
    torax,
    abdomen,
    exploracionGinecologica,
    genitales,
    columnaVertebral,
    extremidades,
    exploracionNeurologica,
  } = data;
  return {
    neurologica: exploracionNeurologica,
    extremidades,
    coumnaVertebral: columnaVertebral,
    genitales,
    ginecologica: exploracionGinecologica,
    abdomen,
    torax,
    cuello,
    otorrinolaringologia: otorrinoLarigologia,
    ojos,
    cabeza,
    habitusExterior,
    signosVitales: {
      presionArterialSitolica: sistolica,
      presionArterialDiastolica: diastolica,
      frecuenciaCardiaca,
      frecuenciaRespiratoria,
      temperatura,
      glucometriaCapilar: glucomeriaCapilar,
      saturacionOxigeno: saturacionoxigeno,
    },
  };
};

export { formattPayload };
