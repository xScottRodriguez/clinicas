import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
import styles from '../styles.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/slices/uiSlice';
export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };
  return (
    <Button variant='primary' onClick={handleClick} className={styles.fab}>
      <FaPlus size={30} />
    </Button>
  );
};
