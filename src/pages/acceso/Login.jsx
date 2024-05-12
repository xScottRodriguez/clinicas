import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '../../services/rtk-query/clinicalApi';
import { toastAdapter } from '../../plugins/hot-toast.plugin';
import { loginSchema, saveOnCookies } from '../../utils';
import almacenamientoLocal from '../../services/Encriptaciones';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    toastAdapter.promise({
      promise: loginMutation({
        usuario: data.user,
        password: data.password,
      }).unwrap(),
      successMessage: (data) => {
        const responseLogin = data;
        almacenamientoLocal.setSession('dataUser', responseLogin.user);
        almacenamientoLocal.setSession('modulos', responseLogin.modulos);
        almacenamientoLocal.setSession('token', responseLogin.token);
        localStorage.setItem('token', responseLogin.token);
        dispatch(setUser({ ...responseLogin.user, modulos: responseLogin.medico }));
        saveOnCookies('medico', {
          ...responseLogin.user,
          medico: responseLogin.medico,
        });
        navigate('/');
        window.location.href = '/';

        return 'Logeado...';
      },
      errorMessage: (response) => {
        const { data } = response;

        if (typeof data?.message === 'string') {
          return 'usuario o contraseña incorrectos';
        }

        return 'Error al iniciar sesion';
      },
      loadingMessage: 'Iniciando Sesion...',
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Row className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4'>
                <h2 className='fw-bold mb-2 text-uppercase '>Clinicas Suyanet</h2>
                <p className=' mb-5'>
                  Introduzca su nombre de usuario y contraseña!
                </p>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Label className='text-center'>usuario</Form.Label>
                      <Controller
                        control={control}
                        name='user'
                        render={({ field }) => (
                          <Form.Control
                            isInvalid={errors.user?.message}
                            isValid={!errors.user?.message && field.value}
                            type='text'
                            placeholder='Escribir nombre de usuario'
                            {...field}
                          />
                        )}
                      />
                      {errors.user?.message && (
                        <Form.Text className='text-danger'>
                          {errors.user.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Label>contraseña</Form.Label>

                      <Controller
                        control={control}
                        name='password'
                        render={({ field }) => (
                          <InputGroup className='mb-3'>
                            <Button
                              variant='outline-primary'
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </Button>
                            <Form.Control
                              isInvalid={errors.password?.message}
                              isValid={!errors.password?.message && field.value}
                              type={!showPassword ? 'password' : 'text'}
                              placeholder='contraseña'
                              {...field}
                            />
                          </InputGroup>
                        )}
                      />
                      {errors.password?.message && (
                        <Form.Text className='text-danger'>
                          {errors.password.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <div className='d-grid'>
                      <Button variant='primary' type='submit'>
                        Iniciar Sesion
                      </Button>
                    </div>
                  </Form>
                  {/* <div className='mt-3'>
                    <p className='mb-0  text-center'>
                      Don&apos;t have an account?{' '}
                      <a href="{''}" className='text-primary fw-bold'>
                        Sign Up
                      </a>
                    </p>
                  </div> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
