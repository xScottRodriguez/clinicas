import React, { Fragment } from "react";
import Select from "react-select";

export default function Responsable({
  errror,
  register,
  personaState,
  personasSet,
  responsable,
  onChangesPersonas,
}) {
  const handleChangesPersonaResponsables = (value) => {
    personasSet({ ...personaState, parentesco: value });
  };
  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Tipo de parentesco: (*)
          </label>
          <Select
            isClearable
            placeholder="Parentesco"
            id="parentesco"
            options={responsable}
            onChange={handleChangesPersonaResponsables}
            // defaultValue={personaState?.idParentescoResponsable}
            value={personaState?.parentesco}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Nombre completo responsable: (*):
          </label>
          <input
            type="text  "
            className="form-control"
            placeholder="Nombre completo"
            id="responsable"
            {...register("responsable", {
              required: true,
            })}
            onChange={onChangesPersonas}
          />
          {errror.personaResponsable?.type === "required" && (
            <b style={{ color: "#E77575" }} className="mt-2">
              El campo es requerido
            </b>
          )}
        </div>
      </div>
    </Fragment>
  );
}
