import React, {Fragment} from 'react'
import BotonesFooter from '../../../components/botones/BotonesFooter'
export default function NuevosDivisiones(props) {
  return (
    <Fragment>
        <form>
        <div className="row gx-3 mb-3">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="" className="small mb-1">Nombre división: (*)</label>
                <input onChange={props.cambios} type="text"placeholder='NOMBRE' id='nombre' className='form-control'  />
            </div>
        </div>
        <BotonesFooter ruta={"/lab_clinico/divisiones"}/>
        </form>
    </Fragment>
  )
}
