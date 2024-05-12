import React, { Fragment } from "react";
// import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal/Modal";

import TablaLabClinico from "../../../components/listados/TablaLabClinico";
import FormatoCorrelativo from "../estudiosLC/FormatoCorrelativo";
export default function EstudiosLabClínico() {
  // const navigate = useNavigate();

  //definimos columnas para la tablas
  const columnDefs = [
    { text: "N° ORDEN	", dataField: "orden", sort: true },
    { text: "NOMBRE PACIENTE	", dataField: "nombre", sort: true },
    { text: "SEXO", dataField: "sexo", sort: true },
    { text: "EDAD", dataField: "edad" },
    { text: "FECHA ESTUDIO", dataField: "fecha" },
    { text: "MEIDCO RESPONSABLE", dataField: "medico" },
    {
      dataField: "actions",
      text: "ACCIONES",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  const datos = [
    {
      orden: "524521",
      nombre: "JORGE ALBERTO ESCALANTE",
      sexo: "Masculino",
      edad: 55,
      medico: "JOSE RAFAEL MARTINEZ ARGUETA",
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

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
          <button className="dropdown-item" onClick={showModal} type="button">
            <span
              className="fas fa-plus"
              style={{ marginRight: "10px" }}
            ></span>
            AGREGAR CORRELATIVO
          </button>
          <button className="dropdown-item" type="button">
            <span
              className="fas fa-edit"
              style={{ marginRight: "10px" }}
            ></span>
            EDITAR
          </button>
          <button
            // onClick={()=>handleDelete(row.idModulo)}
            className="dropdown-item"
            type="button"
          >
            <span
              className="fa fa-check"
              style={{ marginRight: "10px" }}
            ></span>
            ASIGNAR PRIORIDAD
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="table-responsive">
        <TablaLabClinico id={"orden"} data={datos} columns={columnDefs} />
      </div>

      <Modal
        title={"Registro de estudios de Lab. Clínico"}
        cerrar={hideModal}
        abrir={isOpen}
      >
        <FormatoCorrelativo />
      </Modal>
    </Fragment>
  );
}
