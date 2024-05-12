/** @format */

import React from 'react';
import { Nav } from 'react-bootstrap';

export default function HeaderPage(props) {
  return (
    <React.Fragment>
      <Nav
        as='ul'
        className='bg-light p-3 d-flex justify-content-between  align-items-center'
      >
        <Nav.Item as='li'>
          <p> {props.title}</p>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link eventKey='link-2'>{props.tools}</Nav.Link>
        </Nav.Item>
      </Nav>
    </React.Fragment>
  );
}
