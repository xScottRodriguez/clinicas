import React, {Fragment} from 'react'
import BootstrapTable from "react-bootstrap-table-next";

export default function TablaNormal(props) {

   const datos = props.data;

    const columnDefs = props.columns;
    const id = props.id
    
  return (
    <Fragment>

        <BootstrapTable
            data={datos}
            keyField={id}
            columns={columnDefs}
        />

    </Fragment>
  )
}
