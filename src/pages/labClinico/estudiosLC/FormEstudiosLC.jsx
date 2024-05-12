import React, { Fragment } from "react";
import LayoutForm from "../../../containers/layouts/LayoutForm";
import { Link, useNavigate } from "react-router-dom";
import Listado from "../../../components/listados/Listado";
import Modal from "../../../components/modal/Modal";
import RegistroEstudios from "./RegistroEstudios";

export default function FormEstudiosLC() {
  const navigate = useNavigate();
  const datos = [
    {
      formato: "1",
      codigo: "524521",
      model: "Glucosa",
      nombre: "glucosa",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "96",
      codigo: "5121",
      model: "Colesterol",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "927",
      codigo: "456612",
      model: "COLESTEROL H. D. L.",
      nombre: "MIU/DL",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "928",
      codigo: "54564",
      model: "COLESTEROL L. D. L",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "929",
      codigo: "65653",
      model: "TRIGLICERIDOS",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "977",
      codigo: "20230",
      model: "LIPIDOS TOTALES",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "971",
      codigo: "1312",
      model: "ACIDO URICO",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "9728",
      codigo: "2155",
      model: "CREATININA",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "9771",
      codigo: "1312",
      model: "ACIDO URICO",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "9783",
      codigo: "2155",
      model: "CREATININA",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "9721",
      codigo: "1312",
      model: "ACIDO URICO",
      pagina: "no",
      estudio: "no",
    },
    {
      formato: "97218",
      codigo: "2155",
      model: "CREATININA",
      pagina: "no",
      estudio: "no",
    },
  ];
  const columns = [
    { text: "CÓDIGO FORMATO", dataField: "formato" },
    { text: "CÓDIGO ESTUDIO", dataField: "codigo" },
    { text: "FORMATO NOMBRE", dataField: "nombre" },
    { text: "PÁGINA EXCLUSIVA	", dataField: "pagina" },
    { text: "MOSTRAR TÍTULO ESTUDIO", dataField: "estudio" },
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
            onClick={() => navigate("/lab_clinico/estudios/formato/parametro")}
            className="dropdown-item"
            type="button"
          >
            <span
              className="fas fa-edit"
              style={{ marginRight: "10px" }}
            ></span>
            ACTUALIZAR Y AGREGAR PARAMETROS
          </button>
          <button className="dropdown-item" type="button">
            <span
              className="fas fa-edit"
              style={{ marginRight: "10px" }}
            ></span>
            ACTUALIZAR
          </button>
          <button
            onClick={() => navigate("/lab_clinico/estudios/formato")}
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
        tools={
          <Link
            className="btn btn-sm btn-light text-primary"
            to={"/lab_clinico/estudios"}
          >
            <i className="fa fa-arrow-left" />
            Volver a Laboratorio. L.C
          </Link>
        }
        title="Administracion de formato de estudio"
      >
        <div className="card mb-4">
          <div className="card-header">
            Agregar formatos para respuestas de estudio
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                onClick={showModal}
                className={"btn btn-primary"}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#createGroupModal"
              >
                <span
                  className="fa fa-plus"
                  style={{ marginRight: "10px" }}
                ></span>
                Agregar nuevo formato
              </button>
            </div>
          </div>
          <Modal
            title={"Registro de estudios de Lab. Clínico"}
            cerrar={hideModal}
            abrir={isOpen}
          >
            <RegistroEstudios />
          </Modal>

          <div className="card-body">
            <Listado id={"formato"} data={datos} columns={columns} />
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
