/** @format */

import React from 'react';
import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
export const ListItem = ({ handleChange, nombre, id, puntuaciones }) => {
  return (
    <ListGroup.Item>
      <Row className='align-items-center'>
        <Col xs={12} sm={8} md={9}>
          <div className='d-flex align-items-center'>
            <Image
              className='me-2'
              src={`/assets/img/illustrations/apagar/${id}.svg`}
              width='45px'
              alt='apgar-point'
            />
            {nombre}
          </div>
        </Col>
        <Col xs={12} sm={4} md={3}>
          <Form.Select
            onChange={(e) => {
              handleChange(id, e.target.value);
            }}
            id='apgar-heart-rate'
            className='apgar-select form-select w-100 my-auto'
          >
            {puntuaciones.puntaje?.map((puntaje, index) => (
              <option key={puntaje.id} value={index}>
                {puntaje.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
ListItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
