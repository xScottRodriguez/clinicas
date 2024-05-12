/** @format */

import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import LayoutForm from '../../../containers/layouts/LayoutForm';
import { PersonasDatosNaci } from './PersonasDatosNaci';
import { PersonasDatosPersonales } from './PersonasDatosPersonales';
import { PersonasResidencia } from './PersonasResidencia';
import axios from '../../../services/peticionesAxios';
import headers from '../../../services/AxiosCabeceras';
import { PersonaContactos } from './PersonaContactos';
import CalcularEdad from '../../../controller/CalcularEdad';
import Responsable from './Responsable';
import Cliente from './Cliente';
import Alertas from '../../../services/Alertas';
import Document from '../../../helpers/Document';
import Extension from '.././../../services/Extension';

export const PersonasForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const imagenDefault =
    process.env.PUBLIC_URL + '/assets/img/illustrations/profiles/profile-1.png';

  /** llamados a api en general */

  /**declaramos hook para validar en front y enviar datos */
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /** declaramos los state necesarios para los distintos formularios */
  const [persona, setPersona] = useState({
    nombreCompleto: '',
    primerNombre: '',
    primerApellido: '',
    fechaNacimiento: '',
    telefonoPrincipal: '',
    telefonoCasa: '',
    telefonoAdicional: '',
    dui: '',
    responsable: '',
    parentesco: '',
    tieneWhatsapp: false,
    celular: '',
    sexo: '',
    estadoCivil: '',
    idTipoDocumentoIdentidad: { label: 'DUI', value: 1 },
    paisResidencia: { label: 'EL SALVAODR', value: 61 },
    departamentoResidencia: { label: 'SAN MIGUEL', value: 12 },
    ciudadResidencia: { label: 'SAN MIGUEL', value: 199 },
    cantonResidencia: { label: 'NO CANTON', value: 870 },
    direccionPersona: '',
    direccion: '',
    lugarTrabajo: '',
    direccionTrabajo: '',
    profesion: '',
    telefonoTrabajo: '',
    razonSocial: '',
    gruposCliente: '',
    gruposPersona: '',
    tipoCliente: '',
    sucursal: '',
    email: '',
    nrc: '',
    nit: '',
    giro: '',
    paisNacimiento: { label: 'EL SALVAODR', value: 61 },
    departamentoNacimiento: { label: 'SAN MIGUEL', value: 12 },
    ciudadNacimiento: { label: 'SAN MIGUEL', value: 199 },
    cantonNacimiento: { label: 'NO CANTON', value: 870 },
    direccionDomicilio1: '',
    direccionDomicilio2: '',
    codigo: 69,
    imagen: null,
  });

  const [selectedFile, setSelectedFiles] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (id) {
      loadPersonas(id);
    }
    apiSexo();
    apiEstadoCivil();
    apiDocumentoIdentidad();
    apiPersonaResponsable();
    apiPaises();
    apiDepartamentos();
    apiProfesion();
    apiGrupos();
    apiMunicipios();
    apiCanton();
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is un

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const [estado, setEstado] = useState([]);
  const [sexo, setSexo] = useState([]);
  const [dui, setDui] = useState([]);
  const [personaResponsable, setPersonaResponsable] = useState([]);
  const [updateFoto, setUpdateFoto] = useState(false);

  /**datos que reside la persona */
  const [apiPais, setApiPais] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [canton, setCanton] = useState([]);
  /** fin datos que reside la persona */

  const [profesion, setProfesion] = useState([]);
  const [grupoPersonas, setGruposPersonas] = useState([]);
  const [grupoCliente, setGruposCliente] = useState([]);
  const [naturalezaPersonas, setNaturalezaPersona] = useState([]);
  const [sucursal, setSucursal] = useState([]);

  const [errorDui, setErrorDui] = useState(false);

  /**Aqui comenzamos a llamar las apis necesarias */
  const apiEstadoCivil = async () => {
    try {
      const civil = await axios.find('/generales/estado-civil', {
        headers: headers.getHeader(),
      });
      const data = civil.data;
      const opciones = data?.map((civil) => ({
        value: civil.id,
        label: civil.value,
      }));
      setEstado(opciones);
    } catch (error) {
      return error;
    }
  };

  const apiDocumentoIdentidad = async () => {
    try {
      const dui = await axios.find('/generales/documentos-identidad', {
        header: headers.getHeader(),
      });

      const result = dui.data?.map((documento) => ({
        value: documento.id,
        label: documento.value,
      }));
      setDui(result);
    } catch (error) {
      return error;
    }
  };

  const apiSexo = async () => {
    try {
      const sexo = await axios.find('/generales/sexo', {
        header: headers.getHeader(),
      });
      const result = sexo.data?.map((genero) => ({
        value: genero.id,
        label: genero.value,
      }));
      setSexo(result);
    } catch (error) {
      return error;
    }
  };

  const apiPersonaResponsable = async () => {
    try {
      const responsable = await axios.find('/generales/parentesco', {
        header: headers.getHeader(),
      });
      const result = responsable.data?.map((persona) => ({
        value: persona.id,
        label: persona.value,
      }));
      setPersonaResponsable(result);
    } catch (error) {
      return error;
    }
  };

  const apiPaises = async () => {
    try {
      const pais = await axios.find('/generales/paises', {
        header: headers.getHeader(),
      });
      const result = pais.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setApiPais(result);
      return persona;
    } catch (error) {
      return error;
    }
  };

  const apiDepartamentos = async (value) => {
    try {
      const departamento = await axios.find(
        `/generales/departamentos?paisId=${value ? value : 61}`,
        {
          header: headers.getHeader(),
        }
      );
      const result = departamento.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));

      setDepartamentos(result);
    } catch (error) {
      return error;
    }
  };

  const apiMunicipios = async (value) => {
    try {
      const municipio = await axios.find(
        `/generales/ciudades?departamentoId=${value ? value : 12}`,
        {
          header: headers.getHeader(),
        }
      );
      const result = municipio.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setMunicipios(result);
    } catch (error) {
      return error;
    }
  };

  const apiCanton = async (value) => {
    try {
      const canton = await axios.find(
        `/generales/cantones?ciudadId=${value ? value : 199}`,
        {
          header: headers.getHeader(),
        }
      );
      const result = canton.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setCanton(result);
    } catch (error) {
      return error;
    }
  };

  const apiProfesion = async () => {
    try {
      const profesion = await axios.find('/generales/profesion', {
        header: headers.getHeader(),
      });
      const result = profesion.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setProfesion(result);
    } catch (error) {
      return error;
    }
  };

  const apiGrupos = async () => {
    try {
      const [grupoPersona, grupoCliente, tipoCliente, sucursales] =
        await Promise.all([
          axios.find('/generales/grupo-personas', {
            header: headers.getHeader(),
          }),
          axios.find('/generales/grupo-clientes', {
            header: headers.getHeader(),
          }),
          axios.find('/generales/naturaleza-personas', {
            header: headers.getHeader(),
          }),
          axios.find('/generales/sucursales', {
            header: headers.getHeader(),
          }),
        ]);

      const personas = grupoPersona.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setGruposPersonas(personas);

      const clientes = grupoCliente.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setGruposCliente(clientes);

      const naturaleza = tipoCliente.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setNaturalezaPersona(naturaleza);

      const sucursal = sucursales.data?.map((data) => ({
        value: data.id,
        label: data.value,
      }));
      setSucursal(sucursal);
    } catch (error) {
      return error;
    }
  };

  const loadPersonas = async (id) => {
    try {
      const persona = await axios.find(`/personas/${id}`, {
        header: headers.getHeader(),
      });
      setPersona(persona.data);
      setValue('nombreCompleto', persona.data.nombreCompleto);
      setValue('primerNombre', persona.data.primerNombre);
      setValue('primerApellido', persona.data.primerApellido);
      setValue('fechaNacimiento', persona.data.fechaNacimiento);
      setValue('giro', persona.data.giro);
      setValue('direccion', persona.data.direccion);
      setValue('telefonoPrincipal', persona.data.telefono);
      setValue('tieneWhatsapp', persona.data.tieneWhatsapp);
      setValue('telefonoCasa', persona.data.telefonoCasa);
      setValue('telefonoTrabajo', persona.data.telefonoTrabajo);
      setValue('telefonoAdicional', persona.data.telefonoAdicional);
      setValue('email', persona.data.email);
      setValue('dui', persona.data.dui);
      setValue('direccionDomicilio1', persona.data.direccionDomicilio1);
      setValue('direccionDomicilio2', persona.data.direccionDomicilio2);
      setValue('profesion', persona.data.profesion);
      setValue('lugarTrabajo', persona.data.lugarTrabajo);
      setValue('direccionTrabajo', persona.data.direccionTrabajo);
      setValue('nit', persona.data.nit);
      setValue('responsable', persona.data.responsable);
      setValue('razonSocial', persona.data.razonSocial);
      setValue('nrc', persona.data.nrc);
      setValue('gruposPersona', persona.data.gruposPersona);
      setValue('gruposCliente', persona.data.gruposCliente);
      setValue('sexo', persona.data.sexo?.sexo);
      setValue('parentesco', persona.data.parentesco?.parentesco);
      setValue('estadoCivil', persona.data.estadoCivil?.estadoCivil);
      setValue('cantonNacimiento', persona.data.nacionalidad?.cantonNacimiento);
      setValue('paisNacimiento', persona.data.nacionalidad?.paisNacimiento);
      setValue('ciudadNacimiento', persona.data.ciudadNacimiento?.ciudadNacimiento);

      setValue(
        'departamentoNacimiento',
        persona.data.nacionalidad?.departamentoNacimiento
      );
      setValue('tipoCliente', persona.data.tipoCliente?.tipoCliente);
      setValue('gruposPersona', persona.data.gruposPersona?.tipoCliente);
      setValue('gruposCliente', persona.data.gruposCliente?.gruposCliente);
      setValue('sucursal', persona.data.sucursal?.sucursal);
      setValue(
        'tipoDocumentoIdentidad',
        persona.data.tipoDocumentoIdentidad?.tipoDocumentoIdentidad
      );
      setValue('paisResidencia', persona.data.paisResidencia?.paisResidencia);
      setValue(
        'departamentoResidencia',
        persona.data.departamentoResidencia?.departamentoResidencia
      );
      setValue('ciudadResidencia', persona.data.ciudadResidencia?.ciudadResidencia);
      setValue('cantonResidencia', persona.data.cantonResidencia?.cantonResidencia);
    } catch (error) {
      return error;
    }
  };

  /**Fin de llamado de apis */

  /** Declaramos los eventos de cada componente del formulario */
  const handleChangesPersona = (e) => {
    setPersona({
      ...persona,
      [e.target.id]: e.target.value,
    });
  };

  const handlePais = (value) => {
    setPersona({ ...persona, paisResidencia: value });
    apiDepartamentos(value.value);
  };

  const handleDepartamento = (value) => {
    setPersona({ ...persona, departamentoResidencia: value });
    apiMunicipios(value.value);
  };

  const handleMunicipio = (value) => {
    setPersona({ ...persona, ciudadResidencia: value });
    apiCanton(value.value);
  };

  const handleCanton = (value) => {
    setPersona({ ...persona, cantonResidencia: value });
  };

  const onChangesNacePais = (value) => {
    setPersona({ ...persona, paisNacimiento: value });
    apiDepartamentos(persona.paisNacimiento.value);
  };

  const onChangesNaceDepartamento = (value) => {
    setPersona({ ...persona, departamentoNacimiento: value });
    apiMunicipios(value.value);
  };

  const onChangesNaceMunicipio = (value) => {
    setPersona({ ...persona, ciudadNacimiento: value });
    apiCanton(value.value);
  };

  const onChangesNaceCanton = (value) => {
    setPersona({ ...persona, cantonNacimiento: value });
  };

  /** fin de comportamientos  */

  const onSubmit = async (personas) => {
    if (id && updateFoto) {
      const formData = new FormData();
      Alertas.loading_reload(true, 'Guardando persona');
      formData.append('imagen', selectedFile);
      axios.PATCH(`personas/update/imagen/${id}`, formData).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 200) {
            Alertas.alertEmpty(
              'Foto actualizada con éxito!',
              'Administración de Suyanet',
              'success'
            );
            return navigate('/persona');
          } else {
            Alertas.alertEmpty(
              '!Error al guardar el usuario!',
              'Este usuatuio ya existe',
              'info'
            );
          }
        }
      });
    } else if (id) {
      const data = {
        codigo: 1,
        idGrupo: persona.gruposPersona.value,
        nombreGrupo: persona.gruposPersona.label,
        idGrupoCliente: persona.gruposCliente.value,
        nombreGrupoCliente: persona.gruposCliente.label,
        primerNombre: persona.primerNombre,
        primerApellido: persona.primerApellido,
        nombreCompleto: persona.primerNombre + ' ' + persona.primerApellido,
        razonSocial: persona.razonSocial,
        giro: persona.giro,
        nrc: persona.nrc,
        direccion: persona.direccion,
        telefonoPrincipal: persona.telefonoPrincipal,
        tieneWhatsapp: persona.tieneWhatsapp,
        idTipoCliente: persona.tipoCliente.value,
        dui: persona.dui,
        idSexo: persona.sexo.value,
        idEstadoCivil: persona.estadoCivil.value,
        fechaNacimiento: persona.fechaNacimiento,
        departamentoNacimiento: persona.departamentoNacimiento.value,
        ciudadNacimiento: persona.ciudadNacimiento.value,
        cantonNacimiento: persona.cantonNacimiento.value,
        paisNacimiento: persona.paisResidencia.value,
        idTipoDocumentoIdentidad: persona.idTipoDocumentoIdentidad,
        telefonoCasa: persona.telefonoCasa,
        telefonoTrabajo: persona.telefonoTrabajo,
        telefonoAdicional: persona.telefonoAdicional,
        email: persona.email,
        profesion: persona.profesion,
        lugarTrabajo: persona.lugarTrabajo,
        direccionTrabajo: persona.direccionTrabajo,
        nit: persona.nit,
        departamentoResidencia: persona.departamentoResidencia.value,
        ciudadResidencia: persona.ciudadResidencia.value,
        cantonResidencia: persona.cantonResidencia.value,
        paisResidencia: persona.paisResidencia.value,
        idSucursal: persona.sucursal.value,
        responsable: persona.responsable,
        idParentescoResponsable: persona.parentesco.value,
      };
      Alertas.loading_reload(true, 'Guardando persona');
      axios.update(`personas/${id}`, data).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 200) {
            Alertas.alertEmpty(
              'persona actualizada con éxito!',
              'Administración de Suyanet',
              'success'
            );
            return navigate('/persona');
          }
        } else {
          Alertas.alertEmpty(
            '!Error al actualizar la informacion!',
            'Verfique los datos',
            'error'
          );
        }
      });
    } else if (id || updateFoto) {
      const data = {
        codigo: 1,
        idGrupo: persona.gruposPersona.value,
        nombreGrupo: persona.gruposPersona.label,
        idGrupoCliente: persona.gruposCliente.value,
        nombreGrupoCliente: persona.gruposCliente.label,
        primerNombre: persona.primerNombre,
        primerApellido: persona.primerApellido,
        nombreCompleto: persona.primerNombre + ' ' + persona.primerApellido,
        razonSocial: persona.razonSocial,
        giro: persona.giro,
        nrc: persona.nrc,
        direccion: persona.direccion,
        telefonoPrincipal: persona.telefonoPrincipal,
        tieneWhatsapp: persona.tieneWhatsapp,
        idTipoCliente: persona.tipoCliente.value,
        dui: persona.dui,
        idSexo: persona.sexo.value,
        idEstadoCivil: persona.estadoCivil.value,
        fechaNacimiento: persona.fechaNacimiento,
        departamentoNacimiento: persona.departamentoNacimiento.value,
        ciudadNacimiento: persona.ciudadNacimiento.value,
        cantonNacimiento: persona.cantonNacimiento.value,
        paisNacimiento: persona.paisResidencia.value,
        // numeroDocumento: "12345678-9",
        idTipoDocumentoIdentidad: persona.idTipoDocumentoIdentidad,
        // otroNumeroDocumento: "string",
        direccionDomicilio1: persona.direccionDomicilio1,
        direccionDomicilio2: persona.direccionDomicilio2,
        telefonoCasa: persona.telefonoCasa,
        telefonoTrabajo: persona.telefonoTrabajo,
        telefonoAdicional: persona.telefonoAdicional,
        email: persona.email,
        profesion: persona.profesion,
        lugarTrabajo: persona.lugarTrabajo,
        direccionTrabajo: persona.direccionTrabajo,
        nit: persona.nit,
        departamentoResidencia: persona.departamentoResidencia.value,
        ciudadResidencia: persona.ciudadResidencia.value,
        cantonResidencia: persona.cantonResidencia.value,
        paisResidencia: persona.paisResidencia.value,
        idSucursal: persona.sucursal.value,
        responsable: persona.responsable,
        idParentescoResponsable: persona.parentesco.value,
        // imagen: persona.imagen,
      };
      const formData = new FormData();
      // Alertas.loading_reload(true, "Guardando persona");
      formData.append('imagen', selectedFile);
      await axios.PATCH(`personas/update/imagen/${id}`, formData);
      Alertas.loading_reload(true, 'Guardando persona');
      axios.update(`personas/${id}`, data).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 200) {
            Alertas.alertEmpty(
              'persona actualizada con éxito!',
              'Administración de Suyanet',
              'success'
            );
            return navigate('/persona');
          } else {
            Alertas.alertEmpty(
              '!Error al guardar el usuario!',
              'Este usuatuio ya existe',
              'info'
            );
          }
        }
      });
    } else {
      const data = new FormData();
      data.append('nombreCompleto', persona.primerNombre + ' ' + persona.primerApellido);
      data.append('primerNombre', persona.primerNombre);
      data.append('primerApellido', persona.primerApellido);
      data.append('fechaNacimiento', persona.fechaNacimiento);
      data.append('dui', persona.dui);
      data.append('responsable', persona.responsable);
      data.append('tieneWhatsapp', Number(persona.tieneWhatsapp));
      if (updateFoto) {
        data.append('imagen', persona.imagen, persona.imagen?.name);
      }
      // data.append("imagen", persona.imagen, persona.imagen?.name );
      data.append('telefonoPrincipal', persona.telefonoPrincipal);
      data.append('idSexo', persona.sexo.value);
      data.append('idEstadoCivil', persona.estadoCivil.value);
      data.append(
        'idTipoDocumentoIdentidad',
        persona.idTipoDocumentoIdentidad.value
      );
      data.append('idParentescoResponsable', persona.parentesco.value);
      data.append('telefonoCasa', persona.telefonoCasa);
      data.append('paisResidencia', persona.paisResidencia.value);
      data.append('departamentoResidencia', persona.departamentoResidencia.value);
      data.append('ciudadResidencia', persona.ciudadResidencia.value);
      data.append('cantonResidencia', persona.cantonResidencia?.value);
      data.append('paisNacimiento', persona.paisNacimiento.value);
      data.append('departamentoNacimiento', persona.departamentoNacimiento.value);
      data.append('ciudadNacimiento', persona.ciudadNacimiento.value);
      data.append('cantonNacimiento', persona.cantonNacimiento?.value);
      data.append('idGrupoCliente', persona.gruposCliente.value);
      data.append('nombreGrupoCliente', persona.gruposCliente.label);
      data.append('idGrupo', persona.gruposPersona.value);
      data.append('nombreGrupo', persona.gruposPersona.label);
      data.append('idTipoCliente', persona.tipoCliente.value);
      data.append('codigo', persona.codigo);
      data.append('idSucursal', persona.sucursal.value);
      data.append('razonSocial', persona.razonSocial);
      data.append('giro', persona.giro);
      data.append('nrc', persona.nrc);
      data.append('direccion', persona.direccion);
      data.append('telefonoAdicional', persona.telefonoAdicional);
      data.append('email', persona.email);
      data.append('profesion', persona.profesion);
      data.append('lugarTrabajo', persona.lugarTrabajo);
      data.append('direccionTrabajo', persona.direccionTrabajo);
      data.append('telefonoTrabajo', persona.telefonoTrabajo);
      data.append('direccionDomicilio1', persona.direccionDomicilio1);
      data.append('direccionDomicilio2', persona.direccionDomicilio2);
      data.append('nit', persona.nit);

      Alertas.loading_reload(true, 'Guardando persona');
      axios.POST('personas', data).then((result) => {
        Alertas.loading_reload(false);

        if (result !== false) {
          if (result.status === 201) {
            Alertas.alertEmpty(
              'persona guardado con éxito!',
              'Administración de Suyanet',
              'success'
            );
            navigate('/persona');
          }
        }
      });
    }
  };
  let timer = null;
  const onKeyUpDui = (numeroDui) => {
    clearTimeout(timer);
    setErrorDui(false);
    timer = setTimeout(() => {
      if (persona.dui !== '') {
        if (!Document.dui(String(numeroDui))) {
          setErrorDui(true);
        }
      } else {
        setErrorDui(false);
      }
    }, 500);
  };

  const setSelectedFile = (event) => {
    const name = event.target.files[0].name;
    if (Extension.isImage(name)) {
      setSelectedFiles(undefined);
      setPersona({ ...persona, imagen: event.target.files[0] });
      // setIsSelect(name);
    }
    setSelectedFiles(event.target.files[0]);
    setUpdateFoto(true);
  };

  return (
    <Fragment>
      <LayoutForm
        tools={
          <Link to={'/persona'} className='btn btn-sm btn-light text-primary'>
            <i className='fa fa-arrow-left' />
            Regresar a la lista de personas
          </Link>
        }
        title={'Registro de personas'}
      >
        <div className='row'>
          <div className='col-xl-12'>
            <div className='card mb-4 mb-xl-3'>
              <div className='card-header'>Foto de perfil</div>
              <div className='card-body text-center'>
                {id ? (
                  <img
                    className='img-account-profile rounded-circle mb-2'
                    src={
                      preview
                        ? preview
                        : persona.imagen
                        ? persona.imagen
                        : imagenDefault
                    }
                    alt='profile-1.png'
                  />
                ) : (
                  <img
                    className='img-account-profile rounded-circle mb-5'
                    src={preview ? preview : imagenDefault}
                    alt='profile-1.png'
                  />
                )}

                <div className='small font-italic text-muted mb-4'>
                  JPG o PNG no mayor a 10 MB
                </div>

                <label htmlFor='imagen' className='btn btn-primary'>
                  <i className='fa-solid fa-file-arrow-up'></i> SUBIR IMAGEN
                </label>
                <input
                  id='imagen'
                  type='file'
                  multiple='true'
                  accept='image/*'
                  onChange={setSelectedFile}
                />
              </div>
            </div>
          </div>

          <div className='col-xl-12 mt-7'>
            <div className='card mb-4'>
              <div className='card-header border'>Información Personal</div>
              <div className='card-body '>
                <form>
                  <div className='row gx-3 mb-3'>
                    <div className='border mt-h-75'>
                      <PersonasDatosPersonales
                        onChangesPersonas={handleChangesPersona}
                        estado={estado}
                        genero={sexo}
                        edad={
                          CalcularEdad.calcularEdad(persona.fechaNacimiento) +
                          'Años'
                        }
                        error={errors}
                        register={register}
                        dui={dui}
                        responsable={personaResponsable}
                        personasSet={setPersona}
                        personaState={persona}
                        onChangesNacePais={onChangesNacePais}
                        onChangesDepartamento={onChangesNaceDepartamento}
                        onChangesMunicipio={onChangesNaceMunicipio}
                        onChangesCanton={onChangesNaceCanton}
                        datosPais={apiPais}
                        datosDepartamento={departamentos}
                        datosMunicipio={municipios}
                        datosCanton={canton}
                        onKeyUpDui={onKeyUpDui.bind(this, persona.dui)}
                        errorDui={errorDui}
                      />
                    </div>
                    <div className='card-header border mt-5'>
                      Información de Responsable
                    </div>
                    <div className='border'>
                      <Responsable
                        register={register}
                        errror={errors}
                        onChangesPersonas={handleChangesPersona}
                        responsable={personaResponsable}
                        personasSet={setPersona}
                        personaState={persona}
                      />
                    </div>
                    <div className='card-header border mt-5'>
                      Información de Contacto
                    </div>
                    <div className='border'>
                      <PersonaContactos
                        personasSet={setPersona}
                        persona={persona}
                      />
                    </div>
                    <div className='card-header mt-5  border '>
                      Datos de Residencia
                    </div>
                    <div className='border'>
                      <PersonasResidencia
                        datosPais={apiPais}
                        onChangesPais={handlePais}
                        defaultValues={apiPais[60]}
                        datosDepartamento={departamentos}
                        onChangesDepartamento={handleDepartamento}
                        datosMunicipio={municipios}
                        onChangesMunicipio={handleMunicipio}
                        datosCanton={canton}
                        onChangesCanton={handleCanton}
                        onChangesPersonas={handleChangesPersona}
                        register={register}
                        personasSet={setPersona}
                        personaState={persona}
                      />
                    </div>
                    <div className='card-header border mt-5'>
                      Información Laboral
                    </div>
                    <div className='border'>
                      <PersonasDatosNaci
                        datosProfesion={profesion}
                        onChangesPersonas={handleChangesPersona}
                        personasSet={setPersona}
                        persona={persona}
                        register={register}
                      />
                    </div>
                    <div className='card-header border mt-5'>
                      Información Cliente
                    </div>
                    <div className='border'>
                      <Cliente
                        datosGrupoPersona={grupoPersonas}
                        datosGrupoClientes={grupoCliente}
                        datosNaturalezaCliente={naturalezaPersonas}
                        onChangesPersonas={handleChangesPersona}
                        personasSet={setPersona}
                        persona={persona}
                        register={register}
                        datosSucursal={sucursal}
                      />
                    </div>
                  </div>
                </form>
                <div className='card-footer text-center'>
                  <button
                    className='btn btn-secondary btn-lg mr-2'
                    onClick={() => {
                      navigate('/persona');
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    <i className='fa fa-arrow-circle-left'></i> SALIR
                  </button>
                  <button
                    className='btn btn-primary btn-lg'
                    onClick={handleSubmit(onSubmit)}
                  >
                    <i className='fa fa-save'></i> GUARDAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutForm>
    </Fragment>
  );
};
