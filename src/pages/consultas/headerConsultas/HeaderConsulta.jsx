import React, { Fragment, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEnfermedadesCIETab,
  setExploracionFisicaTab,
  setInterrogatorioTab,
  setPrescripcionTab,
} from '../../../store/slices/uiSlice';
import { TbUserQuestion } from 'react-icons/tb';
import { MdTravelExplore } from 'react-icons/md';
import style from './style.module.css';
import { useLocation } from 'react-router-dom';
export default function HeaderConsulta(props) {
  const { tabsExpediente, disableTabsConsulta } = useSelector((state) => state.ui);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname.includes('/consultas') &&
      !location.pathname.split('/')?.pop()?.length
    ) {
      dispatch(setPrescripcionTab());
    }
  }, [dispatch, location]);

  return (
    <Fragment>
      <Nav variant='pills'>
        <Nav.Item
          className={disableTabsConsulta && style.disabled}
          onClick={() => !disableTabsConsulta && dispatch(setInterrogatorioTab())}
        >
          <Nav.Link href='#interrogatorio' active={tabsExpediente.interrogatorio}>
            {' '}
            <TbUserQuestion /> Interrogatorio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          className={disableTabsConsulta && style.disabled}
          onClick={() =>
            !disableTabsConsulta && dispatch(setExploracionFisicaTab())
          }
        >
          <Nav.Link
            href='#exploracionFisica'
            active={tabsExpediente.exploracionFisica}
          >
            <MdTravelExplore /> Exploracion Fisica
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          className={disableTabsConsulta && style.disabled}
          onClick={() => !disableTabsConsulta && dispatch(setEnfermedadesCIETab())}
        >
          <Nav.Link href='#enfermedadesCIE' active={tabsExpediente.enfermedadesCIE}>
            <MdTravelExplore /> Enfermedades CIE
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => dispatch(setPrescripcionTab())}>
          <Nav.Link href='#prescripciones' active={tabsExpediente.prescripciones}>
            <MdTravelExplore /> Prescripciones
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Fragment>
  );
}
