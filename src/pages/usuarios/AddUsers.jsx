import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutForm from '../../containers/layouts/LayoutForm';
import Alertas from '../../services/Alertas';
import AxiosCabeceras from '../../services/AxiosCabeceras';
import peticionesAxios from '../../services/peticionesAxios.js';
import { Controller, useForm } from 'react-hook-form';
import { AsyncSelectCustom } from '../../components/selects/AsyncSelect.jsx';
import { useMedicosQuery } from '../../services/rtk-query/clinicalApi.js';
export default function AddUsers() {
  const navigate = useNavigate();
  const { id } = useParams();
    const [search, setSearch] = useState('');

  const { data: doctors, isFetching, isSuccess } = useMedicosQuery(search);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //state inicial
  const [formulario, setFormulario] = useState({
    nombre: '',
    usuario: '',
    rol: '',
    medicoId: null,
  });

  
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

  const [roles, setRol] = useState([]);

  useEffect(() => {
    if (id) {
      loadUsers(id);
    }

    peticionAPI();
    // eslint-disable-next-line
  }, [id]);

  //funcion para la peticion post a el endpoint user

  const onSubmit = (dataUser) => {
    if (id) {
      const update = {
        nombre: dataUser.nombre,
        usuario: dataUser.usuario,
        rol: parseInt(dataUser.rol),
        medicoId: dataUser.doctor?.value,
      };
      Alertas.loading_reload(true, 'Actualizando Usuaruio');
      peticionesAxios.update(`user/${id}`, update).then((result) => {
        Alertas.loading_reload(false);
        if (result !== false) {
          if (result.status === 200) {
            Alertas.alertEmpty(
              'Usuaruio actualizado con éxito!',
              'Administración de Suyanet',
              'success'
            );
            navigate('/usuarios');
          }
        }
      });
    } else {
      let data = {
        nombre: dataUser.nombre,
        usuario: dataUser.usuario,
        rol: parseInt(dataUser.rol),
        medicoId: dataUser.doctor?.value,
      };
      Alertas.loading_reload(true, 'Guardando Usuario');
      peticionesAxios.POST('user', data).then((result) => {
        Alertas.loading_reload(false);
        if (result) {
          if (result.status === 201) {
            Alertas.alertEmpty(
              'Usuario guardado con éxito!',
              'Administración de Suyanet',
              'success'
            );
            navigate('/usuarios');
          }
        } else {
          Alertas.alertEmpty(
            '!Error al guardar el usuario!',
            'Este usuatuio ya existe',
            'info'
          );
        }
      });
    }
  };

  //haciendo peticion a ala api para el llenado de select
  const peticionAPI = async () => {
    try {
      const peticionPOST = await peticionesAxios.find('/roles', {
        headers: AxiosCabeceras.getHeader(),
      });
      setRol(peticionPOST.data);
    } catch (error) {
    }
  };

  //leer los datos del form
  const handleChangesUsers = (e) => {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value,
    });
  };

  //consulta para editat
  const loadUsers = async (id) => {
    const loadUSers = await peticionesAxios.find(`/user/${id}`, {
      headers: AxiosCabeceras.getHeader(),
    });
    setFormulario(loadUSers.data);
    setFormulario(loadUSers.data);
    setValue('nombre', loadUSers.data.nombre);
    setValue('usuario', loadUSers.data.usuario);
    setValue('rol', loadUSers.data.rol.id);
    setValue('doctor', {
      value: loadUSers?.data?.medico.id,
      label: `${loadUSers?.data?.medico?.nombres} ${loadUSers?.data?.medico?.apellidos}`,
    });
  };

  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link className='btn btn-sm btn-light text-primary' to={'/usuarios'}>
            <i className='fa fa-arrow-left' />
            Regresar a la lista de usuarios
          </Link>
        }
        title={id ? 'Editar usuarios' : 'Administracion de usuarios'}
      >
        <div className='card mb-4'>
          <div className='card-header'>Detalles de la cuenta</div>
          <div className='card-body'>
            <form>
              <div className='row gx-3 mb-3'>
                <div className='col-md-3'>
                  <label className='small mb-1'>Rol:</label>
                  <select
                    id='rol'
                    onChange={handleChangesUsers}
                    {...register('rol', {
                      required: true,
                    })}
                    defaultValue={
                      formulario.rol?.id
                        ? String(formulario.rol?.id)
                        : String(formulario.rol)
                    }
                    className='form-control'
                  >
                    <option value='' disabled={true}>
                      Seleccione una opción
                    </option>
                    {roles?.map((roles) => (
                      <option key={roles.id} value={roles.id}>
                        {roles.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.rol?.type === 'required' && (
                    <b style={{ color: '#D14A3F' }} className='mt-2'>
                      rol es requerido
                    </b>
                  )}
                </div>

                <div className='col-md-3'>
                  <label className='small mb-1' htmlFor='inputLastName'>
                    Nombre de usuario:
                  </label>
                  <input
                    onChange={handleChangesUsers}
                    className={'form-control'}
                    type='text'
                    placeholder='Escriba su nombre de usuario'
                    id='nombre'
                    {...register('nombre', {
                      required: true,
                    })}
                    defaultValue={formulario?.nombre}
                  />
                  {errors.nombre?.type === 'required' && (
                    <b style={{ color: '#D14A3F' }} className='mt-2'>
                      El nombre es requerido
                    </b>
                  )}
                </div>
                <div className='col-md-3'>
                  <label className='small mb-1' htmlFor='inputEmailAddress'>
                    Puedes llamarme:
                  </label>
                  <input
                    id='usuario'
                    onChange={handleChangesUsers}
                    className={'form-control'}
                    {...register('usuario', {
                      required: true,
                    })}
                    type='text'
                    placeholder='Nombre en el sistema '
                    defaultValue={formulario?.usuario}
                  />
                  {errors.usuario?.type === 'required' && (
                    <b style={{ color: '#D14A3F' }} className='mt-2'>
                      El usuario es requerido
                    </b>
                  )}
                </div>
                  <div className="col-md-3">
                    <label htmlFor="">Seleccione un medico:</label>
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
                  </div>
              </div>
            </form>
            <div className='card-footer text-center'>
              <button
                className='btn btn-secondary btn-lg mr-2'
                onClick={() => {
                  navigate('/usuarios');
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
