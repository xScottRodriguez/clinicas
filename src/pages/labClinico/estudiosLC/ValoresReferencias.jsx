import React from 'react'

export default function ValoresReferencias() {
  return (
    <div className="row gx-3 mb-3">
    <div className=" lg-4 mt-4">
      <label htmlFor="" className="small mb-1">
        Valor bajo en hombres
      </label>
      <input
        type="text"
        id="formato"
        className="form-control"
        placeholder="NOMBRE DEL FORMATO"
      />
    </div>
    <div className=" lg-4 mt5">
      <div className="mb-0 mt-4">
        <div className="form-check mb-2">
          <input
            className="form-control"
            id="chequeado"
            type="text"
            // checked={true}
          />
          <label
            className="form-check-label"
            htmlFor="checkAccountChanges"
          >
            Valor alto en hombres
          </label>
        </div>
      </div>
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
            Colocar título de estudio
          </label>
        </div>
      </div>
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
            Formato por Defecto
          </label>
        </div>
      </div>
    </div>
  </div>
       
  )
}
