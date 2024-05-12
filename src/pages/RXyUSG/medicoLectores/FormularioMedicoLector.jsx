import React, { Fragment, useState} from 'react'
import LayoutForm from "../../../containers/layouts/LayoutForm";
import { Link } from 'react-router-dom';
import NuevoMedicoLector from './NuevoMedicoLector';

export default function FormularioMedicoLector() {

  //estado para controlar los inputs principales
  const [datos, setDatos] = useState({});

  //funcion para leer los datos del input y alamcenar en el state
  const handleChanges = (e)=>{
    setDatos({
      ...datos,
      [e.target.id]: e.target.value
    })
  }

  return (
    <Fragment>
      <LayoutForm tools={<Link to={"/rx_usg/medicos_lectores/"} className="btn btn-sm btn-light text-primary" > <i className="fa fa-arrow-left" />Regresa listado de medico lectores</Link> }>
        <div className="card mb-4">
          <div className="card-header">Registro de medicos lectores RX y USG</div>
          <div className="card-body">
            <NuevoMedicoLector cambios={handleChanges}/>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  )
}
