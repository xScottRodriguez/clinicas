import React, { Fragment, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import LayoutForm from '../../containers/layouts/LayoutForm';
import Encriptaciones from '../../services/Encriptaciones';
import Alertas from '../../services/Alertas';
import peticionesAxios from '../../services/peticionesAxios';
import { PASSWORD_REGE } from '../../constants';

export default function Perfil() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    const usuario = Encriptaciones.getSession('dataUser').id_usuario;
    const passwords = data.password;
    const datos = {
      password: passwords,
    };

    Alertas.loading_reload(true, 'Cargando...');
    peticionesAxios
      .PATCH(`user/create-password/${usuario}`, datos)
      .then((result) => {
        Alertas.loading_reload(false);
        if (result) {
          if (result.status === 200 || result.status === 201) {
            Alertas.alertEmpty(
              '¡Contraseña cambiada con éxito!',
              'La contraseña ha sido cambiada con éxito',
              'success'
            );
            navigate('/');
          } else if (result.status === 401) {
            Alertas.alertEmpty(
              `¡${result.data.message}!`,
              'Por favor verifique sus datos e intente nuevamente',
              'info'
            );
          }
        } else {
          Alertas.alertEmpty(
            '!Error al cambiar contraseña!',
            'No se pudo cambiar por un problema de servidor',
            'error'
          );
        }
      });
  };

  return (
    <Fragment>
      <LayoutForm title='Informacion del perfil'>
        <div className='row'>
          <div className='col-xl-4'>
            <div className='card shadow-none mb-4 mb-xl-0'>
              <div className='card-header'>Foto de perfil</div>
              <div className='card-body text-center'>
                <img
                  className='img-account-profile rounded-circle mb-2'
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/illustrations/profiles/profile-1.png'
                  }
                  alt='profile-1.png'
                />
                <div className='small font-italic text-muted mb-4'>
                  JPG o PNG no mayor a 5 MB
                </div>
                <button className='btn btn-primary' type='button'>
                  Subir nueva imagen
                </button>
              </div>
            </div>
          </div>
          <div className='col-xl-8'>
            <div className='card mb-4 shadow-none'>
              <div className='card-header'>Informacion de perfil</div>
              <div className='card-body'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-3'>
                    <Form.Label className='small mb-1'>
                      Nombre de usuario
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Escriba un nombre de usuario'
                      readOnly
                      defaultValue={Encriptaciones.getSession('dataUser').username}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label className='small mb-1'>Nombre completo</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Nombre completo'
                      readOnly
                      defaultValue={Encriptaciones.getSession('dataUser').nombre}
                    />
                  </Form.Group>
                  <Form.Group className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <Form.Label className='small mb-1'>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Password'
                          {...register('password', {
                            required: 'Password es requerido',
                            pattern: {
                              value: PASSWORD_REGE,
                              message:
                                'La contraseña debe incluir al menos una mayúscula, un valor numérico y un carácter especial',
                            },
                            minLength: {
                              value: 8,
                              message: 'Minimo 8 caracteres',
                            },
                            maxLength: {
                              value: 20,
                              message: 'La longitud máxima requerida es 20',
                            },
                          })}
                        />
                        <Button
                          variant='outline-secondary'
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </Button>
                      </InputGroup>
                      {errors.password && (
                        <span style={{ color: '#E77575' }} className='mt-2'>
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <Form.Label className='small mb-1'>
                        Confirmar password
                      </Form.Label>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        {...register('confirmPassword', {
                          required: 'Se requiere confirmar contraseña',
                          validate: (value) =>
                            value === watch('password') ||
                            'Las contraseñas no coinciden',
                        })}
                      />
                      {errors.confirmPassword && (
                        <span style={{ color: '#E77575' }} className='mt-2'>
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  </Form.Group>
                  <div className='card-footer text-center'>
                    <Button
                      className='btn btn-secondary btn-lg mr-2'
                      onClick={() => {
                        navigate('/');
                      }}
                      style={{ marginRight: '10px' }}
                    >
                      <i className='fa fa-arrow-circle-left'></i> SALIR
                    </Button>
                    <Button type='submit' className='btn btn-primary btn-lg'>
                      <i className='fa fa-save'></i> Guardar
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
}
