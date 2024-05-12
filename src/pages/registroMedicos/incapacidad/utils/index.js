const formatPayload = (data) => {
  const { fechaInicio, fechaFinal, notas } = data;
  const payload = {
    fechaInicio: new Date(fechaInicio),
    fechaFin: new Date(fechaFinal),
    datos: notas,
  };
  return payload;
};

export { formatPayload };
