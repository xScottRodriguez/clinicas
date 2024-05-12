/* eslint-disable import/no-anonymous-default-export */
import Encriptaciones from './Encriptaciones';

class Auth {
  // funcion para obtener la authorizacion para un modulo
  getAuthorization(modulo_id) {
    //se obtienen los modulos a los cuales se tiene permiso
    const modules = Encriptaciones.getSession('modulos');

    let isAuth = false;
    modules?.forEach((element) => {
      if (element === modulo_id) {
        isAuth = true;
      }
    });

    return isAuth;
  }
}

export default new Auth();
