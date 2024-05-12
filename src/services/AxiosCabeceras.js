import Encriptaciones from "./Encriptaciones";

class HeaderAxios {
  getHeader() {
    const header = {
      //Se obtiene el token de la session
      Authorization: "Bearer " + Encriptaciones.getSession("token"),
      // ruta_o: window.location.pathname,
    };

    return header;
  }
}

export default new HeaderAxios();
