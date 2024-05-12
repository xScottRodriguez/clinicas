/** @format */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Table } from 'react-bootstrap';

export const ToxinasTable = ({ drugs, handleOnChange, setUpdatedArr }) => {
  const handleChange = (e, drugId) => {
    handleOnChange(e, drugId);
  };
  return (
    <Table hover size='sm' responsive striped>
      <thead>
        <tr>
          <th className='w-10'>Seleccionar</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {drugs?.length
          ? drugs?.map((drug) => (
              <tr key={drug.id}>
                <td className='d-flex justify-content-center py-2'>
                  <Form.Check
                    checked={setUpdatedArr?.some(
                      (item) => item?.drugId === drug?.id
                    )}
                    onChange={(e) => handleChange(e, drug?.id)}
                    type='switch'
                    className='h-75'
                    id='custom-switch'
                  />
                </td>
                <td>{drug.nombre}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
};
ToxinasTable.propTypes = {
  drugs: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  setUpdatedArr: PropTypes.array.isRequired,
};
