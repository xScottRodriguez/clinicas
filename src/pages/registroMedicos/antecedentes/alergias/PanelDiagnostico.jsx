/** @format */

import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import {
  LiaAllergiesSolid,
  LiaBabyCarriageSolid,
  LiaTransgenderSolid,
} from 'react-icons/lia';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { PiDnaThin, PiTestTube, PiVirusLight } from 'react-icons/pi';
export default function PanelDiagnostico({
  perenitales,
  here,
  patologico,
  ob,
  noPatologico,
  alergia,
  gine,
  children,
}) {
  return (
    <Row className=''>
      <Col md={2} className='px-3'>
        <Nav variant='pills' className='flex-column'>
          <Nav.Link
            className='my-1'
            eventKey={() => alergia()}
            onClick={() => alergia()}
          >
            <LiaAllergiesSolid size={24} /> Alergias
          </Nav.Link>
          <Nav.Link className='my-1' onClick={() => here()} eventKey={() => here()}>
            <PiDnaThin size={24} />
            Hereditarios
          </Nav.Link>
          <Nav.Link
            className='my-1'
            onClick={() => patologico()}
            eventKey={() => patologico()}
          >
            {' '}
            <PiVirusLight size={24} /> Patológicos
          </Nav.Link>
          <Nav.Link
            className='my-1'
            onClick={() => noPatologico()}
            eventKey={() => noPatologico()}
          >
            {' '}
            <PiTestTube size={24} /> No Patológicos
          </Nav.Link>
          <Nav.Link
            className='my-1'
            onClick={() => perenitales()}
            eventKey={() => perenitales()}
          >
            {' '}
            <LiaBabyCarriageSolid size={24} /> Perinatales
          </Nav.Link>
          <Nav.Link className='my-1' onClick={() => gine()} eventKey={() => gine()}>
            {' '}
            <LiaTransgenderSolid size={24} /> Ginecológicos
          </Nav.Link>
          <Nav.Link className='my-1' onClick={() => ob()} eventKey={() => ob()}>
            {' '}
            <MdOutlineHealthAndSafety size={24} /> Obstétricos
          </Nav.Link>
        </Nav>
      </Col>
      <Col style={{ height: '70vh' }} className='overflow-auto mx-4 '>
        {children}
      </Col>
    </Row>
  );
}
