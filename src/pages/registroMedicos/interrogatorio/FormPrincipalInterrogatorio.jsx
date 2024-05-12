import React, { useEffect, useState } from 'react';
import AnalisisForm from './analisis/AnalisisForm';
import FormCardio from './cardio/cardioVascular';
import FormDigestivo from './digestivo/FormDigestivo';
import FormEndocrino from './endocrino/FormEndocrino';
import FormEsqueletico from './esqueletico/FormEsqueletico';
import FormGenerales from './generales/FormGenerales';
import FormHemoli from './hemoli/FormHemoli';
import FormMamas from './mamas/FormMamas';
import PanelInterrogatorio from './PanelInterrogatorio';
import FormPriel from './piel/FormPriel';
import FormReproductivo from './reproductivo/FormReproductivo';
import FormRespiratorio from './respiratorio/FormRespiratorio';
import FormNervioso from './sistemaNervioso/FormNervioso';
import FormUrinario from './urinario/FormUrinario';
import {
  clinicalApi,
  useUpdateConsultaMutation,
} from '../../../services/rtk-query';
import { Button } from 'react-bootstrap';
import { BsSave } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { formatData } from './utils';
import { toastAdapter } from '../../../plugins';
import { useParams } from 'react-router-dom';
import { getDataCookie } from '../../../utils';

const FormPrincipalInterrogatorio = () => {
  const { id: expedienteId, consultaId } = useParams();
  const data = useSelector((state) => state.interrogatorio);
  const [updateConsulta] = useUpdateConsultaMutation();
  const { data: consulta } =
    clinicalApi.endpoints.consultaById.useQuery(consultaId);

  const [interrogatorio, setInterrogatorio] = useState({
    cardioVascular: false,
    digestivo: false,
    endocrino: false,
    hemoli: false,
    mamas: false,
    esqueletico: false,
    piel: false,
    Reproductivo: false,
    respiratorio: false,
    nervioso: false,
    generales: false,
    urinario: false,
    analisis: true,
  });

  const cardioVascular = () => {
    setInterrogatorio({
      cardioVascular: true,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };

  const handleDigestivo = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: true,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleEndocrino = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: true,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleHemoli = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: true,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleMamas = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: true,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleEsqueletico = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: true,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handlepiel = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: true,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleReproductivo = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: true,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleRespiratorio = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: true,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleNervioso = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: true,
      generales: false,
      urinario: false,
      analisis: false,
    });
  };
  const handleGenerales = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: true,
      urinario: false,
      analisis: false,
    });
  };
  const handleUrinario = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: true,
      analisis: false,
    });
  };
  const analisis = () => {
    setInterrogatorio({
      cardioVascular: false,
      digestivo: false,
      endocrino: false,
      hemoli: false,
      mamas: false,
      esqueletico: false,
      piel: false,
      Reproductivo: false,
      respiratorio: false,
      nervioso: false,
      generales: false,
      urinario: false,
      analisis: true,
    });
  };

  const handleSave = () => {
    const dataFormatted = formatData(data);
    toastAdapter
      .promise({
        promise: updateConsulta({
          body: {
            ...dataFormatted,
            idExpediente: expedienteId,
          },
          consultaId,
        }).unwrap(),
        loadingMessage: 'Guardando Interrogatorio...',
        successMessage: 'Interrogatorio guardado correctamente',
        errorMessage: 'Error al guardar el interrogatorio',
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <PanelInterrogatorio
        hemoli={handleHemoli}
        mamas={handleMamas}
        esqueletico={handleEsqueletico}
        piel={handlepiel}
        reproductivo={handleReproductivo}
        respiratorio={handleRespiratorio}
        nervioso={handleNervioso}
        generales={handleGenerales}
        urinario={handleUrinario}
        endocrino={handleEndocrino}
        digestivo={handleDigestivo}
        analisis={analisis}
        cardioVascular={cardioVascular}
      >
        {interrogatorio.cardioVascular ? (
          <FormCardio />
        ) : interrogatorio.digestivo ? (
          <FormDigestivo />
        ) : interrogatorio.endocrino ? (
          <FormEndocrino />
        ) : interrogatorio.hemoli ? (
          <FormHemoli />
        ) : interrogatorio.mamas ? (
          <FormMamas />
        ) : interrogatorio.esqueletico ? (
          <FormEsqueletico />
        ) : interrogatorio.piel ? (
          <FormPriel />
        ) : interrogatorio.Reproductivo ? (
          <FormReproductivo />
        ) : interrogatorio.respiratorio ? (
          <FormRespiratorio />
        ) : interrogatorio.nervioso ? (
          <FormNervioso />
        ) : interrogatorio.generales ? (
          <FormGenerales />
        ) : interrogatorio.urinario ? (
          <FormUrinario />
        ) : interrogatorio.analisis ? (
          <AnalisisForm />
        ) : null}
      </PanelInterrogatorio>
      <Button variant='primary' size='lg' onClick={handleSave}>
        <BsSave size={24} className='mr-2' /> Guardar Interrogatorio
      </Button>
    </>
  );
};

export default FormPrincipalInterrogatorio;
