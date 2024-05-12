import React, { Fragment } from "react";
import LayoutForm from "../../../containers/layouts/LayoutForm";
import { Link } from "react-router-dom";
import Select from "react-select";
import Listado from "../../../components/listados/Listado";
import Modale from "../../../components/modal/Modal";
import RegistroEstudios from "./RegistroEstudios";

export default function FormatoEstudio() {
  const datos = [
    {
      codigo: "524521",
      model: "Glucosa",
      valor2: "MG/DL",
      valor3: "70 - 100/",
      estudio: "normal",
    },
    {
      formato: "96",
      codigo: "5121",
      model: "Colesterol",
      pagina: "70 - 100/",
      estudio: "normal",
    },
    {
      formato: "927",
      codigo: "456612",
      model: "COLESTEROL H. D. L.",
      nombre: "MIU/DL",
      pagina: "70 - 100/",
      estudio: "normal",
    },
    {
      formato: "928",
      codigo: "54564",
      model: "COLESTEROL L. D. L",
      pagina: "70 - 100/",
      estudio: "normal",
    },
    {
      formato: "929",
      codigo: "65653",
      model: "TRIGLICERIDOS",
      pagina: "no70 - 100/",
      estudio: "normal",
    },
    {
      formato: "977",
      codigo: "20230",
      model: "LIPIDOS TOTALES",
      pagina: "70 - 100/",
      estudio: "normal",
    },
  ];

  const columns = [
    { text: "CÓDIGO LINEA", dataField: "formato" },
    { text: "VALOR 1", dataField: "codigo" },
    { text: "VALOR 2", dataField: "model" },
    { text: "VALOR 3", dataField: "pagina" },
    { text: "TIPO LINEA", dataField: "estudio" },
    {
      dataField: "actions",
      text: "ACCIONES",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          id="dropdownMenuButton"
          type="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Acciones
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            onClick={() => "/lab_clinico/estudios/formato/parametro"}
            className="dropdown-item"
            type="button"
          >
            <span
              className="fas fa-edit"
              style={{ marginRight: "10px" }}
            ></span>
            ACTUALIZAR 
          </button>
          <button className="dropdown-item" onClick={showModal}  type="button">
            <span
             className="fa fa-table"        
            style={{ marginRight: "10px" }}
            ></span>
            VALORES DE REFERENCIA
    </button>
          <button
            onClick={() => ("/lab_clinico/estudios/formato")}
            className="dropdown-item"
            type="button"
          >
            <span
              className="far fa-trash-alt"
              style={{ marginRight: "10px" }}
            ></span>{" "}
            ELIMINAR
          </button> 
        </div>
      </div>
    );
  }
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <Fragment>
      <LayoutForm
        title="Parámetros agregados"
        tools={
          <Link
            className="btn btn-sm btn-light text-primary"
            to={"/lab_clinico/estudios/formato"}
          >
            <i className="fa fa-arrow-left" />
            Volver parametros
          </Link>
        }
      >
        <div className="card mb-4">
          <div className="card-header">Datos de asignacion</div>
          <div className="card-body">
            <div className="row gx-3 mb-3 border">
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Descripcion:(*)
                </label>
                <input
                  type="text"
                  id="formato"
                  className="form-control"
                  placeholder="NOMBRE DEL FORMATO"
                />
              </div>
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Tipo valor: (*):
                </label>
                <Select
                  isClearable
                  placeholder="Seleccione una opcion"
                  id="valor"
                />
              </div>
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Descripcio: (*):
                </label>
                <input
                  placeholder="UNIDADES"
                  id="unidades"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Descripcion 2: (*):
                </label>
                <input
                  placeholder="DESCRIPCION"
                  id="descripcion 2"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Tipo valor 2: (*):
                </label>
                <Select
                  isClearable
                  placeholder="Seleccione una opcion"
                  id="valor2"
                />
              </div>
              <div className="form-group col-sm-3 mt-3 ">
                <label htmlFor="" className="small mb-1">
                  Unidades 2: (*):
                </label>
                <input
                  placeholder="UNIDAD 2"
                  id="unidad2"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="card-header mt-5  border ">Parámetros agregados</div>
          <div className="border">
          <div className="d-grid gap-2 mt-4 d-md-flex justify-content-md-end" style={{ marginRight: "10px" }} >
              <button
                onClick={showModal}
                className={"btn btn-primary "}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#createGroupModal"
              >
                <span
                  className="fa fa-plus"
                  style={{ marginRight: "10px" }}
                ></span>
                Actualizar formato
              </button>
              <Modale
               title={"Registro de estudios de Lab. Clínico"}
                 cerrar={hideModal}
                 abrir={isOpen}
              >
                  <RegistroEstudios/>
              </Modale>
            </div>
            <Listado id={"formato"} data={datos} columns={columns} />

          </div>

        </div>
      </LayoutForm>
    </Fragment>
  );
}
