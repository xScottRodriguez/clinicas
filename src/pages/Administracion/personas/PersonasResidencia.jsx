import React, { Fragment } from "react";
import Select from "react-select";
export const PersonasResidencia = ({
  datosMunicipio,
  onChangesDepartamento,
  datosPais,
  onChangesPais,
  datosDepartamento,
  onChangesMunicipio,
  datosCanton,
  onChangesCanton,
  personaState,
}) => {
  return (
    <Fragment>
      <div className="row gx-3 mb-3">
        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Pais: (*)
          </label>
          <Select
            isClearable
            onChange={onChangesPais}
            closeMenuOnSelect={true}
            placeholder="Pais"
            id="paisResidencia"
            options={datosPais}
            defaultValue={{ label: "EL SALVAODR", value: 61 }}
            value={personaState?.paisResidencia}
          />
        </div>
        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Departamento: (*)
          </label>
          <Select
            isClearable
            closeMenuOnSelect={true}
            capturar
            placeholder="Departamento"
            id="departamentoResidencia"
            options={datosDepartamento}
            onChange={onChangesDepartamento}
            defaultValue={{ label: "SAN MIGUEL", value: 12 }}
            value={personaState?.departamentoResidencia}
          />
        </div>
        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Municipio:(*)
          </label>
          <Select
            isClearable
            onChange={onChangesMunicipio}
            closeMenuOnSelect={true}
            placeholder="Municipios"
            id="ciudadResidencia"
            options={datosMunicipio}
            defaultValue={{ label: "SAN MIGUEL", value: 199 }}
            value={personaState?.ciudadResidencia}
          />
        </div>
        <div className="col-lg-4 mt-4">
          <label htmlFor="" className="small mb-1">
            Canton:
          </label>
          <Select
            isClearable
            onChange={onChangesCanton}
            closeMenuOnSelect={true}
            placeholder="Canton"
            id="cantonResidencia"
            options={datosCanton}
            value={personaState?.cantonResidencia}
          />
        </div>
      </div>
    </Fragment>
  );
};
