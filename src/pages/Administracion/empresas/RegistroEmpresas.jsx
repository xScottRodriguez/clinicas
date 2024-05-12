import React, { Fragment } from "react";
import Select from "react-select";
export const RegistroEmpresa = ({errorEmpresa,handleEmpresa,loadSelect,select,sucursal}) => {
  return (
    <Fragment>
      <div className="row gx-3 mb-5">
      <div className="form-group col-lg-5 mt-3">
          <label htmlFor="" className="small mb-1">
            Empresa:
          </label>
          <input
            type="text  "
            className={`form-control ${errorEmpresa ? "is-invalid" : ""}`}
            placeholder="Nombre Empresa"
            id="empresa"
            onChange={handleEmpresa}
          />
        </div>
        
        <div className="form-group  col-lg-5 mt-3">
          <label htmlFor="" className="small mb-1">
            Sucursales:
          </label>
          <Select
            isClearable
            defaultValue={select}
            onChange={loadSelect}
            closeMenuOnSelect={false}
            placeholder="Sucursal"
            id="sucursales"
            options={sucursal}
          />
        </div>
      </div>
    </Fragment>
  );
};
