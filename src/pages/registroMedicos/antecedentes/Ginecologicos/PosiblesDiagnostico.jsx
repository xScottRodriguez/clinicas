import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
export default function PosiblesDiagnostico() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='mb-3'>
      <Button variant='outline-primary' onClick={handleShow}>
        Ver posibles diagnósticos
      </Button>
      <Modal
        animation
        show={show}
        id='vaginitis-type-modal'
        backdrop='static'
        keyboard={false}
        scrollable
        size='xl'
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='vaginitis-type-modal-label'>
            Diagnósticos diferencial entre las vulvovaginitis infecciosas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Candida Albicans</th>
                <th>Vaginosis Bacteriana</th>
                <th>Trichomonas Vaginalis</th>
                <th>Flujo Normal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Sintomas</th>
                <td>
                  Prurito vulvar, secreción escasa o moderada disuria, cistitis,
                  dispareunia
                </td>
                <td>Prurito, disuria, dispareunia, poco frecuente.</td>
                <td>
                  Cistalgias, polaquiuria, irritacion vulvar, prurito, disqpareunia
                </td>
                <td>-</td>
              </tr>
              <tr>
                <th>Caracteristica clinicas del flujo</th>
                <td>Escaso o moderado, blanco, grumoso</td>
                <td>
                  Moderado, blanco-grisaceo, maloliente (&lt;&lt;olor a
                  pescado&gt;&gt;), homogeneo, adherente.
                </td>
                <td>Abundante amarillento-verdoso, homogeneo, espumoso.</td>
                <td>Blancuzco, no adherente, no mancha</td>
              </tr>
              <tr>
                <th>Vulva y Vagina</th>
                <td>Eritema, edema, muguet, a veces pustulas en introito, vulva</td>
                <td>Rara vez eritema, edema</td>
                <td>Eritema, inflamacion, cuello, en frutilla</td>
                <td>Normal</td>
              </tr>
              <tr>
                <th>Circustancia de Aparicion</th>
                <td>
                  Terapia hormonal, embarazo, ingesta de antibioticos, otras ETS,
                  diabetes emllitus
                </td>
                <td>A veces ETS</td>
                <td>ETS, promiscuidad, ausencia de conceptivos de barrera</td>
                <td>Embarazo</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
