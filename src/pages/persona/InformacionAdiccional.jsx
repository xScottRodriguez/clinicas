import React, { Fragment } from "react";
import LayoutPanel from "../../containers/layouts/LayoutPanel";
export default function InformacionAdiccional() {
  return (
    <Fragment>
      <LayoutPanel titulo="Informaacion adicional">
        <div className="row gx mb-3">
          <div className="col-lg-5 md-4 mt-4">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                id="chequeado"
                type="checkbox"
                // checked={true}
              />
              <label className="form-check-label" htmlFor="checkAccountChanges">
                Actualmente en tratamiento
              </label>
            </div>
          </div>
          <div className="col-lg-5 md-4">
            <label htmlFor="" className="small mb-1">
              Estado de la Enfermedad:
            </label>
            <textarea
              className="form-control"
              id="Estado"
              placeholder="Enfermedad"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
      </LayoutPanel>
    </Fragment>
  );
}
