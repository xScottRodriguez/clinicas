/** @format */

import { differenceInYears, parseISO } from "date-fns";
export const calcularEdad = (fechaNacimiento) => {
  const fechaActual = new Date();

  const fechaNac = parseISO(fechaNacimiento);

  return differenceInYears(fechaActual, fechaNac);
};
