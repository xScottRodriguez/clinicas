import React, { Fragment } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PersonaContactos = ({ personasSet, persona }) => {
  const handleChackbox = (e) => {
    const id_componente = e.target.id;
    if (document.getElementById(id_componente).checked) {
      personasSet({ ...persona, [id_componente]: 1 });
    } else {
      personasSet({ ...persona, [id_componente]: 0 });
    }
  };

  const hanleChangesTelefonos = (value) => {
    personasSet({ ...persona, telefonoPrincipal: value });
  };

  const handleChangesTelefonoCasa = (value) => {
    personasSet({ ...persona, telefonoCasa: value });
  };

  const handleChangesTelefonoAdicional = (value) => {
    personasSet({ ...persona, telefonoAdicional: value });
  };

  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-3 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Telefono celular: (*):
          </label>
          <PhoneInput
            id="telefonoPrincipal"
            country={"sv"}
            enableSearch={true}
            defaultCountry={"sv"}
            onChange={hanleChangesTelefonos}
            value={persona?.telefonoPrincipal}
          />
        </div>
        <div className="form-group col-sm-4 mt-5 ">
          <div className="form-check form-switch mb-3">
            <input
              type="checkbox"
              id="tieneWhatsapp"
              className="form-check-input"
              onChange={handleChackbox}
              checked={persona?.tieneWhatsapp}
            />

            <label htmlFor="whatsapp">
              <div className="mt-0">
                whatsapp <i className="fa fa-mobile" />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Telefono de casa: (*):
          </label>
          <PhoneInput
            id="telefonoCasa"
            country={"sv"}
            enableSearch={true}
            onChange={handleChangesTelefonoCasa}
            value={persona?.telefonoCasa}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Telefono adicional: (*):
          </label>
          <PhoneInput
            id="telefonoAdicional"
            country={"sv"}
            enableSearch={true}
            onChange={handleChangesTelefonoAdicional}
            value={persona?.telefonoAdicional}
          />
        </div>
      </div>
    </Fragment>
  );
};
