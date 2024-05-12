/** @format */

export const validForm = (data) => {
  const { activePatient } = data;

  if (!activePatient) return "No se ha seleccionado un paciente";

  return activePatient && activePatient.activo
    ? "El paciente seleccionado ya posee expediente"
    : false;
};
