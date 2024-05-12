import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { profileSchema } from '../../../../utils';
import LayoutForm from '../../../../containers/layouts/LayoutForm';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { PersonalData } from './PersonalData';
import { ImageComponents } from './ImageComponents';

export const PersonalDataFormNew = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  return (
    <LayoutForm
      tools={
        <Link to={'/persona'} className='btn btn-sm btn-light text-primary'>
          <i className='fa fa-arrow-left' />
          Regresar a la lista de personas
        </Link>
      }
      title={'Registro de personas'}
    >
      <Card
        className='shadow-none '
        style={{
          minHeight: 150,
        }}
      >
        <Card.Body>
          <Form>
            <article>
              <h3>Perfil</h3>
              <hr />
              <div className='text-center'>
                <ImageComponents />
                <Form.Group
                  controlId='formFile'
                  className='mb-3 text-center btn btn-primary'
                >
                  <Form.Label>Subir Imagen</Form.Label>
                  <Controller
                    name='persona.imagen'
                    control={control}
                    render={({ field }) => (
                      <Form.Control type='file' accept='.jpg, .png' {...field} />
                    )}
                  />
                </Form.Group>
              </div>
            </article>
            <article>
              <h4>Datos Personales</h4>
              <hr />
              <PersonalData
                col={4}
                control={control}
                errors={errors}
                form='persona'
              />
            </article>
            <article>
              <h4>Responsable</h4>
              <hr />
              <PersonalData
                col={6}
                control={control}
                errors={errors}
                form='responsable'
              />
            </article>
            <article>
              <h4>Responsable</h4>
              <hr />
              <PersonalData
                col={4}
                control={control}
                errors={errors}
                form='contacto'
              />
            </article>
            <article>
              <h4>Informacion de trabajo</h4>
              <hr />
              <PersonalData
                col={4}
                control={control}
                errors={errors}
                form='informacionDeTrabajo'
              />
            </article>
            <article>
              <h4>Cliente</h4>
              <hr />
              <PersonalData
                col={4}
                control={control}
                errors={errors}
                form='cliente'
              />
            </article>
            <div className='d-grid gap-2'>
              <Button
                variant='primary'
                size='lg'
                onClick={handleSubmit((data) => {
                  console.log(data);
                })}
              >
                Guardar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </LayoutForm>
  );
};
