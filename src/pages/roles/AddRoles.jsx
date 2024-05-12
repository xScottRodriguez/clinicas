/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import peticionesAxios from '../../services/peticionesAxios';
import Alertas from '../../services/Alertas';
import { useForm } from 'react-hook-form';
import AxiosCabeceras from '../../services/AxiosCabeceras';
import TablaModulo from '../../components/listados/tablaModulo';
import AsyncSelect from 'react-select/async';
import { TablePlugin } from '../../plugins/components/TablePlugin';
import { Button, Dropdown } from 'react-bootstrap';
import { CgMenuLeft } from 'react-icons/cg';
import { PiTrashSimple } from 'react-icons/pi';

export default function AddRoles() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      loadRoles(id);
    }
    loadOptions();
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
  });

  const [modulo, setModulos] = useState([]);

  const [datos, setDatos] = useState([]);

  const [hijos, setHijos] = useState([]);

  const [moduloHijo, setModuloHijos] = useState([]);

  const [disable, setDisable] = useState(true);
  const [tabla, setTabla] = useState([]);
  const [repetido, setRepetido] = useState();
  const [inputValue, setValues] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const onSubmit = (rol) => {
    if (id) {
      let resultModulos;
      if (datos[0] === null) {
        resultModulos = [...moduloHijo];
      } else {
        resultModulos = [...datos, ...moduloHijo];
      }
      const result = resultModulos?.map((modulo) => ({
        modulo: modulo.value,
      }));

      const update = {
        nombre: rol.nombre,
        modulos: result,
      };
      Alertas.loading_reload(true, 'Actualizando Rol');
      peticionesAxios.update(`roles/${id}`, update).then((result) => {
        Alertas.loading_reload(false);
        if (result !== false) {
          if (result.status === 200) {
            Alertas.alertEmpty(
              'Rol actualizado con éxito!',
              'Administración de Suyanet',
              'success'
            );
            navigate('/roles');
          }
        }
      });
    } else {
      const id_modulo_hijos = moduloHijo?.map((modulo) => ({
        modulo: modulo.value,
      }));
      const id_modulos = datos?.map((modulo) => ({
        modulo: modulo.value,
      }));

      const result = [...id_modulos, ...id_modulo_hijos];

      let data = {
        nombre: rol.nombre,
        modulos: result,
      };
      Alertas.loading_reload(true, 'Guardando Rol');
      peticionesAxios.POST('roles', data).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 201) {
            Alertas.alertEmpty(
              'Rol guardado con éxito!',
              'Administración de Suyanet',
              'success'
            );
            navigate('/roles');
          }
        }
      });
    }
  };

  const hanldeChages = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const loadRoles = async (id) => {
    const rol = await peticionesAxios.find(`roles/${id}`, {
      header: AxiosCabeceras.getHeader(),
    });
    setFormulario(rol.data.roles[0].nombre);
    setValue('nombre', rol.data.roles[0].nombre);
    const tbDatos = rol.data.modulos?.map((modulo) => ({
      value: modulo.id_roles_modulos,
      label: modulo.nombre,
      estado: 1,
    }));
    setTabla(tbDatos);
  };

  const hanldeChagesHijos = (values) => {
    setModuloHijos(values);
  };

  const Delete = (idmodulo) => {
    Alertas.loading_reload(true);
    const prueba = tabla.filter((datos) => datos.value !== idmodulo);
    setTabla(prueba);

    peticionesAxios.borrar(`roles/${idmodulo}`).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        Alertas.toast_success('Modulo Eliminado !');

        if (result.status === 200) {
          loadRoles(id);
        }
      }
    });
  };

  const handleDelete = (id) => {
    if (id) {
      Alertas.QuestionYesNo(
        '¿Deseas eliminar este modulo?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id);
        }
      });
    }
  };
  const activo = ({ row: { original } }) => {
    return (
      <div>
        <label>
          {original.estado ? (
            <span className='badge bg-green-soft text-green'>Activado</span>
          ) : (
            <span className='badge bg-red-soft text-red'>Desactivado</span>
          )}
        </label>
      </div>
    );
  };

  const columnsDef = [
    { header: 'CÓDIGO', accessorKey: 'value' },
    { header: 'NOMBRE MÓDULOS', accessorKey: 'label' },
    { header: 'ESTADO', accessorKey: 'estado', cell: activo },
    {
      accessorKey: 'actions',
      header: 'ACCIONES',
      cell: rankFormatter,
    },
  ];

  function rankFormatter({ row: { original } }) {
    return (
      <>
        <Dropdown flip drop='left'>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            <CgMenuLeft />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleDelete(original.value)}
              className='text-danger'
            >
              <PiTrashSimple className='mx-1' /> Eliminar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }

  const tableModulo = () => {
    let data;

    if (datos[0] === null) {
      data = [...moduloHijo];
    } else {
      data = [...datos, ...moduloHijo];
    }
    let dataRepetida = [];
    let modulos;
    tabla?.map((tables) => {
      dataRepetida = data
        .filter((item) => item.label === tables.label)
        .concat(dataRepetida);

      modulos = dataRepetida?.map((r) => r.label);
      return dataRepetida;
    });
    if (dataRepetida.length > 0) {
      setRepetido(modulos);
    } else {
      setTabla([...tabla, ...data]);
    }
  };

  // handle input change event
  const handleInputChange = (value) => {
    setValues(value);
  };

  // handle selection
  const handleChange = async (value) => {
    setSelectedValue(value);
    setDatos([value]);

    try {
      const hijo = await peticionesAxios.find(`modulo/hijos/${value.value}`);
      const result = hijo.data?.map((modulo) => ({
        value: modulo.id,
        label: modulo.nombre,
      }));

      const habilitado = result.length > 0;

      setHijos(result);
      setDisable(!habilitado);
    } catch (error) {
      return error;
    }
  };

  const loadOptions = async (inputValue) => {
    const result = await peticionesAxios.find(
      `modulo/principales?filter=${inputValue}`
    );
    const data = result.data?.map((modulo) => ({
      value: modulo.id,
      label: modulo.nombre,
    }));
    setModulos(result);
    return data;
  };

  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link className='btn btn-sm btn-light text-primary' to={'/roles'}>
            <i className='fa fa-arrow-left' />
            Volver a la lista de roles
          </Link>
        }
        title={id ? 'Editar Role' : 'Administracion de roles'}
      >
        <div className='card mb-4'>
          <div className='card-header'>{id ? 'Editar rol' : 'Agregar rol'}</div>
          <div className='card-body'>
            <form>
              <div className='row gx-3 mb-3'>
                <div className='border mt-h-75'>
                  <div className='row gx-3 mb-3'>
                    <div className='col-sm-4'>
                      <label className='small mb-1' htmlFor='inputFirstName'>
                        Nombre rol:
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Nombre'
                        id='nombre'
                        {...register('nombre', {
                          required: true,
                        })}
                        onChange={hanldeChages}
                      />
                      {errors.nombre?.type === 'required' && (
                        <b style={{ color: '#D14A3F' }} className='mt-2'>
                          El nombre es requerido
                        </b>
                      )}
                    </div>
                    <div className='col-sm-4'>
                      <label htmlFor='inputFirstName' className='small mb-1'>
                        Módulos Principales
                      </label>
                      <AsyncSelect
                        id='modulo'
                        placeholder='Seleccione una opción'
                        {...register('modulo', {
                          required: false,
                        })}
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        closeMenuOnSelect
                        isClearable
                      />
                    </div>

                    <div className='col-sm-4'>
                      <div className='form-group '>
                        <label htmlFor='inputFirstName' className='small mb-1'>
                          Módulos Hijos
                        </label>

                        <Select
                          id='hijo'
                          placeholder='Seleccione una opción'
                          {...register('hijo', {
                            required: false,
                          })}
                          options={hijos}
                          closeMenuOnSelect={false}
                          isMulti
                          onChange={hanldeChagesHijos}
                          isDisabled={disable}
                        />
                        {errors.hijo?.type === 'required' && (
                          <b style={{ color: '#E77575' }} className='mt-2'>
                            El hijo es requerido
                          </b>
                        )}
                      </div>
                    </div>
                    {repetido
                      ? repetido?.map((data) => {
                          return (
                            <div className='mt-3 col-md-5'>
                              <li className=' alert alert-warning' key={data.value}>
                                Módulos asignados {data}
                              </li>
                            </div>
                          );
                        })
                      : null}
                    <div className=' mt-5 col-md-10 text-center'>
                      <button
                        type='button'
                        className='btn btn-primary btn-lg'
                        onClick={tableModulo}
                      >
                        <span
                          className='fas fa-plus'
                          style={{ marginRight: '10px' }}
                        />
                        AGREGAR
                      </button>
                    </div>
                  </div>
                </div>

                <div className='border'>
                  <div className='row gx-3 mb-3'>
                    <div className='form-group '>
                      <div className='row p-t-20'></div>
                      <div className='card-header border mt-3'>
                        Listado de Módulos
                      </div>
                      <div className='border'>
                        <div className='row mb-3'>
                          <div className='col-lg-13 mt-4'>
                            <TablePlugin data={tabla} columns={columnsDef} />
                            {/* <TablaModulo
                              id={'value'}
                              data={tabla}
                              columns={columnsDef}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className='card-footer text-center'>
              <button
                className='btn btn-secondary btn-lg mr-2'
                onClick={() => {
                  navigate('/roles');
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
        </div>
      </LayoutForm>
    </Fragment>
  );
}
