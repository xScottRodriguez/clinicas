import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const persona = [
  {
    id: 'persona.primerNombre',
    label: 'Primer nombre',
    type: 'text',
    placeholder: 'Primer nombre',
  },
  {
    id: 'persona.segundoNombre',
    label: 'Segundo nombre',
    type: 'text',
    placeholder: 'Segundo nombre',
  },
  {
    id: 'persona.primerApellido',
    label: 'Primer apellido',
    type: 'text',
    placeholder: 'Primer apellido',
  },
  {
    id: 'persona.segundoApellido',
    label: 'Segundo apellido',
    type: 'text',
    placeholder: 'Segundo apellido',
  },
  {
    id: 'persona.genero',
    label: 'genero',
    type: 'select',
    placeholder: 'Seleccione genero',
  },
  {
    id: 'persona.estadoCivil',
    label: 'Estado Civil',
    type: 'select',
    placeholder: 'Seleccione estado civil',
  },
  {
    id: 'persona.direccion',
    label: 'Dirección',
    type: 'text',
    placeholder: 'Dirección',
  },
  {
    id: 'persona.domicilio',
    label: 'Dirección domicilio',
    type: 'text',
    placeholder: 'Dirección de trabajo',
  },
  {
    id: 'persona.domicilioAlternativo',
    label: 'Dirección domicilio Alternativa',
    type: 'text',
    placeholder: 'Dirección de trabajo',
  },
  {
    id: 'persona.documento',
    label: 'Tipo de documento',
    type: 'select',
    placeholder: 'Seleccione tipo de documento',
  },
  {
    id: 'persona.numeroDocumento',
    label: 'Numero de documento',
    type: 'number',
    placeholder: 'numero de documento',
  },
  {
    id: 'persona.pais',
    label: 'Pais',
    type: 'select',
    placeholder: 'Seleccione un pais',
  },
  {
    id: 'persona.departamento',
    label: 'Departamento',
    type: 'select',
    placeholder: 'Seleccione Departamento',
  },
  {
    id: 'persona.ciudad',
    label: 'Ciudad',
    type: 'text',
    placeholder: 'ciudad',
  },
  {
    id: 'persona.email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'correo@gmail.com',
  },
  {
    id: 'persona.fechaNacimiento',
    label: 'Fecha de nacimiento',
    type: 'date',
    placeholder: '',
  },
];
const responsable = [
  {
    id: 'responsable.tipoParentesco',
    label: 'Parentesco',
    type: 'select',
    placeholder: 'Seleccione parentesco',
  },
  {
    id: 'responsable.nombre',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Nombre Completo',
  },
];

const contacto = [
  {
    id: 'contacto.celular',
    label: 'Celular',
    type: 'number',
    placeholder: '0000-0000',
  },
  {
    id: 'contacto.casa',
    label: 'Casa',
    type: 'number',
    placeholder: '0000-0000',
  },
  {
    id: 'contacto.adicional',
    label: 'Adicional',
    type: 'number',
    placeholder: '0000-0000',
  },
];
const informacionDeTrabajo = [
  {
    id: 'informacionDeTrabajo.profesion',
    label: 'Profesion',
    type: 'string',
    placeholder: 'Profesion',
  },
  {
    id: 'informacionDeTrabajo.lugarTrabajo',
    label: 'Lugar de Trabajo',
    type: 'string',
    placeholder: 'Escriba el lugar de trabajo',
  },
  {
    id: 'informacionDeTrabajo.direccion',
    label: 'Direccion',
    type: 'textarea',
    placeholder: 'Escriba la Direccion',
  },
  {
    id: 'informacionDeTrabajo.telefono',
    label: 'Telefono',
    type: 'number',
    placeholder: 'Escriba el telefono',
  },
];
const cliente = [
  {
    id: 'cliente.grupoCliente',
    label: 'Grupo de Cliente',
    type: 'select',
    placeholder: 'Seleccione grupo de cliente',
  },
  {
    id: 'cliente.grupoPersona',
    label: 'Grupo de Persona',
    type: 'select',
    placeholder: 'Seleccione grupo de persona',
  },
  {
    id: 'cliente.tipoCliente',
    label: 'Tipo de Cliente',
    type: 'select',
    placeholder: 'Seleccione tipo de cliente',
  },
  {
    id: 'cliente.sucursal',
    label: 'Sucursal',
    type: 'select',
    placeholder: 'Seleccione Sucursal',
  },
  {
    id: 'cliente.razon',
    label: 'Razon',
    type: 'text',
    placeholder: 'Razon',
  },
  {
    id: 'cliente.nrc',
    label: 'NRC',
    type: 'number',
    placeholder: 'Nrc',
  },
  {
    id: 'cliente.nit',
    label: 'Nit',
    type: 'number',
    placeholder: 'Nit',
  },
  {
    id: 'cliente.giro',
    label: 'Giro',
    type: 'text',
    placeholder: 'Escriba el giro de la empresa',
  },
];

const FORMS = {
  persona,
  responsable,
  contacto,
  informacionDeTrabajo,
  cliente,
};
export const PersonalData = ({ control, errors, form = 'persona', col = 4 }) => {
  return (
    <Row>
      {FORMS[form].map((campo) => (
        <Col md={col}>
          <Form.Group className='mb-3'>
            <Form.Label>{campo.label}</Form.Label>
            {campo.type === 'select' ? (
              <Controller
                name={campo.id}
                control={control}
                render={({ field }) => (
                  <Select placeholder={campo.placeholder} options={[]} {...field} />
                )}
              />
            ) : (
              <Controller
                name={campo.id}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type={campo.type}
                    placeholder={campo.placeholder}
                    {...field}
                  />
                )}
              />
            )}

            {errors[campo.id] && (
              <Form.Text className='text-danger'>
                {errors[campo.id].message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      ))}
    </Row>
  );
};
