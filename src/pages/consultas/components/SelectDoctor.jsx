import React, { useEffect, useState } from 'react';
import { AsyncSelectCustom } from '../../../components/selects/AsyncSelect';
import { Col, Form, Row } from 'react-bootstrap';
import { useMedicosQuery } from '../../../services/rtk-query/clinicalApi';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { clearDoctorFilter, setDoctorFilter } from '../../../store/slices/uiSlice';

export const SelectDoctor = () => {
  const [search, setSearch] = useState('');
  const { data: doctors, isFetching, isSuccess } = useMedicosQuery(search);

  const dispatch = useDispatch();
  const { watch, control, getValues, handleSubmit } = useForm({
    defaultValues: {
      doctor: '',
    },
  });

  useEffect(() => {
    const data = getValues('doctor');
    if (data) dispatch(setDoctorFilter(data.id));

    return () => {
      dispatch(clearDoctorFilter());
    };
  }, [watch('doctor')]);

  const filter = (inputValue) => {
    return doctors
      ?.filter((i) =>
        `${i.nombres} ${i.apellidos}`
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
      .map((item) => ({
        value: item.id,
        label: `${item.nombres} ${item.apellidos}`,
        ...item,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    setSearch(inputValue);
    if (isSuccess) {
      callback(filter(inputValue));
    }
  };
  const handleData = (data) => {
    console.log(data);
  };

  return (
    <Row className='mb-3'>
      <Col
        md={4}
        className='p-3'
        style={{
          borderRadius: '10px',
          backgroundColor: '#ECF0F1',
        }}
      >
        <Form className='' onSubmit={handleSubmit(handleData)}>
          <Form.Group>
            <Form.Label>Seleccione un doctor</Form.Label>
            <Controller
              name='doctor'
              control={control}
              render={({ field }) => (
                <AsyncSelectCustom
                  isclearable={true}
                  {...field}
                  loadOptions={loadOptions}
                  isLoading={isFetching}
                  defaultOptions={filter('')}
                />
              )}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
