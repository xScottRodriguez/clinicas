import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom';
import LayoutForm from "../../../containers/layouts/LayoutForm";
import NuevosDivisiones from './NuevosDivisiones';

export default function FormDivisiones() {
    const [datos, setDatos] = useState({});
    
    const handleChanges = (e)=>{
        setDatos({
            ...datos,
            [e.target.id]:e.target.value
        
        })
    }
  return (
    <Fragment>
        <LayoutForm tools={<Link to={"/lab_clinico/divisiones"} className="btn btn-sm btn-light text-primary" > <i className="fa fa-arrow-left" />Regresa listado de divisiones</Link>}>
            <div className="card mb-4">
                <div className="card-header">Registro de divisiones Lab. Clínico</div>
                <div className="card-body">
                    <NuevosDivisiones cambios={handleChanges} />
                </div>
            </div>

        </LayoutForm>
    </Fragment>
  )
}
