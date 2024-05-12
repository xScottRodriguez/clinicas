/** @format */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DynamicGrid from '../ui/DinamicGrid';
import { FOLDERS, TIPOS_DROGAS } from '../../constants/dynamicGrids';
import { TipoDrogasTabla } from './TipoDrogasTabla';
import { useSelector } from 'react-redux';
import FormDiagnostico from '../../pages/registroMedicos/incapacidad/FormDiagnostico';
import { ANTECEDENTES_VIEWS, SLICES_NAMES } from '../../constants';

export const TipoDrogas = ({ toggleForm }) => {
  const {
    noPatologicos: { drugs },
  } = useSelector((state) => state.antecedente);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleSetScrollPosition = (position) => {
    setScrollPosition(position);
  };
  return (
    <Container>
      <DynamicGrid
        folder={FOLDERS.DRUGS}
        items={TIPOS_DROGAS}
        onChange={(item) => {
          toggleForm(item);
        }}
        itemCheked={drugs?.drugsItemActive}
        handleSetScrollPosition={handleSetScrollPosition}
      />
      {drugs?.isDrugs && (
        <>
          <TipoDrogasTabla />
          <FormDiagnostico
            title='Toxicomanías'
            sliceName={SLICES_NAMES.ANTECEDENTES}
            propertySliceName={ANTECEDENTES_VIEWS.DRUGS}
          />
        </>
      )}
    </Container>
  );
};
TipoDrogas.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
