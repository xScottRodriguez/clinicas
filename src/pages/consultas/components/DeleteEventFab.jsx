import React from 'react';
import { useDispatch } from 'react-redux';
import { CiTrash } from 'react-icons/ci';
import styles from '../styles.module.css';
import { Button } from 'react-bootstrap';
export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    //dispatch(startEventDeleted());
  };

  return (
    <Button
      variant='danger'
      className={styles['fab-danger']}
      onClick={handleDelete}
    >
      <CiTrash />
      <span> Borrar evento </span>
    </Button>
  );
};
