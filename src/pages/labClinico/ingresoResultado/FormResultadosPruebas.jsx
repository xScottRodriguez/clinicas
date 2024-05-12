import React, { Fragment } from "react";
export default function FormResultadosPruebas() {
  return (
    <Fragment>
      <form>
        <div className="row gx mb-3">
          <div className="col-lg-5 md-4">
            <label htmlFor="" className="small mb-1">
              Color:
            </label>
            <input
              type="text  "
              className={`form-control `}
              placeholder="INGRESE RESULTADO"
              id="codigo"
            />
          </div>
          <div className="col-lg-5 md-4">
            <label htmlFor="" className="small mb-1">
              ASPECTO:
            </label>

            <input
              type="text"
              placeholder="INGRESE RESULTADO"
              id="nombre"
              className={`form-control `}
              // onChange={handleChangesInput}
              // value={input.nombre|| ""}
            />
          </div>
    
          <div className="row gx-3 mb-3">
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                DENSIDAD:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="direccion"
                placeholder="INGRESE RESULTADO"
                // onChange={handleChangesInput}
                // value={input.direccion||""}
              />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                PH:
              </label>
              <input
                type="number"
                className={`form-control `}
                id="telefono"
                placeholder="INGRESE RESULTADO"
                // onChange={handleChangesInput}
                // value={input.telefono||""}
              />
            </div>
        
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                PROTEINAS:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>

            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                GLUCOSA:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                SANGRE OCULTA:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                CUERPOS CETONICOS:
              </label>
              <input
                type="text"           

                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                UROBILINOGENO:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                BILIRRUBINA:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
              />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                NITRITOS:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>
            <div className="col-lg-5 mt-4">
              <label htmlFor="" className="small mb-1">
                HEMOGLOBINA:
              </label>
              <input
                type="text"
                className={`form-control `}
                id="email"
                placeholder="INGRESE RESULTADO"
                />
            </div>

          </div>
        </div>
      </form>
    </Fragment>
  );
}
