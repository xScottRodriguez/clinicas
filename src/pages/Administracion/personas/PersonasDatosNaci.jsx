import React, { Fragment } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PersonasDatosNaci = ({
  onChangesPersonas,
  personasSet,
  persona,
  register,
}) => {
  const handleTelefonoTrabajo = (value) => {
    personasSet({ ...persona, telefonoTrabajo: value });
  };

  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-4 mt-3">
          <label htmlFor="" className="small mb-1">
            Profesion: (*)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Profesion"
            id="profesion"
            {...register("profesion", {
              required: false,
            })}
            onChange={onChangesPersonas}
            defaultValue={persona?.profesion}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Lugar de profesion: (*):
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Lugar de profesion"
            id="lugarTrabajo"
            {...register("lugarTrabajo", {
              required: false,
            })}
            onChange={onChangesPersonas}
            defaultValue={persona?.lugarTrabajo}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Direccion del trabajo: (*):
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Lugar de profesion"
            id="direccionTrabajo"
            {...register("direccionTrabajo", {
              required: false,
            })}
            onChange={onChangesPersonas}
            defaultValue={persona?.lugardireccionTrabajoTrabajo}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Telefono del trabajo: (*):
          </label>
          <PhoneInput
            id="telefonoTrabajo"
            country={"sv"}
            enableSearch={true}
            onChange={handleTelefonoTrabajo}
            value={persona?.telefonoTrabajo}
          />
        </div>
      </div>
    </Fragment>
  );
};
