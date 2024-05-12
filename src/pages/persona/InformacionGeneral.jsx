import React from 'react';

import Alergia from './Alergia';
import Alergias from './Alergias';
import EmbarazoInfo from './EmbarazoInfo';
import { Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function FormAlergias({
  toggle,
  control,
  setValue,
  errors,
  getValues,
}) {
  const { tabPreEscripciones } = useSelector((state) => state.ui);

  return (
    <Container
      className={`animate__animated ${
        tabPreEscripciones.diagnostico && 'animate__slideInRight'
      }`}
      style={{
        overflowX: 'clip',
      }}
    >
      <Form>
        <Alergias
          control={control}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />
        <Alergia control={control} setValue={setValue} errors={errors} />
        <EmbarazoInfo control={control} setValue={setValue} errors={errors} />
      </Form>
    </Container>
  );
}
