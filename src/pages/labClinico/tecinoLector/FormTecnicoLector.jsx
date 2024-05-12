import React, { Fragment } from "react";
import LayoutForm from "../../../containers/layouts/LayoutForm";
import { Link } from "react-router-dom";

export default function FormTecnicoLector() {
  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link
            className="btn btn-sm btn-light text-primary"
            to={"/lab_clinico/tecnico_lectores"}
          >
            <i className="fa fa-arrow-left" />
            Listado de tecnicos
          </Link>
        }
        title={"Administracion de Tecnico lectores"}
        Empresa
      >
        <div className="card mb-4">
          <div className="card-header border">
            Registro de técnicos lectores de Lab. Clínico
          </div>
          <div className="card-body">
            <form>
              <div className="row gx-3 mb-3">
                  <div className="form-group col-lg-4 mt-2">
                    <label htmlFor="" className="small mb-1">
                      CODIGO:(*)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigo"
                      placeholder="CODIGO EMPLEADO"
                    />
                  </div>

                  <div className="form-group col-lg-4 mt-2">
                    <label htmlFor="" className="small mb-1">
                      NOMBRE:(*)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="NOMBRE"
                    />
                  </div>

                  <div className="form-group col-lg-4 mt-2">
                    <label htmlFor="" className="small mb-1">
                      APELLIDO:(*)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefono"
                      placeholder="APELLIDO"
                    />
                  </div>
              </div>
              <div className="card-footer text-center">
                <div className="btn-toggle">
                  <Link
                    to={"/lab_clinico/tecnico_lectores"}
                    type="button "
                    className="btn btn-gris  mx-1"
                  >
                    <i
                      className="fa fa-times fa-lg"
                      style={{ marginRight: "10px" }}
                    />
                    Cancelar
                  </Link>

                  <button type="submit" className="btn btn-primary mx-1">
                    <i
                      className="fa fa-save fa-lg"
                      style={{ marginRight: "10px" }}
                    />
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
