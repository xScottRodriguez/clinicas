/** @format */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ToxinasTable } from './ToxinasTable';
import { useDispatch, useSelector } from 'react-redux';
import { setHallucinogens } from '../../store/slices/antecedentes';

export const DrogasAlucinogenas = ({ drugs }) => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (e, drugId) => {
    const isChecked = e.target.checked;
    let updatedItems = [...selectedItems];

    if (isChecked) {
      updatedItems.push({ drugId, isChecked: true });
    } else {
      updatedItems = updatedItems.filter((item) => item.drugId !== drugId);
    }
    setSelectedItems(updatedItems);
  };

  useEffect(() => {
    if (!loaded && noPatologicos?.drugs && noPatologicos.drugs?.hallucinogens) {
      setSelectedItems(noPatologicos.drugs.hallucinogens);
      setLoaded(true);
    }
  }, [loaded, noPatologicos.drugs]);

  useEffect(() => {
    dispatch(setHallucinogens(selectedItems));
  }, [selectedItems, dispatch]);

  return (
    <>
      <h5>Drogas Alucinogenas</h5>
      <p> Drogas Alucinogenas</p>
      <ToxinasTable
        handleOnChange={handleCheckboxChange}
        drugs={drugs}
        setUpdatedArr={selectedItems}
      />
    </>
  );
};
DrogasAlucinogenas.propTypes = {
  drugs: PropTypes.array.isRequired,
};
