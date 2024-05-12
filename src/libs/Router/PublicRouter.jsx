import React from "react";
import { Outlet } from "react-router-dom";
import Encriptaciones from "../../services/Encriptaciones";


const PublicRoute = () => {
  // const toke = AxiosCabeceras()
  const auth = Encriptaciones.getSession("token")? true: false // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : null;
};

export default PublicRoute;
