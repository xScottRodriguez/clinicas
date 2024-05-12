const {
  formatPathological,
} = require('../../../../../components/medical-records/utils/background-formatter');

function extractCharacteristicIds(characteristics) {
  return characteristics?.map(({ id, comentario }) => ({
    id,
    comentario,
  }));
}

const pathologicalDiseasesAdapter = (data) => {
  return data?.map((item) => ({
    idEnfermedad: item.patologicoId,
    idTipoEnfermedad: extractCharacteristicIds(item.caracteristicas),
  }));
};

const payloadToPathologicalSaver = (data, expediente) => {
  return {
    expedienteId: expediente,
    patologico: formatPathological(data),
  };
};

module.exports = {
  pathologicalDiseasesAdapter,
  payloadToPathologicalSaver,
};
