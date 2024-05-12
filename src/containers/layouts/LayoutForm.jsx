/** @format */

import React from 'react';
import HeaderPage from '../../components/theme/header/Header';
import { Container } from 'react-bootstrap';

export default function LayoutForm(props) {
  return (
    <div>
      <HeaderPage title={props.title} tools={props.tools} />
      <Container
        fluid
        className='m-2 '
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        }}
      >
        {props.children}
      </Container>
    </div>
  );
}
