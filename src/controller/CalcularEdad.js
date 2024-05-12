
class Fechas {
  calcularEdad = (fechaNacimiento) => {
    if(fechaNacimiento.length > 0){
    const fechaActual = new Date();
    const anioActual = parseInt(fechaActual.getFullYear());
    const mesActual = parseInt(fechaActual.getMonth()) + 1;
    const diaActual = parseInt(fechaActual.getDate());

    const anioNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
    const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
    const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

    let edad = 0;
    edad = anioActual - anioNacimiento;

    if (mesActual < mesNacimiento) {
      edad--;
    } else if (mesActual === mesNacimiento) {
      if (diaActual < diaNacimiento) {
        edad--;
      }
    }
    return edad;
    } else {
      return 0;
    }
  };
}
export default new Fechas();
