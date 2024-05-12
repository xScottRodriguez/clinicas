import React, { Fragment } from 'react';
import { Col, Form, Row, FormGroup } from 'react-bootstrap';
export default function Alergia() {
  return (
    <Fragment>
      <h3>Alergias:</h3>
      <Row>
        <Col md={4} className='mb-3'>
          <FormGroup>
            <Form.Label>Enfermedad:</Form.Label>
            <Form.Control type='text' />
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
}
