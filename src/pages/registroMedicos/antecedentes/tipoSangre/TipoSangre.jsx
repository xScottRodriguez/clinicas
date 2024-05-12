/** @format */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import FormTipoSangre from './FormTipoSangre';
import { Col, Row } from 'react-bootstrap';
import { LuCigarette } from 'react-icons/lu';
import { BiDrink } from 'react-icons/bi';
import { TipoSangreTabaquismo } from '../../../../components/tipoSangre/TipoSangreTabaquismo';
import { TipoSangreCompatibilidad } from '../../../../components/tipoSangre/TipoSangreCompatibilidad';
import { TipoDrogas } from '../../../../components/tipoSangre/TipoDrogas';
import { LiaNewspaper } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveBloodCompatibility,
  setAlcholismFalse,
  setAlcholismItemActive,
  setAlcholismTrue,
  setClearAlcoholismData,
  setClearSmokerData,
  setDrugsFalse,
  setDrugsTrue,
  setPatientState,
  setSmokItemActive,
  setSmookerFalse,
  setSmookerTrue,
  setdrugsItemActive,
} from '../../../../store/slices/antecedentes';
import { PiSyringeLight, PiTestTube } from 'react-icons/pi';
import { useGetNoPathologicalDiseaseForFileQuery } from '../../../../services/rtk-query/clinicalApi';
import { mapNoPathologicalDiseases, simulateButtonClick } from './utils/utils';
import { BLOOD_TYPES } from '../../../../constants';
import { useParams } from 'react-router-dom';
import { TipoAlcolismo } from '../../../../components/tipoSangre/TipoAlcolismo';
import { NotasTipoAlimentacion } from '../../../../components/tipoSangre/NotasTipoAlimentacion';
import { NotasHabitos } from './NotasHabitos';
import { NotasActividadFisica } from './NotasActividadFisica';
import { NotasExposicionToxicos } from './NotasExposicionToxicos';
import { NotasHabitacion } from './NotasTipoHabitacionHacinamiento';
const INGIERE_ALCOHOL = 3;
const CONSUME_DROGAS = 2;

