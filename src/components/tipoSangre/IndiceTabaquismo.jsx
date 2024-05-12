/** @format */

import React from 'react';
import { Alert, Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const IndiceTabaquismo = () => {
  const {
    noPatologicos: { tabaquismo },
  } = useSelector((state) => state.antecedente);

  return (
    <Row className='mb-3'>
      <Col mb={12} className='mb-2'>
        <h5>Indice de Tabáquismo</h5>
        <span>
          Sirve para calcular el riesgo que tiene un fumador de sufrir{' '}
          <strong>EPOC</strong>
        </span>
      </Col>

      <Col md={12} className='mb-3'>
        <Alert variant='secondary'>
          <Row>
            <Col md={2} className='mb-3 d-flex'>
              <Image
                src='/assets/img/tabaquismo/5.svg'
                fluid
                style={{ maxWidth: '4.5rem', maxHeight: '4.5rem' }}
              />
            </Col>
            <Col md={10} className='my-auto'>
              <Alert.Heading className='d-flex gap-2'>
                <span>Indice:</span>
                {tabaquismo.smokerIndex}
              </Alert.Heading>
            </Col>
          </Row>
        </Alert>
      </Col>
      <Col md={12} className='mb-3'>
        <h5>Clasificación de Fumadores Según la OMS</h5>
        {tabaquismo.dailySigarrillosCount >= 0 &&
        tabaquismo.dailySigarrillosCount <= 5 ? (
          <Alert variant='success'>
            <Alert.Heading>Menos de 5 Cigarrillos Diarios</Alert.Heading>
            <span>Nivel Leve</span>
          </Alert>
        ) : tabaquismo.dailySigarrillosCount >= 6 &&
          tabaquismo.dailySigarrillosCount <= 15 ? (
          <Alert variant='warning'>
            <Alert.Heading>Entre 6 y 15 Cigarrillos Diarios</Alert.Heading>
            <span>Nivel Moderado</span>
          </Alert>
        ) : tabaquismo.dailySigarrillosCount >= 16 ? (
          <Alert variant='danger'>
            <Alert.Heading>Más de 16 Cigarrillos Diarios </Alert.Heading>
            <span>Nivel Severo</span>
          </Alert>
        ) : null}
      </Col>
      <Col md={12} className='mb-3'>
        <h5>Indice de Tabáquismo</h5>
        {tabaquismo.smokerIndex >= 0 && tabaquismo.smokerIndex < 10 ? (
          <Alert variant='info'>
            <Alert.Heading>Indice Menor a 10</Alert.Heading>
            <span> Indice de Tabáquismo Nulo </span>
          </Alert>
        ) : tabaquismo.smokerIndex >= 10 && tabaquismo.smokerIndex <= 20 ? (
          <Alert variant='success'>
            <Alert.Heading>Indice Entre 10 y 20</Alert.Heading>
            <span> Indice de Tabáquismo Moderado </span>
          </Alert>
        ) : tabaquismo.smokerIndex >= 21 && tabaquismo.smokerIndex <= 40 ? (
          <Alert variant='warning'>
            <Alert.Heading>Indice Entre 21 y 40</Alert.Heading>
            <span> Indice de Tabáquismo Intenso </span>
          </Alert>
        ) : tabaquismo.smokerIndex >= 41 ? (
          <Alert variant='danger'>
            <Alert.Heading>Indice Mayor a 10</Alert.Heading>
            <span> Indice de Tabáquismo Alto </span>
          </Alert>
        ) : null}
      </Col>
    </Row>
  );
};
