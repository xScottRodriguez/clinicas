import React,{Fragment} from 'react'
import LayoutForm from '../../../containers/layouts/LayoutForm'
import { Link } from 'react-router-dom'
import TablaNormal from '../../../components/listados/TablaNormal'
import FormResultadosPruebas from './FormResultadosPruebas'

export default function FormularioPrincipal() {
    const columns = [
        { text: "CÓDIGO", dataField: "orden", sort: true },
        { text: "NOMBRE DE ESTUDIO Ó PRUEBA", dataField: "nombre", sort: true },
        { text: "FECHA ORDEN", dataField: "fecha", sort: true },
        { text: "ETAPA RESPUESTA", dataField: "edad" },
        ]

    const datos = [
        { orden: "524521", nombre: "HEMOGRAMA", edad:"procesada", fecha:"19/09/2022"  },
      ]

  return (
    <Fragment>
    <LayoutForm
      tools={
        <Link
          className="btn btn-sm btn-light text-primary"
          to={"/lab_clinico/ingreso_resultados"}
        >
          <i className="fa fa-arrow-left" />
          Resultado de Prueba
        </Link>
      }                
    >
      <div className="card mb-4">

        <div className="card-body">
          <form>
            <div className="row gx mb-3">
              <div className="border mt-h-75">
               <TablaNormal id={"orden"} data={datos} columns={columns} />
              </div>
              <div className="card-header mt-5 border">GENERAL DE ORINA:</div>
                  <div className="border mt-h-75 ">
                        <FormResultadosPruebas />
                  </div>
            </div>
            <div className="card-footer text-center">
              <div className="btn-toggle">
                <Link
                  to={"/administracion/empresas"}
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
  )
}