export default function TipoSangre() {
  const { id = null } = useParams();
  const { isError, isLoading, data, isSuccess } =
    useGetNoPathologicalDiseaseForFileQuery(id);
  const { noPatologicos } = useSelector((state) => state.antecedente);
  const [bloodCompatibility, setBloodCompatibility] = useState([]);
  const [bloodVias, setBloodVias] = useState(null);
  const [bloodBag, setBloodBag] = useState(null);
  const [centerVia, setCenterVia] = useState(null);
  const [bloodTypes, setBloodTypes] = useState(null);
  const [lastCalled, setLastCalled] = useState(null);
  const [compatibilityWith, setCompatibilityWith] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoaded && noPatologicos.activeBlood) {
      setCompatibilityWith(noPatologicos?.activeBlood);
      if (noPatologicos?.activeBlood === 'Ninguno')
        return setBloodCompatibility(['ninguno']);
      setBloodCompatibility(BLOOD_TYPES[noPatologicos.activeBlood]);
      setIsLoaded(true);
    }
  }, [isLoaded, noPatologicos?.activeBlood]);

  useEffect(() => {
    if (!isError && !isLoading && isSuccess) {
      if (data.length) {
        const newData = mapNoPathologicalDiseases(data?.[0]);
        simulateButtonClick({
          donor: newData.activeBlood,
          bloodTypes,
          bloodVias,
          bloodBag,
          centerVia,
          setBloodCompatibility,
          timeout,
        });
        dispatch(setPatientState(newData));
      }
    }
  }, [isError, isLoading, data, dispatch, isSuccess]);

  useEffect(() => {
    const bloodVias = document.querySelectorAll('#humans .human .blood_via');
    const bloodBag = document.querySelector('#blood_content > div.main_bag > div');
    const centerVia = document.querySelector('.center_via > .blood_via');
    const bloodTypes = document.querySelectorAll('.blood_type');

    setBloodVias(bloodVias);
    setBloodBag(bloodBag);
    setCenterVia(centerVia);
    setBloodTypes(bloodTypes);
  }, []);

  function reset() {
    change();

    if (bloodBag) bloodBag.style.height = '100px';
    if (centerVia) centerVia.style.height = '0px';
  }

  function change() {
    if (lastCalled) {
      lastCalled.target.classList.remove('highlight');
    }

    if (bloodVias) {
      for (let i = 0; i < bloodVias.length; i++) {
        bloodVias[i].style.width = '0px';
      }
    }

    if (bloodTypes) {
      for (let i = 0; i < bloodTypes.length; i++) {
        bloodTypes[i].classList.remove('highlightText');
      }
    }
  }

  function callIfChildren(e) {
    if (e.target.textContent.toLowerCase() === 'Ninguno'.toLowerCase()) {
      setBloodCompatibility(['ninguno']);
      setCompatibilityWith(' ' + e.target.textContent);
      dispatch(setActiveBloodCompatibility(e.target.textContent));
      return reset();
    }

    if (lastCalled) {
      change();
    }

    setCompatibilityWith(e.target.textContent);
    dispatch(setActiveBloodCompatibility(e.target.textContent));

    setLastCalled(e);
    setRecipents(e);
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function setRecipents(e) {
    e.target.classList.add('highlight');
    setLastCalled(e);

    const donor = e.target.innerText;
    const newCompatibility = [];
    for (let item of BLOOD_TYPES[donor]) {
      const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
      const height = 50 + 50 * Math.floor(recipent_index / 2);
      const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
      if (bloodBag) bloodBag.style.height = `${blood_height}px`;
      if (centerVia) centerVia.style.height = `${height}px`;
      await timeout(100);
      if (bloodVias) bloodVias[recipent_index].style.width = '100%';
      if (bloodTypes) bloodTypes[recipent_index].classList.add('highlightText');
      if (bloodTypes) newCompatibility.push(bloodTypes[recipent_index].textContent);
    }
    setBloodCompatibility(newCompatibility);
  }

  const toggleFormTabaquismo = (item) => {
    if ([2, 3].includes(item)) {
      dispatch(setSmokItemActive(item));

      return dispatch(setSmookerTrue());
    }

    dispatch(setSmokItemActive(null));
    dispatch(setSmookerFalse());
    dispatch(setClearSmokerData());
  };
  const toggleFormAlcolismo = (item) => {
    dispatch(setAlcholismItemActive(item));
    if (item === INGIERE_ALCOHOL) {
      return dispatch(setAlcholismTrue());
    }
    dispatch(setAlcholismFalse());
    dispatch(setClearAlcoholismData());
  };
  const toggleFormToxinas = (item) => {
    if (item === CONSUME_DROGAS) {
      dispatch(setdrugsItemActive(item));
      return dispatch(setDrugsTrue());
    }
    dispatch(setdrugsItemActive(null));
    dispatch(setDrugsFalse());
  };
  return (
    <div className='tab-content' id='v-pills-1-3-tabContent' style={{}}>
      <div
        className='tab-panel fade show active  py-5'
        id='v-pills-1-0'
        role='tabpanel'
        aria-labelledby='v-pills-1-0-tab'
      >
        <h4 className='lh-base '>
          <PiTestTube size={24} /> No Patológicos
          <p className='text-muted fw-normal small mb-0'>
            Se indagan los datos del paciente relacionados con su medio (vivienda,
            ambiente familiar) así como sus hábitos (alimentación, intolerancia
            alimenticia, higiene, apetito, catarsis intestinal, diuresis, sueño,
            bebidas Alcohólicas,transfusiones., tabaco, droga, medicamentos, hábitos
            sexuales, actividad física) con la finalidad de obtener los probables
            factores de lo que desencadena la patología actual.
          </p>
        </h4>
      </div>
      <Row className='my-3'>
        <Col md={12} className='my-3'>
          <TipoSangreCompatibilidad
            bloodCompatibility={bloodCompatibility}
            compatibilityWith={compatibilityWith}
          />
          <Col md={12} className='my-3'>
            <p className='mb-2'>Seleccione un tipo de sangre:</p>
            <FormTipoSangre seleccionar={callIfChildren} tipoSangre={BLOOD_TYPES} />
          </Col>
        </Col>

        <Col md='12' className='my-3'>
          <h4>
            <LuCigarette /> Tabáquismo
          </h4>
          <p className='text-secondary'>Persona fuma regularmente</p>

          <TipoSangreTabaquismo toggleForm={toggleFormTabaquismo} />
        </Col>
        <Col md='12' className='my-3'>
          <h4>
            <BiDrink /> Alcolismo
          </h4>
          <p className='text-secondary'>
            Abstinente total, persona que refiere que nunca ha bebido alcohol
          </p>
          <TipoAlcolismo toggleForm={toggleFormAlcolismo} />
        </Col>
        <Col md='12' className='my-3'>
          <h4>
            <PiSyringeLight /> Toxicomanías (Drogas)
          </h4>
          <p className='text-secondary'>
            Abstinente total, persona que no consume drogas
          </p>
          <TipoDrogas toggleForm={toggleFormToxinas} />
        </Col>

        <Col md='12' className='my-3'>
          <h5>
            <LiaNewspaper size={30} /> Otros Antecedentes Personales No Patológicos:
          </h5>
          <p className='text-secondary'>
            Información adicional sobre antecendes no patológicos
          </p>
        </Col>
        <Col md='12' className='my-3'>
          <NotasTipoAlimentacion />
        </Col>
        <Col md='12' className='my-3'>
          <NotasHabitacion />
        </Col>
        <Col md='12' className='my-3'>
          <NotasHabitos />
        </Col>
        <Col md='12' className='my-3'>
          <NotasActividadFisica />
        </Col>
        <Col md='12' className='my-3'>
          <NotasExposicionToxicos />
        </Col>
      </Row>
    </div>
  );
}
