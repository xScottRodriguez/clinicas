import React, { Fragment } from "react";
import Select from "react-select";
export const UbicacionEmpresa = ({ cantones, municipio, handelChangesCantones,loadCantones,loadSelect, loadDepartamento, departamentoLoad, departamento, loadMunicipio, handleChangesMunicipios }) => {
  return (
    <Fragment>
  <div className="row gx-3 mb-3">

      <div className="col-lg-4 mt-4">
        <label htmlFor="" className="small mb-1">
          Pais:
        </label>
        <Select
          isClearable
          onChange={loadSelect}
          closeMenuOnSelect={false}
          placeholder="Pais..."
          id="pais"
        />
      </div>
      <div className="col-lg-4 mt-4">
        <label htmlFor="" className="small mb-1">
          Departamento:
        </label>
        <Select
          isClearable
          defaultValue={loadDepartamento}
          onChange={departamentoLoad}
          closeMenuOnSelect={false}
          placeholder="Departamento..."
          id="departamento"
          options={departamento}
        />
      </div>

      <div className="col-lg-4 mt-4">
        <label htmlFor="" className="small mb-1">
          Municipio:
        </label>
        <Select
          isClearable
          defaultValue={loadMunicipio}
          onChange={handleChangesMunicipios}
          options={municipio}
          closeMenuOnSelect={false}
          placeholder="Municipio..."
          id="municipio"
        />
      </div>

      <div className="col-lg-4 mt-4">
        <label htmlFor="" className="small mb-1">
          Cantones:
        </label>
        <Select
          isClearable
          defaultValue={loadCantones}
          closeMenuOnSelect={false}
          placeholder="Canton..."
          onChange={handelChangesCantones}
          options={cantones}
        />
      </div>
      <div className="col-lg-4 mt-4">
        <label htmlFor="" className="small mb-1">
          Caserio:
        </label>
        <Select
          isClearable
        //   onChange={loadSelect}
          closeMenuOnSelect={false}
          placeholder="Caserio..."
          id="departamento"
        //   options={sucursal}
        />
      </div>
      </div>
    </Fragment>
  );
};
