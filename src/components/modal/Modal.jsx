import React, { Fragment } from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Modale({ children, abrir, cerrar, title, agregar }) {
  return (
    <Fragment>
      <Modal
        sze="ilg" aria-labelledby="example-modal-sizes-title-lg" show={abrir} onHide={cerrar}>
        <form onSubmit={agregar} >
          <Modal.Header closeButton >
            <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  )
}
