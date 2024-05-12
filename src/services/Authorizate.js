import React from "react";
import Auth from "./Auth";
import ErrorNotFount from "../pages/error/404";

export default function Authorizate(Componente, modulo) {
  if (Auth.getAuthorization(modulo)) {
    return <Componente />;
  } else {
    return <ErrorNotFount />;
  }
}
