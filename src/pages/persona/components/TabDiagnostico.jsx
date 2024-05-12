import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagnostico, setPreEscripcion } from '../../../store/slices/uiSlice';

export const TabDiagnostico = () => {
  const { tabPreEscripciones } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const onSetPreescription = () => {
    dispatch(setPreEscripcion());
  };
  const onSetDiagnostic = () => {
    dispatch(setDiagnostico());
  };
  return (
    <>
      <Nav variant='pills' className='mb-3'>
        <Nav.Item>
          <Nav.Link
            active={tabPreEscripciones.preEscripcion}
            onClick={onSetPreescription}
            disabled
          >
            Pre Escripciones
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={tabPreEscripciones.diagnostico}
            onClick={onSetDiagnostic}
            disabled
          >
            Diagnostico
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
