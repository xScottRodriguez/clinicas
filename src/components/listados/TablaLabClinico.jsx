import React, {Fragment} from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from '../modal/Modal';
import Listado from './Listado';


export default function TablaLabClinico(props) {
    const datos = props.data;

    const columnDefs = props.columns;
    const id = props.id
    const { SearchBar } = Search;

  
    function no(){
      return(
        <h4 className="text-center" >No hay datos</h4>
      )
    }
    const [isOpen, setIsOpen] = React.useState(false);

    // const showModal = () => {
    //   setIsOpen(true);
    // };
  
    const hideModal = () => {
      setIsOpen(false);
    };


  const columns = [
    { text: "CÓDIGO", dataField: "orden", sort: true },
    { text: "NOMBRE DE ESTUDIO Ó PRUEBA", dataField: "nombre", sort: true },
    { text: "SEXO", dataField: "sexo", sort: true },
    { text: "FECHA ORDEN", dataField: "fecha", sort: true },
    { text: "ETAPA RESPUESTA", dataField: "edad" },
    ]

    const data = [
      { orden: "524521", nombre: "JORGE ALBERTO ESCALANTE", sexo:"Masculino",fecha:"19/09/2022" ,  edad:55, medico:"JOSE RAFAEL MARTINEZ ARGUETA" },
    ]

  return (
    <Fragment>
        <div className="card-body">
        <ToolkitProvider
          keyField={id}
          data={datos}
          columns={columnDefs}
          search
        >
          {(props) => (
            <div>
              <h6>Escriba los datos del registro a buscar:</h6>
              
              <SearchBar {...props.searchProps}  placeholder={"NO. ORDEN"} autoFocus={true}/><button type='button'  className='btn btn-info'><span className="fa fa-search"></span></button> 
              <hr />
              <BootstrapTable
                headerClasses="header-class"
                noDataIndication={ no() }
                key={datos.id}
                pagination={paginationFactory({
                  nextPageText: "Siguiente",
                })}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>
        <Modal
            title={"Registro de estudios de Lab. Clínico"}
            cerrar={hideModal}
            abrir={isOpen}
          >
            <Listado id={"orden"} columns={columns} data={data} />
          </Modal>
        </div>
    </Fragment>
  )
}
