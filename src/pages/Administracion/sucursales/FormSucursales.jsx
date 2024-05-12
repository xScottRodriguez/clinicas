import React, { Fragment, useState, useEffect } from "react";
import LayoutForm from "../../../containers/layouts/LayoutForm";
import { Link } from "react-router-dom";
import peticionesAxios from '../../../services/peticionesAxios';
import Cabeceras from '../../../services/AxiosCabeceras';
import Alertas from '../../../services/Alertas';
import { useNavigate, useParams } from "react-router-dom";
import BotonesFooter from "../../../components/botones/BotonesFooter";

export default function FormAdministracion() {

  const navigate = useNavigate();
  const params = useParams();

  //estado para los inputs del form
  const [input, setInput] = useState({});
  //estado para Surtudira del form
  const [surtidora, setSurtidora] = useState({"surtidora": 0});
  //estado para compras del form
  const [compras, setCompras] = useState({"compras": 0});
  //estado para saber si estamos editando o registrando
  const[edit, setEdit] = useState(false);
  //error

  useEffect( ()=>{
    if(params.id){
      sucursal(params.id);
    }
  },[params.id]);

  //onchanges para los inputs
  const handleChangesInput =(e)=>{
    setInput({
      ...input,
      [e.target.id]:e.target.value
    })
  } 

  //onChanges para surtidora
  const handleChangesSurtidora=()=>{
    setSurtidora({...surtidora ,"surtidora":1})
  }

  //onChanges para compras
  const handleChangesCompras=()=>{
    setCompras({...compras,"compras":1})
  }

  //metodo para enviar los datos a la db
  const handleSubmit =(e)=>{
    e.preventDefault();

    try {
      if(edit){
       PUTSucursales();
      }else{
        POSTSucursales()
      }
    } catch (error) {
      console.log(error)
    }

  }

  //Peticion POST a sucursales
  const POSTSucursales=async()=>{
    try {
      //validamos que los formularios no vayan vacios
      // if(!input.codigo|| ! input.nombre || !input.direccion || !input.telefono || input.email){
 

      //  return
      // }


      const newSucursal = {
      codigo: input.codigo,
      nombre: input.nombre,
      surtidora:  surtidora.surtidora,
      permite_compra: compras.compras,
      direccion: input.direccion,
      telefono: input.telefono,
      email: input.email
      }
      const sucursal = await peticionesAxios.POST('/empresas/sucursales', newSucursal, {headers: Cabeceras.getHeader()});
      if(sucursal.status === 201){
        Alertas.alertSuccessSave("Sucursal", "sucursal registrada");
        navigate('/empresas/sucursales')
      }else{
        Alertas.alertErrorSave("Hubo un problema")
      }
    } catch (error) {
      console.log(error)
    }
  }

  //editamos los datos del formulario
  const PUTSucursales =async()=>{
    try {
      const editSucursales={
    id_sucursal: params.id,
    codigo: input.codigo,
    nombre: input.nombre,
    surtidora: input.surtidora,
    permite_compra: input.compras,
    direccion: input.direccion,
    telefono: input.telefono,
    email: input.email
  }
  const updateSucursal = await peticionesAxios.update("empresas/sucursales", editSucursales, {headers: Cabeceras.getHeader()});
   if(updateSucursal.status === 200){
    Alertas.alertSuccessUpdate("Sucursal modificada");
    navigate('/empresas/sucursales')
   }else{
     Alertas.alertErrorSave("hubo un error");
   }
} catch (error) {
      console.log(error)
    }
  }

  //hademos peticon a get id sucursal
  const sucursal=async(id)=>{
    try {
      const getId = await peticionesAxios.find(`/empresas/sucursales/${id}`)
      setInput(getId.data[0])
      setEdit(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link
            className="btn btn-sm btn-light text-primary"
            to={"/empresas/sucursales"}
          >
            <i className="fa fa-arrow-left" />
            Regresar a la lista de sucursales
          </Link>
        }
        title={edit ? "Modificacion de sucursal": "Administracion de sucursales"}
      >
      <div className="card mb-4">
          <div className="card-header">Registro de Sucursal</div>
          <div className="card-body">
              <form onSubmit={handleSubmit} >
                  <div className="row gx mb-3">
                      <div className="col-md-4">
                      <label htmlFor="" className="small mb-1">Codigo:</label>
                      <input 
                        type="text  " 
                        className={`form-control `}
                        placeholder="Ingrese un codigo"
                        id="codigo"
                        onChange={handleChangesInput}
                        value={input.codigo||""}
                      />
                      </div>
                      <div className="col-md-4">
                      <label htmlFor="" className="small mb-1">Nombre:</label>

                        <input 
                        type="text"
                        placeholder="Ingrese un nombre"
                        id="nombre" 
                        className={`form-control `}
                        onChange={handleChangesInput}
                        value={input.nombre|| ""}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="col-lg-7 text-center mt-2">
                            <label htmlFor="" className="small mb-1">Surtidora:</label>
                            <div className="boder d-flex justify-content-center align items-center">
                                <div className="form-check form-switch">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input"
                                        id="surtidora"
                                        role="switch"
                                        onChange={handleChangesSurtidora}
                                        value={input.surtidora||""}
                                    />
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                          
                          <div className="col-lg-4 mt-4">
                              <label htmlFor="" className="small mb-1">Direccion:</label>
                              <input 
                                type="text" 
                                className={`form-control `}
                                id="direccion"
                                placeholder="Ingrese una direccion"
                                onChange={handleChangesInput}
                                value={input.direccion||""}
                              />
                          </div>
                          <div className="col-lg-4 mt-4">
                              <label htmlFor="" className="small mb-1">Telefono:</label>
                              <input 
                                type="number" 
                                className={`form-control `}
                                id="telefono"
                                placeholder="Ingrese un numero telefonico valido"
                                onChange={handleChangesInput}
                                value={input.telefono||""}
                              />
                          </div>
                          <div className="col-lg-4 mt-4">
                          <div className="col-lg-8 text-center mt-2">
                            <label htmlFor="" className="small mb-1">Compras:</label>
                            <div className="boder d-flex justify-content-center align items-center">
                                <div className="form-check form-switch">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input"
                                        id="surtidora"
                                        role="switch"
                                        onChange={handleChangesCompras}
                                    />
                                </div>
                            </div>
                        </div>
                          </div>
                          <div className="col-lg-4 mt-4">
                              <label htmlFor="" className="small mb-1">E-mail:</label>
                              <input 
                                type="text" 
                                className={`form-control `}
                                id="email"
                                placeholder="Ingrese un numero telefonico valido"
                                onChange={handleChangesInput}
                                value={input.email||""}
                              />
                          </div>
                      </div>
                  </div>
                  <BotonesFooter ruta={"/empresas/sucuesales"}/>
              </form>
          </div>
      </div>

      </LayoutForm>
    </Fragment>
  );
}
