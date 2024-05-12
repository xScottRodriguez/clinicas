import React, { Fragment } from "react";
import Select from "react-select";

export const DatosEmpresas = () => {
  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="col-md-4 mt-2">
          <label htmlFor="" className="small mb-1">
            NRC Empresas:
          </label>
          <input
            type="number"
            className={`form-control  'is-invalid' `}
            id="nrc"
            placeholder="NRC Empresa..."
            // onChange={''}
          />
        </div>

        <div className="col-lg-4 mt-2">
          <label htmlFor="" className="small mb-1">
            NIT Empresa:
          </label>
          <input
            type="number"
            className={`form-control 'is-invalid' `}
            id="direccion"
            placeholder="NIT Empresa..."
          />
        </div>

        <div className="col-lg-4 mt-2">
          <label htmlFor="" className="small mb-1">
            razón socia:
          </label>
          <input
            type="text"
            className={`form-control 'is-invalid' }`}
            id="telefono"
            placeholder="Razón socia..."
            // onChange={''}
            // value={""}
          />
        </div>

        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Actividades Economicas :
          </label>
          <Select
            isClearable
            // onChange={loadSelect}
            closeMenuOnSelect={false}
            placeholder="Actividades Eco..."
            id="economica"
            // options={sucursal}
          />
        </div>
        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Patrono actual:
          </label>
          <Select
            isClearable
            // onChange={loadSelect}
            closeMenuOnSelect={false}
            placeholder="Actividades Eco..."
            id="patrono"
            // options={sucursal}
          />
        </div>

        <div className="col-lg-4 mt-4 ">
                  <div className="col-lg-7 text-center mt-2">
                    <label className="small mb-1">
                      Agente percecpcion:
                    </label>
                    <div
                      // onChange={handleChanges}
                      className="boder d-flex justify-content-center align items-center"
                    >
                      <div
                        className="form-check form-switch "
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          readOnly
                          // checked={habilitado ? "checked" :0}
                          id="esPadre"
                          // value={c? "1": "0"}
                          role="switch"
                          // onChange={handleCheck}
                        />
                      </div>
                    </div>
                  </div>
                  </div>
        
      </div>
    </Fragment>
  );
};
