import React, { Fragment } from "react";
import Select from "react-select";
export default function Cliente({
  datosGrupoPersona,
  datosGrupoClientes,
  datosNaturalezaCliente,
  onChangesPersonas,
  personasSet,
  persona,
  register,
  datosSucursal,
}) {
  const onChanesGrupoClientes = (value) => {
    personasSet({ ...persona, gruposCliente: value });
  };
  const onChanesGrupoPersonas = (value) => {
    personasSet({ ...persona, gruposPersona: value });
  };
  const onChanesTipoPersona = (value) => {
    personasSet({ ...persona, tipoCliente: value });
  };

  const onChanesSucursal = (value) => {
    personasSet({ ...persona, sucursal: value });
  };

  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Grupo cliente: (*):
          </label>
          <Select
            id="gruposCliente"
            options={datosGrupoClientes}
            placeholder="Grupo de cliente"
            onChange={onChanesGrupoClientes}
            value={persona?.gruposCliente}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Grupo personas: (*):
          </label>
          <Select
            id="gruposPersona"
            options={datosGrupoPersona}
            placeholder="Grupo de personas"
            onChange={onChanesGrupoPersonas}
            value={persona?.gruposPersona}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Tipo de cliente: (*)
          </label>
          <Select
            id="tipoCliente"
            options={datosNaturalezaCliente}
            placeholder="Tipo de cliente"
            onChange={onChanesTipoPersona}
            value={persona?.tipoCliente}
          />
        </div>

        <div className="form-group col-sm-4 mt-3">
          <label htmlFor="" className="small mb-1">
            Sucursal: (*)
          </label>
          <Select
            id="sucursal"
            options={datosSucursal}
            placeholder="sucursales"
            onChange={onChanesSucursal}
            value={persona?.sucursal}
          />
        </div>
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            Razon social: (*)
          </label>
          <input
            type="text"
            id="razonSocial"
            className="form-control"
            placeholder="razon social"
            {...register("razonSocial", {
              required: true,
            })}
            onChange={onChangesPersonas}
            defaultValue={persona?.razonSocial}
          />
        </div>
      </div>
      <div className="row gx-3 mb-3">
        <div className="form-group col-sm-4 mt-3 ">
          <label htmlFor="" className="small mb-1">
            NRC: (*)
          </label>
          <input
            type="text"
            id="nrc"
            className="form-control"
            placeholder="NRC"
            {...register("nrc", {
              required: false,
            })}
            onChange={onChangesPersonas}
            defaultValue={persona?.nrc}
          />
        </div>
        <div className="form-group col-sm-4 mt-3">
          <label htmlFor="" className="small mb-1">
            NIT: (*)
          </label>
          <input
            type="text"
            id="nit"
            className="form-control"
            placeholder="NIT"
            {...register("nit", {
              required: false,
            })}
            defaultValue={persona?.nit}
            onChange={onChangesPersonas}
          />
        </div>
        <div className="form-group col-sm-4 mt-3">
          <label htmlFor="" className="small mb-1">
            Giro: (*)
          </label>
          <input
            id="giro"
            type="text"
            className="form-control"
            placeholder="Giro"
            {...register("giro", {
              required: false,
            })}
            defaultValue={persona?.giro}
            onChange={onChangesPersonas}
          />
        </div>
      </div>
    </Fragment>
  );
}
