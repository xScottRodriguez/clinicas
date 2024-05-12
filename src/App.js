/** @format */
import 'react-phone-number-input/style.css';
import './index.css';
import './themes/theme-light.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authorizate from './services/Authorizate';

import LayoutTheme from './containers/layouts/LayoutTheme';
import PrivateRouter from './libs/Router/PrivateRouter';
import Login from './pages/acceso/Login';
import Home from './pages/home/Home';

import RecoveryPassword from './pages/acceso/RecoveryPassword';
import AddUsers from './pages/usuarios/AddUsers';
import Roles from './pages/roles/RolesList';
import AddRoles from './pages/roles/AddRoles.jsx';
import Usuarios from './pages/usuarios/UsuariosList';
import Perfil from './pages/acceso/Perfil';
import AddModulos from './pages/modulos/AddModulos';
import ModulosList from './pages/modulos/ModulosList';
import SucursalesList from './pages/Administracion/sucursales/Sucursales';
import FormSucursales from './pages/Administracion/sucursales/FormSucursales.jsx';
import Empresas from './pages/Administracion/empresas/Empresas';
import FormEmpresas from './pages/Administracion/empresas/FormEmpresas';
import { Sesiones } from './pages/usuarios/Sesiones';
import { SesionesBloqueadas } from './pages/usuarios/SesionesBloqueadas';
import { Personas } from './pages/Administracion/personas/Personas';
import { PersonasForm } from './pages/Administracion/personas/PersonasForm';
import TablaEstudios from './pages/labClinico/estudiosLC/TablaEstudios';
import FormEstudiosLC from './pages/labClinico/estudiosLC/FormEstudiosLC';
import FormatoEstudio from './pages/labClinico/estudiosLC/FormatoEstudio';
import TablaTecnicoLector from './pages/labClinico/tecinoLector/TablaTecnicoLector';
import FormTecnicoLector from './pages/labClinico/tecinoLector/FormTecnicoLector';
import TablaPrincipal from './pages/labClinico/ingresoResultado/TablaPrincipal';
import FormularioPrincipal from './pages/labClinico/ingresoResultado/FormularioPrincipal';
import TablaDivisiones from './pages/labClinico/divisones/TablaDivisiones';
import FormDivisiones from './pages/labClinico/divisones/FormDivisiones';
import TablaInforme from './pages/labClinico/informes/TablaInforme';
import FormularioInformes from './pages/labClinico/informes/FormularioInformes';
import TablaMedicoLector from './pages/RXyUSG/medicoLectores/TablaMedicoLector';
import FormularioMedicoLector from './pages/RXyUSG/medicoLectores/FormularioMedicoLector';
import TablaTecnicoRx from './pages/RXyUSG/tecnicoRX/TablaTecnicoRx';
import FormTecnico from './pages/RXyUSG/tecnicoRX/FormTecnico';
// import TipoSangre from "./pages/registroMedicos/tipoSangre/TipoSangre"
import Paciente from './pages/registroMedicos/expedienteClinico/Paciente';
import TablaExpedienteClinico from './pages/registroMedicos/expedienteClinico/TablaExpedienteClinico';
import Alergias from './pages/persona/InformacionGeneral';
import ConsultaPanel from './pages/consultas/headerConsultas/ConsultaPanel';
import ErrorNotFount from './pages/error/404';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MedicosPage } from './pages/medicos/MedicosPage.jsx';
import AgendaCitas from './pages/consultas/AgendaCitas.jsx';
import {
  UUID_AGENDA_CITAS,
  UUID_ESPECIALIDADES,
  UUID_LISTA_EXPEDIENTE,
  UUID_LISTA_MEDICOS,
  UUID_MEDICOS,
  UUID_SUB_ESPECIALIDADS,
} from './constants/index.js';
import { Especialidades } from './pages/medicos/Especialidades.jsx';
import { SubEspecialidades } from './pages/medicos/SubEspecialidades.jsx';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <LayoutTheme>
          <Routes>
            <Route exact path='/' element={<PrivateRouter />}>
              <Route exact path='/' element={<Home />} />
            </Route>

            {/* rutas relacionadas a usuarios*/}
            <Route exact path='/' element={<PrivateRouter />}>
              <Route
                exact
                path='/usuarios'
                element={Authorizate(
                  Usuarios,
                  '855c38cd-adc4-4a4f-85e2-9d0cf9078594'
                )}
              />
              <Route
                exact
                path='/usuarios/:id'
                element={Authorizate(
                  AddUsers,
                  '855c38cd-adc4-4a4f-85e2-9d0cf9078594'
                )}
              />
              <Route
                exact
                path='/usuarios/nuevo'
                element={Authorizate(
                  AddUsers,
                  '855c38cd-adc4-4a4f-85e2-9d0cf9078594'
                )}
              />
              <Route exact path='/sesiones' element={<Sesiones />} />
              <Route
                exact
                path='/usuarios/bloqueados'
                element={<SesionesBloqueadas />}
              />
              <Route
                exact
                path='/persona/'
                element={Authorizate(
                  Personas,
                  '3b8ea17e-6840-4919-aee6-a2617002a6e4'
                )}
              />
              <Route
                exact
                path='/persona/nuevo/'
                element={Authorizate(
                  PersonasForm,
                  '3b8ea17e-6840-4919-aee6-a2617002a6e4'
                )}
              />
              <Route
                exact
                path='/persona/update/:id'
                element={Authorizate(
                  PersonasForm,
                  '3b8ea17e-6840-4919-aee6-a2617002a6e4'
                )}
              />
              <Route exact path='/usuarios/update/:id' element={<AddUsers />} />
              <Route exact path='/perfil' element={<Perfil />} />
            </Route>

            {/* rutas para modulos y permisos */}
            <Route exact path='/' element={<PrivateRouter />}>
              {/* administracion de roles */}
              <Route
                exact
                path='/roles'
                element={Authorizate(Roles, '7db77ba8-1766-4c94-8357-48121205e43f')}
              />
              <Route
                exact
                path='/roles/nuevo'
                element={Authorizate(
                  AddRoles,
                  '7db77ba8-1766-4c94-8357-48121205e43f'
                )}
              />
              <Route
                exact
                path='/roles/update/:id'
                element={Authorizate(
                  AddRoles,
                  '7db77ba8-1766-4c94-8357-48121205e43f'
                )}
              />

              {/* administracion de modulo */}
              <Route
                exact
                path='/modulos'
                element={Authorizate(
                  ModulosList,
                  '75bcf8a7-3eb2-4b07-b893-05fa7f6bae12'
                )}
              />
              <Route
                exact
                path='/modulos/nuevo'
                element={Authorizate(
                  AddModulos,
                  '75bcf8a7-3eb2-4b07-b893-05fa7f6bae12'
                )}
              />
              <Route
                exact
                path='/modulos/update/:id'
                element={Authorizate(
                  AddModulos,
                  '75bcf8a7-3eb2-4b07-b893-05fa7f6bae12'
                )}
              />
            </Route>

            {/* Rutas para administracion de empresas */}
            <Route exact path='/' element={<PrivateRouter />}>
              {/* Sucursales formulario */}
              <Route
                exact
                path='/empresas/sucursales/nuevo'
                element={<FormSucursales />}
              />
              {/* Sucursales tabla */}
              <Route
                exact
                path='/empresas/sucursales'
                element={Authorizate(
                  SucursalesList,
                  '9efd33fb-9890-4e2d-82cd-035c3c0c8b9b'
                )}
              />
              {/* Sucursales formulario */}
              <Route
                exact
                path='/empresas/sucursales/update/:id'
                element={Authorizate(
                  FormSucursales,
                  '9efd33fb-9890-4e2d-82cd-035c3c0c8b9b'
                )}
              />
              {/* EMPRESAS */}
              <Route
                exact
                path='/administracion/empresas'
                element={Authorizate(
                  Empresas,
                  '7c46f530-24f1-4b42-a62b-162028f3eb34'
                )}
              />
              <Route
                exact
                path='/administracion/empresas/nuevo'
                element={Authorizate(
                  FormEmpresas,
                  '7c46f530-24f1-4b42-a62b-162028f3eb34'
                )}
              />
              <Route
                exact
                path='/administracion/empresas/update/:id'
                element={Authorizate(
                  FormEmpresas,
                  '7c46f530-24f1-4b42-a62b-162028f3eb34'
                )}
              />
            </Route>

            {/*  rutas relacionadas al login*/}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/recovery' element={<RecoveryPassword />} />
            <Route exact path='/not-found' element={<ErrorNotFount />} />
            <Route exact path='*' element={<Navigate to='/not-found' />} />
            {/* RUTA PARA LAB CLINICO */}
            <Route exact path='/' element={<PrivateRouter />}>
              <Route
                exact
                path='/lab_clinico/estudios'
                element={<TablaEstudios />}
              />
              <Route
                exact
                path='/lab_clinico/estudios/nuevo'
                element={<FormEstudiosLC />}
              />
              <Route
                exact
                path='/lab_clinico/estudios/update/:id'
                element={<FormEstudiosLC />}
              />
              <Route
                exact
                path='/lab_clinico/estudios/formato'
                element={<FormEstudiosLC />}
              />
              <Route
                exact
                path='/lab_clinico/estudios/formato/parametro'
                element={<FormatoEstudio />}
              />

              {/* RUTA PARA TECNICO LECTOR LAB */}
              <Route
                exact
                path='/lab_clinico/tecnico_lectores'
                element={<TablaTecnicoLector />}
              />
              <Route
                exact
                path='/lab_clinico/tecnico_lectores/nuevo'
                element={<FormTecnicoLector />}
              />
              {/* RUTAS PARA INGRESO RESULTADO */}

              <Route
                exact
                path='/lab_clinico/ingreso_resultados'
                element={<TablaPrincipal />}
              />
              <Route
                exact
                path='/lab_clinico/ingreso_resultados/gestion'
                element={<FormularioPrincipal />}
              />
              {/* RUTAS LAb_clinico divisiones */}
              <Route
                exact
                path='/lab_clinico/divisiones'
                element={<TablaDivisiones />}
              />
              <Route
                exact
                path='/lab_clinico/divisiones/nuevo'
                element={<FormDivisiones />}
              />
              <Route
                exact
                path='/lab_clinico/divisiones/update/:id'
                element={<FormDivisiones />}
              />

              {/* RUTAS LAb_clinico Informes*/}
              <Route
                exact
                path='/lab_clinico/informes'
                element={<TablaInforme />}
              />
              <Route
                exact
                path='/lab_clinico/informes/nuevo'
                element={<FormularioInformes />}
              />
              <Route
                exact
                path='/lab_clinico/informes/update/:id'
                element={<FormularioInformes />}
              />
            </Route>

            {/* RURAS PARA RX Y USG */}
            <Route exact path='/' element={<PrivateRouter />}>
              {/* MEDICO LECTORES */}
              <Route
                exact
                path='/rx_usg/medicos_lectores'
                element={<TablaMedicoLector />}
              />
              <Route
                exact
                path='/rx_usg/medicos_lectores/nuevo'
                element={<FormularioMedicoLector />}
              />
              <Route
                exact
                path='/rx_usg/medicos_lectores/update/:id'
                element={<FormularioMedicoLector />}
              />

              {/* TECNICO */}

              <Route
                exact
                path='/rx_usg/tecnicos_rx'
                element={<TablaTecnicoRx />}
              />
              <Route
                exact
                path='/rx_usg_tecnicos_rx/nuevo'
                element={<FormTecnico />}
              />
              <Route
                exact
                path='/rx_usg/tecnicos_rx/update/:id'
                element={<FormTecnico />}
              />
              {/* TIPO DE SANGRE */}
              <Route
                exact
                path='/expedientes-medicos'
                element={Authorizate(TablaExpedienteClinico, UUID_LISTA_EXPEDIENTE)}
              />
              <Route
                exact
                path='/expedientes-medicos/:id'
                element={Authorizate(Paciente, UUID_LISTA_EXPEDIENTE)}
              />
              <Route
                exact
                path='/expedientes-medicos/pacientes/nuevo'
                element={Authorizate(Paciente, UUID_LISTA_EXPEDIENTE)}
              />
              <Route
                exact
                path='/expedientes-medicos/:id/consultas/nueva'
                element={Authorizate(ConsultaPanel, UUID_LISTA_EXPEDIENTE)}
              />
              <Route
                exact
                path='/expedientes-medicos/:id/consultas/:consultaId'
                element={Authorizate(ConsultaPanel, UUID_LISTA_EXPEDIENTE)}
              />
              <Route
                exact
                path='/expedientes-medicos/agenda-citas'
                element={Authorizate(AgendaCitas, UUID_AGENDA_CITAS)}
              />

              <Route
                exact
                path='/medicos'
                element={Authorizate(MedicosPage, UUID_LISTA_MEDICOS)}
              />
              <Route
                exact
                path='/medicos/especialidades'
                element={Authorizate(Especialidades, UUID_ESPECIALIDADES)}
              />
              <Route
                exact
                path='/medicos/sub-especialidades'
                element={Authorizate(SubEspecialidades, UUID_SUB_ESPECIALIDADS)}
              />

              <Route exact path='/alergias' element={<Alergias />} />
            </Route>
          </Routes>
        </LayoutTheme>
      </Router>
    </Provider>
  );
}

export default App;
