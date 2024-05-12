/** @format */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ToxinasTable } from './ToxinasTable';
import { useDispatch, useSelector } from 'react-redux';
import { setStimulants } from '../../store/slices/antecedentes';

export const DrogasEstimulantes = ({ tipoToxina }) => {
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (e, drugId) => {
    const isChecked = e.target.checked;
    let updatedItems = [...selectedItems];
    if (!isChecked) {
      updatedItems = updatedItems.filter((item) => item.drugId !== drugId);
    } else {
      updatedItems.push({ drugId, isChecked: true });
    }
    setSelectedItems(updatedItems);
  };
  useEffect(() => {
    if (!loaded && noPatologicos?.drugs && noPatologicos?.drugs?.stimulants) {
      setSelectedItems(noPatologicos?.drugs?.stimulants);
      setLoaded(true);
    }
  }, [loaded, noPatologicos?.drugs]);

  useEffect(() => {
    dispatch(setStimulants(selectedItems));
  }, [selectedItems, dispatch]);
  return (
    <>
      <h5>Drogas Estimulantes</h5>
      <p>¿Ha consumido alguna vez drogas estimulantes?</p>
      <ToxinasTable
        handleOnChange={handleCheckboxChange}
        drugs={tipoToxina}
        setUpdatedArr={selectedItems}
      />
    </>
  );
};
DrogasEstimulantes.propTypes = {
  tipoToxina: PropTypes.string.isRequired,
};
