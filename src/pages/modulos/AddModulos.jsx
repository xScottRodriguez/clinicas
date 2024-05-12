import React, { Fragment, useState, useEffect } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import peticionesAxios from '../../services/peticionesAxios';
import Alertas from '../../services/Alertas';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

export default function AddModulos() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      handleLoadModul(id);
    }
    moduloPrincipales();
    // eslint-disable-next-line
  }, [id]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formulario, setFormulario] = useState({
    nombre: '',
    es_principal: '',
    principal: '',
  });

  const [inputValue, setValues] = useState('');

  const onSubmit = (modulo) => {
    if (id) {
      const update = {
        nombre: modulo.nombre,
        es_principal: modulo.es_principal,
        principal:
          formulario.principal.length > 0 ? formulario.principal[0].value : 0,
      };
      Alertas.loading_reload(true, 'Actualizando módulo');
      peticionesAxios.update(`modulo/${id}`, update).then((result) => {
        Alertas.loading_reload(false);
        if (result !== false) {
          console.log(inputValue);
          if (result.status === 200) {
            Alertas.alertEmpty(
              'Módulo actualizado con éxito!',
              'Administración de suyanet',
              'success'
            );
            navigate('/modulos');
          }
        }
      });
    } else {
      let data = {
        nombre: modulo.nombre,
        es_principal: modulo.es_principal,
        principal:
          formulario.principal.length > 0 ? formulario.principal[0].value : 0,
      };
      Alertas.loading_reload(true, 'Guardando Modulo');
      peticionesAxios.POST('modulo', data).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 201 || result.status === 200) {
            Alertas.alertEmpty(
              'Módulo guardado con éxito!',
              'Administración de suyanet',
              'success'
            );
            navigate('/modulos');
          }
        } else {
          Alertas.alertEmpty(
            'Error al guardar el módulo',
            'Administración de suyanet',
            'error'
          );
        }
      });
    }
  };

  const moduloPrincipales = async (inputValue) => {
    try {
      const esPrincipal = await peticionesAxios.find(
        `modulo/principales?filter=${inputValue}`
      );
      const data = esPrincipal.data?.map((modulo) => ({
        value: modulo.id,
        label: modulo.nombre,
      }));
      return data;
    } catch (error) {
      return error;
    }
  };

  const handleLoadModul = async (id) => {
    try {
      const modul = await peticionesAxios.find(`modulo/${id}`);
      const result = {
        nombre: modul.data.nombre,
        es_principal: modul.data.esPrincipal,
        principal: {
          value: modul.data.principal?.id_modulo,
          label: modul.data.principal?.nombre,
        },
      };
      setFormulario(result);
      setValue('nombre', result.nombre);
      setValue('es_principal', result.es_principal);
      setValue('principal', result.principal);

      if (result.es_principal === true) {
        document.getElementById('es_principal').checked = true;
        document.getElementById('principal').disabled = true;
      }
    } catch (error) {
      return error;
    }
  };

  const handleChanges = (e) => {
    const id_componente = e.target.id;
    const value = e.target.value;
    setFormulario({ ...formulario, [id_componente]: value });
  };

  const hanldeCheck = (e) => {
    const id_componente = e.target.id;
    if (document.getElementById(id_componente).checked) {
      setFormulario({ ...formulario, [id_componente]: true });
      document.getElementById('principal').disabled = true;
    } else {
      setFormulario({ ...formulario, [id_componente]: false });
      document.getElementById('principal').disabled = false;
    }
  };
  const handleChange = async (value) => {
    setFormulario({ ...formulario, principal: value });
  };
  const handleInputChange = (value) => {
    setValues(value);
  };

  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link className='btn btn-sm btn-light text-primary' to={'/modulos'}>
            <i className='fa fa-arrow-left' />
            Regresar a la lista de módulo
          </Link>
        }
        title={id ? 'Edito de módulo' : 'Administracion de módulo'}
      >
        <div className='card mb-4'>
          <div className='card-header'>Registro de módulos</div>
          <div className='card-body'>
            <form>
              <div className='form-body'>
                <h3 className='card-title'>Informacion del módulos</h3>
                <hr />
                <div className='row p-t-20'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label className='control-label'>Nombre del modulo:</label>
                      <input
                        type='text'
                        id='nombre'
                        className='form-control'
                        {...register('nombre', {
                          required: true,
                        })}
                        placeholder='Nombre del módulos'
                        onChange={handleChanges}
                        // defaultValue={.nombre}
                      />
                      {errors.nombre?.type === 'required' && (
                        <b style={{ color: '#D14A3F' }} className='mt-2'>
                          El nombre es requerido
                        </b>
                      )}
                    </div>
                  </div>

                  <div className='col-md-3 mt-2'>
                    <div className='form-group has-danger'>
                      <div className='checkbox checkbox-success'>
                        <label className='small mb-1'>módulo principal:</label>
                        <div className='boder '>
                          <div className=' form-check form-switch'>
                            <input
                              className='form-check-input'
                              {...register('es_principal', {
                                required: false,
                              })}
                              type='checkbox'
                              role='switch'
                              id='es_principal'
                              name='es_principal'
                              onChange={hanldeCheck}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 mt-2'>
                    <div className='form-group has-danger'>
                      <label className='small mb-1'>Módulo Principales:</label>
                      <div className='boder '>
                        <AsyncSelect
                          isDisabled={formulario.es_principal}
                          id='principal'
                          cacheOptions
                          defaultOptions
                          placeholder='Seleccione una opción'
                          closeMenuOnSelect
                          value={formulario.principal}
                          loadOptions={moduloPrincipales}
                          onInputChange={handleInputChange}
                          onChange={handleChange}
                          isClearable
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='card-footer text-center'>
            <button
              className='btn btn-secondary btn-lg mr-2'
              onClick={() => {
                navigate('/modulos');
              }}
              style={{ marginRight: '10px' }}
            >
              <i className='fa fa-arrow-circle-left'></i> SALIR
            </button>
            <button
              className='btn btn-primary btn-lg'
              onClick={handleSubmit(onSubmit.bind(this))}
            >
              <i className='fa fa-save'></i> Guardar
            </button>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
