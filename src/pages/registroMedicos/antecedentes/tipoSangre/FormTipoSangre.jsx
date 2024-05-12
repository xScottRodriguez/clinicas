import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function FormTipoSangre({ tipoSangre, seleccionar }) {
  const {
    noPatologicos: { activeBlood },
  } = useSelector((state) => state.antecedente);
  return (
    <Row>
      <Col md={6}>
        <article>
          {Object.keys(tipoSangre)?.map((item) => (
            <Button
              variant='outline-danger'
              key={item}
              className={`col-sm-3 col-lg-2 col-md-2  m-2 ${
                activeBlood === item && 'active'
              }`}
              size='lg'
              style={{
                ':hover': {
                  backgroundColor: '#dc3545',
                  color: '#dc3545',
                },
              }}
              onClick={(e) => seleccionar(e)}
            >
              {item}
            </Button>
          ))}
          <Button
            variant='outline-danger'
            className='col-sm-10 m-2'
            onClick={(e) => seleccionar(e)}
          >
            Ninguno
          </Button>
        </article>
      </Col>
      <Col md={6}>
        <div id='content'>
          <div id='blood_content'>
            <div className='main_bag'>
              <div className='blood'></div>
            </div>
          </div>
          <div id='center_via_c'>
            <div className='center_via'>
              <div className='blood_via'></div>
            </div>
          </div>
          <div id='humans'>
            {Object.keys(tipoSangre)?.map((item, index) => (
              <div
                className={`human ${index % 2 === 0 ? 'left' : 'right'} `}
                key={item}
              >
                <div className='scribble'>
                  <span className='blood_type'>{item}</span>
                  <div className='head'></div>
                  <div className='body'></div>
                </div>
                <div className='via'></div>
                <div className='blood_via'></div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}
