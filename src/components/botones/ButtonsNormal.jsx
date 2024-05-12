import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
export default function ButtonsNormal(props) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          onClick={() => navigate(props.ruta)}
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
