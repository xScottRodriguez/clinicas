/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function BotonesExportaryAgregar(props) {
  return (
    <Fragment>
      <div className="d-grid gap-2 d-md-flex mt-h-auto justify-content-md-end">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            id="dropdownFadeInUp"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span
              className="fa fa-download"
              style={{ marginRight: "10px" }}
            ></span>
            Exportar
          </button>
          <div
            className="dropdown-menu animated--fade-in-up"
            aria-labelledby="dropdownFadeInUp"
          >
            <Link className="dropdown-item" to="">
              <span
                className="fa fa-file-pdf"
                style={{ marginRight: "10px" }}
              ></span>
              PDF
            </Link>
            <Link className="dropdown-item" to="">
              <span
                className="fa fa-file-csv"
                style={{ marginRight: "10px" }}
              ></span>
              Excel
            </Link>
          </div>
        </div>

        <button
          onClick={props.agregar}
          className={"btn btn-primary"}
          type="button"
        >
          <span className="fa fa-plus" style={{ marginRight: "10px" }}></span>
          {props.nombre}
        </button>
      </div>
    </Fragment>
  );
}
