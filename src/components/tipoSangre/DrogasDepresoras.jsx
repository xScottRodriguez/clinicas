/** @format */

import React, { useEffect, useState } from "react";
import { ToxinasTable } from "./ToxinasTable";
import { useDispatch, useSelector } from "react-redux";
import { setDepressants } from "../../store/slices/antecedentes";

export const DrogasDepresoras = ({ drugs }) => {
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
    if (!loaded && noPatologicos?.drugs && noPatologicos.drugs?.depressants) {
      setSelectedItems(noPatologicos.drugs.depressants);
      setLoaded(true);
    }
  }, [loaded, noPatologicos.drugs]);

  useEffect(() => {
    dispatch(setDepressants(selectedItems));
  }, [selectedItems, dispatch]);

  return (
    <>
      <h5>Drogas Depresoras</h5>
      <p>¿Ha consumido alguna vez drogas depresoras?</p>
      <ToxinasTable
        handleOnChange={handleCheckboxChange}
        drugs={drugs}
        setUpdatedArr={selectedItems}
      />
    </>
  );
};
