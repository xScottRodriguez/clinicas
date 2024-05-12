import React, {Fragment} from 'react'
import Select from 'react-select'

export default function FormatoCorrelativo() {
  return (
    <Fragment>
        <div className="row gx-3 mb-3">
    <div className=" lg-4 mt-4">
      <label htmlFor="" className="small mb-1">
      Correlativo Primario:
      </label>
      <Select
        type="text"
        id="formato"
        placeholder="SELECCIONE UNA OPCION"
      />
    </div>
    <div className=" lg-4 mt-4">
      <label htmlFor="" className="small mb-1">
      Correlativo Secundario:
      </label>
      <Select
        type="text"
        id="formato"
        placeholder="SELECCIONE UNA OPCION"
      />
    </div>
    <div className=" lg-4 mt5">
      <div className="mb-0 mt-4">
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            id="chequeado"
            type="checkbox"
            // checked={true}
          />
          <label
            className="form-check-label"
            htmlFor="checkAccountChanges"
          >
            Recibo Muestra
          </label>
        </div>
      </div>
    </div>

  </div>
    </Fragment>
  )
}
