/** @format */

import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

export const TipoSangreCompatibilidad = ({
  compatibilityWith,
  bloodCompatibility,
}) => {
  return (
    <article>
      <Row>
        <Col md={6}>
          <p className='fs-1'>
            Compatible con:
            <span id='blood-type-desc' className='small fw-bold text-danger'>
              {' '}
              {compatibilityWith}
            </span>
          </p>
        </Col>
        <Col md={6}>
          <div className='d-flex flex-wrap gap-3 justify-content-start'>
            {bloodCompatibility?.map((blood, index) => (
              <div key={blood + index}>
                <h2 className=''>
                  <Badge bg='primary' className=' '>
                    {blood}
                  </Badge>
                </h2>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </article>
  );
};
