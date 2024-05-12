/** @format */

//importamos axios
import clienteAxios from "./Axios";
import HeaderAxios from "./AxiosCabeceras";

class PeticionesAxios {
  async POST(ruta, body) {
    return await clienteAxios
      .post(ruta, body, { headers: HeaderAxios.getHeader() })
      .then((res) => {
        if (!res) {
          return false;
        }
        //si existe respuesta envia la respuesta
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.res.status === 401) {
          //limpiamos la sesion
          localStorage.clear();
          window.location.href = "/login";
        }
        return error.res;
      });
  }
  async POST_FILE(ruta, body) {
    return await clienteAxios
      .post(ruta, body, {
        headers: {
          ...HeaderAxios.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (!res) {
          return false;
        }
        //si existe respuesta envia la respuesta
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.res.status === 401) {
          //limpiamos la sesion
          localStorage.clear();
          window.location.href = "/login";
        }
        return error.res;
      });
  }

  async GET(ruta, params = {}) {
    return await clienteAxios
      .get(ruta, { headers: HeaderAxios.getHeader(), params })
      .then((res) => {
        if (!res) {
          return false;
        }
        return res;
      })
      .catch((err) => {
        if (!err.res) {
          return false;
        }
        if (err.res.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        return err.res;
      });
  }

  async POST_NOT_AUTH(ruta, body) {
    return await clienteAxios
      .post(ruta, body)
      .then((response) => {
        if (!response) {
          return false;
        }
        //si existe respuesta envia la respuesta
        return response;
      })
      .catch((error) => {
        if (!error.response) {
          return false;
        }
        return error.response;
      });
  }

  //funcion para hacer peticiones tipo post sin cabecera
  async create(ruta, body) {
    //hacemos la peticion a nuestra api
    return await clienteAxios
      .post(ruta, body)
      .then((res) => {
        console.log(res);
        if (!res) {
          return false;
        }
        //si existe respuesta envia la respuesta
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.res.status === 401) {
          //limpiamos la sesion
          localStorage.clear();
          window.location.href = "/login";
        }
        return error.res;
      });
  }

  /** funcion put para actualizar registro*/

  async update(ruta, data) {
    return await clienteAxios
      .put(ruta, data, { headers: HeaderAxios.getHeader() })
      .then((res) => {
        if (!res) {
          return false;
        }
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.res.status === 401) {
          //borrar todas las sesiones guardaas
          //en localStorage
          localStorage.clear();
          //redireccionamos al login
          window.location.href = "/login";
        }
        return error.res;
      });
  }
  /** funciones get recive como parameteo la ruta */
  async find(ruta) {
    return await clienteAxios
      .get(ruta, { headers: HeaderAxios.getHeader() })
      .then((res) => {
        if (!res) {
          return false;
        }
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.res.status === 401) {
          //borramos la sesion
          localStorage.clear();
          window.location.href = "/login";
        }
        return error.res;
      });
  }
  async PATCH(ruta, body) {
    return await clienteAxios
      .patch(ruta, body, {
        headers: {
          ...HeaderAxios.getHeader(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (!res) {
          return false;
        }
        return res;
      })
      .catch((error) => {
        if (!error.res) {
          return false;
        }
        if (error.response === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        return error.res;
      });
  }

  //funcion para esactivar o eliminar registro
  async borrar(ruta, body) {
    return await clienteAxios
      .delete(ruta, { headers: HeaderAxios.getHeader(), data: body })
      .then((response) => {
        if (!response) {
          return false;
        }
        return response;
      })
      .catch((error) => {
        if (!error.response) {
          return false;
        }
        return error.response;
      });
  }
}

export default new PeticionesAxios();
