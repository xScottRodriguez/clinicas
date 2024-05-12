import * as yup from 'yup';
import { NIT_REGEX } from '../constants';

const loginSchema = yup.object().shape({
  user: yup.string().min(3).required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const agendaSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  start: yup.date().required('La fecha de inicio es requerida'),
  end: yup.date().required('La fecha de fin es requerida'),
  medico: yup.object().required('El médico es requerido').nullable(),
  paciente: yup.object().required('El paciente es requerido').nullable(),
  estado: yup.object().required('El estado es requerido').nullable(),
  telefono: yup.string().required('El teléfono es requerido'),
});

const profileSchema = yup.object().shape({
  persona: yup.object().shape({
    image: yup.string().required('La imagen es requerida'),
    primerNombre: yup.string().required('El primer nombre es requerido'),
    segundoNombre: yup.string().nullable(),
    primerApellido: yup.string().required('El primer apellido es requerido'),
    segundoApellido: yup.string().nullable(),
    genero: yup.string().required('El género es requerido'),
    estadoCivil: yup.string().required('El estado civil es requerido'),
    direccion: yup.string().required('La dirección es requerida'),
    domicilio: yup.string().required('El domicilio es requerido'),
    domicilioAlternativo: yup.string().nullable(),
    documento: yup.string().required('El documento es requerido'),
    numeroDocumento: yup.string().required('El número de documento es requerido'),
    pais: yup.string().required('El país es requerido'),
    departamento: yup.string().required('El departamento es requerido'),
    ciudad: yup.string().required('La ciudad es requerida'),
    email: yup
      .string()
      .email('El email debe ser válido')
      .required('El email es requerido'),
    fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida'),
  }),
  responsable: yup.object().shape({
    tipoParentesco: yup.string().required('El parentesco es requerido'),
    nombre: yup.string().required('El nombre es requerido'),
  }),
  contacto: yup.object().shape({
    celular: yup.string().required('El celular es requerido'),
    casa: yup.string().nullable(),
    adicional: yup.string().nullable(),
  }),
  informacionDeTrabajo: yup.object().shape({
    profesion: yup.string().required('La profesión es requerida'),
    lugarTrabajo: yup.string().required('El lugar de trabajo es requerido'),
    direccion: yup.string().required('La dirección es requerida'),
    telefono: yup.string().required('El teléfono es requerido'),
  }),
  cliente: yup.object().shape({
    grupoCliente: yup.string().nullable(),
    grupoPersona: yup.string().nullable(),
    tipoCliente: yup.string().nullable(),
    sucursal: yup.string().nullable(),
    razon: yup.string().nullable(),
    nrc: yup.string().nullable(),
    nit: yup.string().nullable(),
    giro: yup.string().nullable(),
  }),
});

const empresaSchema = yup.object().shape({
  empresa: yup.string().required('El nombre de la empresa es requerido'),
  sucursal: yup.string().required('La sucursal es requerida'),
  pais: yup.string().required('El país es requerido'),
  departamento: yup.string().optional(),
  municipio: yup.string().optional(),
  nrc: yup.string().required('El NRC es requerido'),
  nit: yup
    .string()
    .matches(NIT_REGEX, {
      message: 'El NIT debe tener el formato 0000-000000-000-0',
    })
    .required('El NIT es requerido'),
  razonSocial: yup.string().required('La razón social es requerida'),
  actividadEconomica: yup.string().required('La actividad económica es requerida'),
  agentePercepcion: yup.bool().required('El agente de percepción es requerido'),
});
export { loginSchema, agendaSchema, profileSchema, empresaSchema };
