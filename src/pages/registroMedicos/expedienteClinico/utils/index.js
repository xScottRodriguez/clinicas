const formatCreatePatient = (data) => {
  const {
    paciente: { value: pacienteId },
    profesion,
    // descripcion,
    responsable,
  } = data;

  const {
    nombre,
    parentesco,
    telefono,
    tipoDocumento: { id: documentoId },
    numeroDocumento,
  } = responsable;

  return {
    personaId: pacienteId,
    nombreResponsable: nombre,
    direccionTrabajo: '',
    profesion,
    telefonoResponsable: telefono,
    parentescoPersona: parentesco?.value,
    tipoDocumento: documentoId,
    numeroDocumento,
    requiredUpdate: true,
  };
};
export { formatCreatePatient };
