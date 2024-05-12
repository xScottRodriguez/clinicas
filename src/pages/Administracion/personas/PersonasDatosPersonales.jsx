import React, { Fragment } from 'react';
import Select from 'react-select';

export const PersonasDatosPersonales = ({
  edad,
  error,
  genero,
  dui,
  onChangesPersonas,
  estado,
  register,
  personasSet,
  personaState,
  datosMunicipio,
  onChangesDepartamento,
  datosPais,
  onChangesNacePais,
  datosDepartamento,
  onChangesMunicipio,
  datosCanton,
  onChangesCanton,
  onKeyUpDui,
  errorDui,
}) => {
  const handlechangesGenero = (value) => {
    personasSet({ ...personaState, sexo: value });
  };

  const handleChangesEstadoCivil = (value) => {
    personasSet({ ...personaState, estadoCivil: value });
  };

  const handleDocumentoIdentidad = (value) => {
    personasSet({ ...personaState, documentoIdentidad: value.value });
  };

  return (
    <Fragment>
      <div className='row gx-3 mb-3'>
        <div className='form-group col-sm-4 mt-3 '>
          <label htmlFor='' className='small mb-1'>
            Nombres: (*):
          </label>
          <input
            type='text  '
            className='form-control'
            placeholder='Primer nombre'
            id='primerNombre'
            {...register('primerNombre', {
              required: true,
            })}
            onChange={onChangesPersonas}
            defaultValue={personaState.primerNombre}
          />
          {error.primerNombre?.type === 'required' && (
            <b style={{ color: '#D14A3F' }} className='mt-2'>
              El campo es requerido
            </b>
          )}
        </div>
        <div className='form-group col-sm-4 mt-3 '>
          <label htmlFor='' className='small mb-1'>
            Apellidos: (*):
          </label>
          <input
            type='text  '
            className='form-control'
            placeholder='Primer apellido'
            id='primerApellido'
            {...register('primerApellido', {
              required: true,
            })}
            defaultValue={personaState.primerApellido}
            onChange={onChangesPersonas}
          />
          {error.primerApellido?.type === 'required' && (
            <b style={{ color: '#D14A3F' }} className='mt-2'>
              El campo es requerido
            </b>
          )}
        </div>


        <div className='form-group col-sm-4 mt-3'>
          <label htmlFor='' className='small mb-1'>
            Sexo: (*)
          </label>
          <Select
            isClearable
            placeholder='Genero'
            id='sexo'
            options={genero}
            onChange={handlechangesGenero}
            value={personaState?.sexo}
          />
        </div>
      </div>

      <div className='row gx-3 mb-3'>
        <div className='form-group col-sm-4'>
          <label htmlFor='' className='small mb-1'>
            Estado civil: (*)
          </label>
          <Select
            isClearable
            closeMenuOnSelect={true}
            placeholder='Estado civil'
            id='EstadoCivil'
            onChange={handleChangesEstadoCivil}
            options={estado}
            value={personaState?.estadoCivil}
          />
        </div>
        <div className='form-group col-sm-4  '>
          <label htmlFor='' className='small mb-1'>
            Direccion: (*):
          </label>
          <input
            type='text  '
            className='form-control'
            placeholder='Direccion'
            id='direccion'
            {...register('direccion', {
              required: false,
            })}
            onChange={onChangesPersonas}
          />
        </div>

        <div className='form-group col-sm-4  '>
          <label htmlFor='' className='small mb-1'>
            Tipo documento: (*)
          </label>
          <Select
            id='idTipoDocumentoIdentidad'
            isClearable
            closeMenuOnSelect={true}
            options={dui}
            placeholder='Tipo documento'
            defaultValue={{ label: 'DUI', value: 1 }}
            onChange={handleDocumentoIdentidad}
            value={personaState?.tipoDocumentoIdentidad}
          />
        </div>
      </div>

      <div className='row gx-3 mb-3'>

        <div className='form-group col-sm-4  '>
          <label htmlFor='' className='small mb-1'>
            Numero de documento: (*)
            {errorDui}
          </label>
          <input
            type='text  '
            className='form-control'
            placeholder='Numero de documento'
            id='dui'
            {...register('dui', {
              required: true,
            })}
            onChange={onChangesPersonas}
            onKeyUp={onKeyUpDui}
          />
          {error.dui?.type === 'required' && (
            <b style={{ color: '#D14A3F' }} className='mt-2'>
              <span> El campo es requerido </span>
            </b>
          )}
          {errorDui ? (
            <b style={{ color: '#D14A3F' }}>DUI INGRESADO NO VÁLIDO</b>
          ) : null}
        </div>

         <div className='col-lg-4 '>
          <label htmlFor='' className='small mb-1'>
            Pais: (*)
          </label>
          <Select
            isClearable
            onChange={onChangesNacePais}
            closeMenuOnSelect={true}
            placeholder='Pais'
            id='paisNacimiento'
            options={datosPais}
            defaultValue={{ label: 'EL SALVAODR', value: 61 }}
            value={personaState?.paisNacimiento}
          />
        </div>
        <div className='col-lg-4 '>
          <label htmlFor='' className='small mb-1'>
            Departamento: (*)
          </label>
          <Select
            isClearable
            closeMenuOnSelect={true}
            capturar
            placeholder='Departamento'
            id='departamentoNacimiento'
            options={datosDepartamento}
            onChange={onChangesDepartamento}
            defaultValue={{ label: 'SAN MIGUEL', value: 12 }}
            value={personaState?.departamentoNacimiento}
          />
        </div>
      </div>

      <div className='row gx-3 mb-3'>


        <div className='col-lg-4 mt-3'>
          <label htmlFor='' className='small mb-1'>
            Municipio:(*)
          </label>
          <Select
            isClearable
            onChange={onChangesMunicipio}
            closeMenuOnSelect={true}
            placeholder='Municipios'
            id='ciudadNacimiento'
            options={datosMunicipio}
            defaultValue={{ label: 'SAN MIGUEL', value: 199 }}
            value={personaState?.ciudadNacimiento}
          />
        </div>
        <div className='col-lg-4 mt-3'>
          <label htmlFor='' className='small mb-1'>
            Canton:
          </label>
          <Select
            isClearable
            onChange={onChangesCanton}
            closeMenuOnSelect={true}
            placeholder='Canton'
            id='cantonNacimiento'
            options={datosCanton}
            value={personaState?.cantonResidencia}
          />
        </div>
        <div className='form-group col-sm-4 mt-3'>
          <label htmlFor='' className='small mb-1'>
            E-mail: (*)
          </label>
          <input
            type='text'
            className='form-control'
            id='email'
            {...register('email', {
              required: true,
            })}
            onChange={onChangesPersonas}
            placeholder='correo@gmail.com'
          />
          {error.email?.type === 'required' && (
            <b style={{ color: '#D14A3F' }} className='mt-2'>
              <span> El campo es requerido </span>
            </b>
          )}
        </div>
      </div>
      <div className='row gx-3 mb-3'>
        <div className='form-group col-sm-3 mt-3'>
          <label htmlFor='' className='small mb-1'>
            Fecha nacimiento: (*)
          </label>
          <input
            className='form-control'
            type='date'
            id='fechaNacimiento'
            {...register('fechaNacimiento', {
              required: true,
            })}
            onChange={onChangesPersonas}
            value={personaState?.fechaNacimiento}
          />
          {error.fechaNacimiento?.type === 'required' && (
            <b style={{ color: '#D14A3F' }} className='mt-2'>
              El campo es requerido
            </b>
          )}
        </div>

        <div className='form-group col-sm-1 mt-3'>
          <div className='text-center'>
            <label>Edad:</label>
            <h4>{edad ? edad : ''}</h4>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
