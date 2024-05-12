import React, { Fragment } from 'react';
import { Col, Form, FormGroup, Row } from 'react-bootstrap';
export default function EmbarazoInfo() {
  return (
    <Fragment>
      <h3 className='mb-3'>Informacion de Embarazo</h3>
      <Row>
        <Col md={4} className='mb-3'>
          <FormGroup>
            <Form.Label>Contraido en semana de embarazo numero?</Form.Label>
            <Form.Control type='numero' placeholder='0' />
          </FormGroup>
        </Col>
        <Col md={4} className='mb-3'>
          <FormGroup
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <Form.Check
              type='switch'
              id='advertenciaEmbarazo'
              label='Advertencia durante el embarazo'
            />
            <Form.Check
              type='switch'
              size={20}
              id='actualmenteEnTratamiento'
              label='Actualmente en tratamiento'
            />
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
}
