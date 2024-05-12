import React, {Fragment} from 'react'
import Select from 'react-select'
export default function EstudiosNuevos(props) {
  return (
    <Fragment>
            <div className="row gx-3 mb-3">
                <div className="lg-4 mt-4">
                    <label htmlFor="" className="small mb-1">
                        Servicios: (*)
                    </label>
                    <Select isSearchable closeMenuOnSelect={true} onChange={props.cambiar} placeholder='SELECCIONE UNA OPCION'  id="servicios" />
                </div>
                <div className=" lg-4 mt-4">
                    <label htmlFor="" className="small mb-1">Nombre estudios:(*)</label>
                    <input onChange={props.cambiar} type="text" id='nombre' className='form-control' placeholder='NOMBRE' />
                </div>
                <div className="lg-4 mt-4">
                    <label htmlFor="" className="small mb-1">
                        Division: (*)
                    </label>
                    <Select onChange={props.cambiar} isSearchable closeMenuOnSelect={true} placeholder={"SELECCIONE UNA OPCION"} id="division" />
                </div>
            </div>
    </Fragment>
  )
}
