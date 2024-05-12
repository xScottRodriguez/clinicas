const formatData = (data) => {
  const {
    analisis: { reasonConsultation, symptoms, description },
    cardioVascular,
    urinario,
    sistemasGenerales: sistemaGeneral,
    sistemaNervioso,
    respiratorio,
    reproductivo,
    skin,
    musculoEsqueletico,
    mamas,
    endocrino,
    digestivo,
    hermolinfatico,
  } = data;
  return {
    analisis: {
      motivoConsulta: reasonConsultation,
      sintomas: symptoms,
      descripciones: description,
    },
    cardiovascular: cardioVascular,
    urinario,
    digestivo,
    endocrino,
    hemolinfatico: hermolinfatico,
    mamas,
    musuculoEsquelitico: musculoEsqueletico,
    pielAnexos: skin,
    reproductivo,
    respiratorio,
    sistemaNervioso,
    sistemaGeneral,
  };
};

export { formatData };
