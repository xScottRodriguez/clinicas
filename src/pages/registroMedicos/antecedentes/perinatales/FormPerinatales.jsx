/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import React, { useEffect, useState } from 'react';
import DatosGenerales from './DatosGenerales';
import DatosPerimetros from './DatosPerimetros';
import PuntajePagar from './PuntajePagar';
import Silverman from './Silverman-Anderson';
import TipoParto from './TipoDeParto';
import TestCapurro from './TestCapurro';
import PuntajeBallard from './PuntajeBallard';
import Complicaciones from './Complicaciones';
import { LiaBabyCarriageSolid } from 'react-icons/lia';
import { Button } from 'react-bootstrap';
import { BsSave2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toastAdapter } from '../../../../plugins';
import {
  useGetPregnancyHistoryForFileQuery,
  useSavePerinatalDataMutation,
} from '../../../../services/rtk-query';
import {
  anyGreaterThanZero,
  mapToLoadPerinatales,
  mapToSavePerinatales,
} from './utils';
import { loadDataFromServerPerinatales } from '../../../../store/slices/antecedentes';
import { useParams } from 'react-router-dom';

const FormPerinatales = () => {
  const { id = null } = useParams();
  const [savePerinatalData] = useSavePerinatalDataMutation();

  const { isSuccess, data } = useGetPregnancyHistoryForFileQuery(id);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(false);
  const [estado, setEstado] = useState(false);
  const [isSilvermanActive, setIsSilvermanActive] = useState(false);
  const [isCapurroActive, setIsCapurroActive] = useState(false);
  const [isBallarActive, setIsBallarActive] = useState(false);
  const { perinatales } = useSelector((state) => state.antecedente);
  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    if (isSuccess && data) {
      if (!data.length) return;

      const payload = mapToLoadPerinatales(data[0]);
      setTempData(payload.complicaciones);
      dispatch(loadDataFromServerPerinatales(payload));
      const {
        tableApgar,
        tableBallar,
        tableCapurro,
        tableSilverman,
        puntajeApgar,
        puntajeBallar,
        puntajeCapurro,
        puntajeSilverman,
      } = payload;

      validationConditionalRendering({
        apgar: tableApgar,
        capurro: tableCapurro,
        ballard: tableBallar,
        silverman: tableSilverman,
        puntajeApgar,
        puntajeBallar,
        puntajeCapurro,
        puntajeSilverman,
      });
    }
  }, [data, isSuccess, dispatch]);

  const validationConditionalRendering = ({
    apgar,
    capurro,
    ballard,
    silverman,
    puntajeApgar,
    puntajeBallar,
    puntajeCapurro,
    puntajeSilverman,
  }) => {
    const {
      apgarHeartRate,
      apgarLungMaturity,
      apgarMuscleMovement,
      apgarReflexes,
      apgarSkinColor,
    } = apgar;
    const {
      capurroBreastGland,
      capurroEar,
      capurroNipple,
      capurroPlantarFoldes,
      capurroSkin,
    } = capurro;
    const { ballardLanugo, ballardPlanta, ballardSkin } = ballard;

    const {
      silvermanGrunt,
      silvermanLowerChestRetractions,
      silvermanNasalDilatation,
      silvermanUpperChestRetractions,
      silvermanXiphoidRetraction,
    } = silverman;

    const isValidateApgar =
      anyGreaterThanZero(
        +apgarHeartRate,
        +apgarLungMaturity,
        +apgarMuscleMovement,
        +apgarReflexes,
        +apgarSkinColor
      ) && +puntajeApgar > 0;

    const isValidCapurro =
      anyGreaterThanZero(
        +capurroBreastGland,
        +capurroEar,
        +capurroNipple,
        +capurroPlantarFoldes,
        +capurroSkin
      ) && +puntajeCapurro > 0;

    const isValidBallar =
      anyGreaterThanZero(+ballardLanugo, +ballardPlanta, +ballardSkin) &&
      +puntajeBallar > 0;

    const isValidSilverman =
      anyGreaterThanZero(
        +silvermanGrunt,
        +silvermanLowerChestRetractions,
        +silvermanNasalDilatation,
        +silvermanUpperChestRetractions,
        +silvermanXiphoidRetraction
      ) && +puntajeSilverman > 0;

    if (!isValidateApgar) {
      handleOcultarAbrir();
    }

    if (!isValidCapurro) {
      toggleCapurroActive();
    }
    if (!isValidBallar) {
      toggleBallarActive();
    }

    if (!isValidSilverman) {
      toggleSilverman();
    }
  };

  const handleOcultarAbrir = () => {
    setEstado(!estado);
  };
  const toggleSilverman = () => {
    setIsSilvermanActive(!isSilvermanActive);
  };

  const toggleCapurroActive = () => {
    setIsCapurroActive(!isCapurroActive);
  };
  const toggleBallarActive = () => {
    setIsBallarActive(!isBallarActive);
  };
  const handleSavePerinatales = () => {
    const payload = mapToSavePerinatales(perinatales, id);
    setIsDisable(true);
    toastAdapter
      .promise({
        promise: savePerinatalData(payload).unwrap(),
        errorMessage: 'Error al guardar los datos perinatales',
        successMessage: 'Datos perinatales guardados correctamente',
      })
      .finally(() => setIsDisable(false));
  };

  return (
    <div className='tab-content ' id='v-pills-1-tabContent'>
      <div
        className='tab-pane fade show active'
        id='v-pills-1-5'
        role='tabpanel'
        aria-labelledby='v-pills-1-0-tab'
      >
        <h4 className='mb-3'>
          <LiaBabyCarriageSolid size={30} /> Datos Generales
          <p className='text-muted fw-normal small mb-0'>
            Estan incluyen características del trabajo de parto, duración del
            trabajo de parto, semanas de gestación, dónde fue atendida, como fue
            obtenido el producto, hubo complicaciones durante la extracción, se
            utilizó fórceps, características del líquido amniótico y de la placenta.
          </p>
        </h4>
        {/* Formulario para los datos generales  */}
        <DatosGenerales />
        {/* Formulario tipo de parto */}
        <TipoParto />
        {/*Formulario datos perimetros */}
        <DatosPerimetros />
        {/* Formulario de puntuaciones */}
        <PuntajePagar ocultarAbrir={handleOcultarAbrir} estado={estado} />

        {/* Puntuaciones de Silverman-Anderson */}
        <Silverman
          toggleSilverman={toggleSilverman}
          isSilvermanActive={isSilvermanActive}
        />

        {/* tabla  TestCapurro */}
        <TestCapurro
          toggleCapurroActive={toggleCapurroActive}
          isCapurroActive={isCapurroActive}
        />

        {/* Formulario de puntaje ballard */}
        <PuntajeBallard
          toggleBallarActive={toggleBallarActive}
          isBallarActive={isBallarActive}
        />

        <Complicaciones tempData={tempData} />
        <Button
          variant='primary'
          onClick={handleSavePerinatales}
          disabled={isDisable}
        >
          <BsSave2 size={20} /> Guardar{' '}
        </Button>
      </div>
    </div>
  );
};

export default FormPerinatales;
