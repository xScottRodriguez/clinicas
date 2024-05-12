import React from 'react';
import { Seguridad } from './seguridad/seguridad';
import { Componentes } from '../administracion/componentes/Componentes';
import { Utilidades } from './utilades/utilidades';
import Perfil from './paginas/Perfil';
import MenuConsultaPaciente from './consultaPaciente/MenuConsultaPaciente';
import packageJson from '../../../../../package.json';
import MenuMedicos from './medicos/MenuMedicos';

export default function administracionMenu() {
  return (
    <React.Fragment>
      <div className='col-md-10 small text-center mt-2'>
        clinica suyanet Versión: {packageJson.version}
      </div>
      <div className='sidenav-menu-heading'>Administración</div>
      <Seguridad />
      {/* Sidenav Accordion (Components)*/}
      {/* submeno de componentes*/}
      <Componentes />
      {/* Sidenav Accordion (Utilities)*/}
      <Utilidades />
      <Perfil />

      {/* Expediente medico */}
      <MenuConsultaPaciente />

      <MenuMedicos />
    </React.Fragment>
  );
}
