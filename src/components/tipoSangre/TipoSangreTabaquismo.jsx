/** @format */
import PropTypes from 'prop-types';
import { FormTabaquismo } from '../tabaquismo/FormTabaquismo';
import DynamicGrid from '../ui/DinamicGrid';
import { FOLDERS, TIPOS_TABAQUISMO } from '../../constants/dynamicGrids';
import { IndiceTabaquismo } from './IndiceTabaquismo';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const TipoSangreTabaquismo = ({ toggleForm }) => {
  const {
    noPatologicos: { tabaquismo },
  } = useSelector((state) => state.antecedente);
  const [scrollPosition, setScrollPosition] = useState(0);
  return (
    <Container>
      <DynamicGrid
        folder={FOLDERS.SMOOKING}
        items={TIPOS_TABAQUISMO}
        onChange={(item) => {
          toggleForm(item);
        }}
        itemCheked={tabaquismo?.smokItemActive}
        handleSetScrollPosition={setScrollPosition}
      />
      {tabaquismo?.isSmooker && (
        <>
          <FormTabaquismo />
          <IndiceTabaquismo />
        </>
      )}
    </Container>
  );
};
TipoSangreTabaquismo.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
