import React, {Fragment} from 'react'
import { useNavigate } from 'react-router-dom'

export default function BotonesTablaEstudios(props) {
    const navigate = useNavigate();
  return (
    <Fragment>
        <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          id="dropdownMenuButton"
          type="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.acciones}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button

            className="dropdown-item"
            type="button"
          >
            <span
              className="fas fa-edit"
              style={{ marginRight: "10px" }}
            ></span>
            {props.editar}
          </button>
          <button className="dropdown-item" type="button">
            <span
              className="far fa-trash-alt"
              style={{ marginRight: "10px" }}
            ></span>
            {props.eliminar}
          </button>
          <button
            onClick={() => navigate(props.ruta)}
            className="dropdown-item"
            type="button"
          >
            <span className="fa fa-plus" style={{ marginRight: "10px" }}></span>
            {props.agg}
          </button>
        </div>
      </div>
    </Fragment>
  )
}
