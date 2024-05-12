import React, {Fragment} from 'react'
import BotonesFooter from '../../../components/botones/BotonesFooter'

export default function NuevoMedicoLector(props) {
  return (
    <Fragment>
      <form >
        <div className="row gx-3 mb-3">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <label htmlFor="" className='small mb-1'>Nombres: (*)</label>
            <input onChange={props.cambios} type="text" className='form-control' placeholder='NOMBRE' id='nombre' />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <label htmlFor="" className='small mb-1'>Apellidos: (*)</label>
            <input onChange={props.cambios} type="text" className='form-control' placeholder='APELLIDO' id='apellido' />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <label htmlFor="" className='small mb-1'>Especialidad: (*)</label>
            <input onChange={props.cambios} type="text" className='form-control' placeholder='ESPECIALIDAD' id='especialidad' />
          </div>
        </div>
        <BotonesFooter ruta={"/rx_usg/medicos_lectores"} />
      </form>
    </Fragment>
  )
}
