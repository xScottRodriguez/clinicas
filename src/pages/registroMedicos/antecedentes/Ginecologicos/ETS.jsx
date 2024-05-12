/** @format */

import React, { Fragment } from "react";

export default function ETS() {
  return (
    <Fragment>
      <table className="table table-bordered table-striped table-sm mb-5">
        <thead>
          <tr>
            <th>Enfermedad</th>
            <th>Seleccion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clamidia</td>
            <td className="align-middle">
              <div className="form-check form-switch center-x">
                <input
                  className="form-check-input"
                  type="checkbox"
                  data-model="gynecological_std"
                  name="sexually-transmitted-disease"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Herpes genital</td>
            <td className="align-middle">
              <div className="form-check form-switch center-x">
                <input
                  className="form-check-input"
                  type="checkbox"
                  data-model="gynecological_std"
                  name="sexually-transmitted-disease"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Herpes genital</td>
            <td className="align-middle">
              <div className="form-check form-switch center-x">
                <input
                  className="form-check-input"
                  type="checkbox"
                  data-model="gynecological_std"
                  name="sexually-transmitted-disease"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Gonorrea</td>
            <td className="align-middle">
              <div className="form-check form-switch center-x">
                <input
                  className="form-check-input"
                  type="checkbox"
                  data-model="gynecological_std"
                  name="sexually-transmitted-disease"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
