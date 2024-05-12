import React, { Fragment, useEffect, useState } from 'react';
import FormAbdomen from './abdomen/FormAbdomen';
import CabezaForm from './cabeza/CabezaForm';
import FormColumna from './columna/FormColumna';
import FormCuello from './cuello/FormCuello';
import FormExtremidad from './extremidad/FormExtremidad';
import FormGenitales from './genitales/FormGenitales';
import FormGinicologia from './ginecologia/FormGinecologia';
import FormExterios from './habitudExterios/FormExterios';
import FormNeurologia from './neurologia/formNeuroLogia';
import FormOjos from './ojos/FormOjos';
import FormOto from './otorrinoaringologia/FormOtorrino';
import HabitudExterios from './PanelHabtiud';
import FormSignosVitales from './signosVitales/FormSignosVitales';
import FormTorax from './torax/FormTorax';
import { Button } from 'react-bootstrap';
import { BsSave2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { formattPayload } from './utils';
import {
  clinicalApi,
  useGetGinecologicalForFileQuery,
  useSaveFisicalExplorationMutation,
} from '../../../services/rtk-query';
import { toastAdapter } from '../../../plugins';
import {
  setAbdomen,
  setCabeza,
  setColumnaVertebral,
  setCuello,
  setExploracionGinecologica,
  setExploracionNeurologica,
  setExtremidades,
  setGenitales,
  setHabitusExterior,
  setOjos,
  setOtorrinoLarigologia,
  setTorax,
} from '../../../store/slices/exploracionFisica';
import { useParams } from 'react-router-dom';
export default function FormPrincipalExterior() {
  const { id = null, consultaId } = useParams();
  useGetGinecologicalForFileQuery(consultaId);
  const {
    data: fisicalExplorationData,
    isSuccess,
    isFetching,
  } = clinicalApi.endpoints.getFisicalExplorationForFile.useQueryState(consultaId);
  const dispatch = useDispatch();

  const [saveFisicalExploration] = useSaveFisicalExplorationMutation();
  const data = useSelector((state) => state.exploracionFisica);
  const [exploracion, setExploracion] = useState({
    signosVitales: true,
    habititudesExterios: false,
    cabeza: false,
    ojos: false,
    otorrinolaringologia: false,
    cuello: false,
    torax: false,
    abdomen: false,
    ginecologa: false,
    genitales: false,
    columna: false,
    extremidades: false,
    neurologica: false,
  });

  useEffect(() => {
    if (!isFetching && isSuccess && fisicalExplorationData?.length) {
      const [info] = fisicalExplorationData;
      if (!info) return;
      const {
        habitusExteriores,
        cabeza,
        ojos,
        otorrinologia,
        cuello,
        torax,
        abdomen,
        exploracionGinecologica,
        genitales,
        columnaVertebral,
        extremidades,
        exploracionNeurologica,
      } = info;

      dispatch(setHabitusExterior(habitusExteriores));
      dispatch(dispatch(setCabeza(cabeza)));
      dispatch(setOjos(ojos));
      dispatch(setOtorrinoLarigologia(otorrinologia));
      dispatch(setCuello(cuello));
      dispatch(setTorax(torax));
      dispatch(setAbdomen(abdomen));
      dispatch(setExploracionGinecologica(exploracionGinecologica));
      dispatch(setGenitales(genitales));
      dispatch(setColumnaVertebral(columnaVertebral));
      dispatch(setExtremidades(extremidades));
      dispatch(setExploracionNeurologica(exploracionNeurologica));
    }
  }, [dispatch, fisicalExplorationData, isFetching, isSuccess]);

  function habititud() {
    setExploracion({
      habititudesExterios: true,
      signosVitales: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  }

  const handleCabeza = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: true,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleOjos = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: true,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleOto = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: true,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleCuellos = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: true,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleTorax = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: true,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleAbdomen = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: true,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleGinicologia = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: true,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleGenitales = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: true,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleColumna = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: true,
      extremidades: false,
      neurologica: false,
    });
  };
  const handleExtremidades = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: true,
      neurologica: false,
    });
  };
  const handleNeurologia = () => {
    setExploracion({
      signosVitales: false,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: true,
    });
  };
  const handleSignosVitales = () => {
    setExploracion({
      signosVitales: true,
      habititudesExterios: false,
      cabeza: false,
      ojos: false,
      otorrinolaringologia: false,
      cuello: false,
      torax: false,
      abdomen: false,
      ginecologa: false,
      genitales: false,
      columna: false,
      extremidades: false,
      neurologica: false,
    });
  };

  const handleSavephysicalExamination = () => {
    const payload = formattPayload(data);

    toastAdapter.promise({
      promise: saveFisicalExploration({
        ...payload,
        expedienteId: id,
        consultaId: +consultaId,
      }).unwrap(),
      successMessage: 'Datos de exploracion fisica guardados correctamente',
      errorMessage: 'Error al guardar los datos de exploracion fisica',
      loadingMessage: 'Guardando datos de exploracion fisica',
    });
  };
  return (
    <Fragment>
      <div>
        <HabitudExterios
          ojo={handleOjos}
          cabeza={handleCabeza}
          exterior={habititud}
          otorrino={handleOto}
          cuello={handleCuellos}
          torax={handleTorax}
          abdomen={handleAbdomen}
          ginecologia={handleGinicologia}
          genitales={handleGenitales}
          columna={handleColumna}
          extremidades={handleExtremidades}
          neurologica={handleNeurologia}
          signosVitales={handleSignosVitales}
        >
          {exploracion.signosVitales ? (
            <FormSignosVitales />
          ) : exploracion.habititudesExterios ? (
            <FormExterios />
          ) : exploracion.cabeza ? (
            <CabezaForm />
          ) : exploracion.ojos ? (
            <FormOjos />
          ) : exploracion.otorrinolaringologia ? (
            <FormOto />
          ) : exploracion.cuello ? (
            <FormCuello />
          ) : exploracion.torax ? (
            <FormTorax />
          ) : exploracion.abdomen ? (
            <FormAbdomen />
          ) : exploracion.ginecologa ? (
            <FormGinicologia />
          ) : exploracion.genitales ? (
            <FormGenitales />
          ) : exploracion.columna ? (
            <FormColumna />
          ) : exploracion.extremidades ? (
            <FormExtremidad />
          ) : exploracion.neurologica ? (
            <FormNeurologia />
          ) : null}
        </HabitudExterios>
        <Button
          variant='primary'
          size='lg'
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            margin: '1rem',
          }}
          onClick={handleSavephysicalExamination}
        >
          <BsSave2 />
          Guardar
        </Button>
      </div>
    </Fragment>
  );
}
