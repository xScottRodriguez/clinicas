import React, { Fragment } from "react";
import Listado from "../../../components/listados/Listado";
// import TablaLabClinico from '../../../components/listados/TablaLabClinico';
import { useNavigate } from "react-router-dom";

export default function EstudiosOrden() {
  const navigate = useNavigate();

  const columns = [
    { text: "CÓDIGO", dataField: "orden", sort: true },
    { text: "NOMBRE DE ESTUDIO Ó PRUEBA", dataField: "nombre", sort: true },
    { text: "FECHA ORDEN", dataField: "fecha", sort: true },
    { text: "ETAPA RESPUESTA", dataField: "edad" },
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
      <div>
        <button
          onClick={() => navigate("/lab_clinico/ingreso_resultados/gestion")}
          className="btn btn-info"
          type="button"
        >
          AGREGAR CORRELATIVO
        </button>
      </div>
    );
  }

  const datos = [
    {
      orden: "524521",
      nombre: "HEMOGRAMA",
      edad: "procesada",
      fecha: "19/09/2022",
    },
  ];

  return (
    <Fragment>
      <div className="table-responsive">
        <Listado id={"orden"} data={datos} columns={columns} />
      </div>
    </Fragment>
  );
}
