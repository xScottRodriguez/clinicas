/** @format */

import React, { Fragment, useState } from 'react';
import FormGinecológicos from '../Ginecologicos/FormGinecológicos';
import FormPrincipalHereditario from '../hereditarios/FormPrinciaplHer';
import FormPrincipa from '../Obstetricos/FormPrincipa';
import FormPrincipalPatologico from '../patologico/FormPricnipalPatologico';
import FormPerinatales from '../perinatales/FormPerinatales';
import FormTipoSangre from '../tipoSangre/TipoSangre';
import Alergias from './Alergias';
import PanelDiagnostico from './PanelDiagnostico';
import { Button } from 'react-bootstrap';
import { BsSave2 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useSaveNoPathologicalDiseasesMutation } from '../../../../services/rtk-query';
import { toastAdapter } from '../../../../plugins';
import { useParams } from 'react-router-dom';

export default function FormAlergias() {
  const { id = null } = useParams();
  const [isDisable, setIsDisable] = useState(false);
  const [alergias, setAlergias] = useState({
    alergias: true,
    noPatologico: false,
    ginecologicos: false,
    obstericos: false,
    patologico: false,
    heredidatorio: false,
    perenitales: false,
  });
  const { noPatologicos: payloadNoPatologico } = useSelector(
    (state) => state.antecedente
  );
  const [saveNoPathologicalDiseases] = useSaveNoPathologicalDiseasesMutation();

  function noPatologico() {
    setAlergias({
      noPatologico: true,
      alergias: false,
      obstericos: false,
      patologico: false,
      heredidatorio: false,
      perenitales: false,
    });
  }

  function alergia() {
    setAlergias({
      alergias: true,
      noPatologico: false,
      obstericos: false,
      patologico: false,
      heredidatorio: false,
      perenitales: false,
    });
  }

  function gine() {
    setAlergias({
      ginecologicos: true,
      alergias: false,
      noPatologico: false,
      obstericos: false,
      heredidatorio: false,
      perenitales: false,
    });
  }

  function ob() {
    setAlergias({
      obstericos: true,
      alergias: false,
      noPatologico: false,
      ginecologicos: false,
      patologico: false,
      heredidatorio: false,
    });
  }

  const pato = () => {
    setAlergias({
      patologico: true,
      obstericos: false,
      alergias: false,
      noPatologico: false,
      ginecologicos: false,
      heredidatorio: false,
      perenitales: false,
    });
  };
  const here = () => {
    setAlergias({
      heredidatorio: true,
      patologico: false,
      obstericos: false,
      alergias: false,
      noPatologico: false,
      ginecologicos: false,
      perenitales: false,
    });
  };

  const pere = () => {
    setAlergias({
      perenitales: true,
      heredidatorio: false,
      patologico: false,
      obstericos: false,
      alergias: false,
      noPatologico: false,
      ginecologicos: false,
    });
  };

  const handleSaveNoPatologico = () => {
    setIsDisable(true);
    toastAdapter
      .promise({
        promise: saveNoPathologicalDiseases({
          ...payloadNoPatologico,
          expedienteId: id,
        }).unwrap(),
        successMessage: 'Se guardo correctamente los datos',
        errorMessage: 'Algo salio mal, intente de nuevo mas tarde',
        loadingMessage: 'Guardando datos...',
      })
      .finally(() => setIsDisable(false));
  };
  return (
    <Fragment>
      <div className=''>
        <PanelDiagnostico
          perenitales={pere}
          here={here}
          ob={ob}
          patologico={pato}
          gine={gine}
          alergia={alergia}
          noPatologico={noPatologico}
        >
          {alergias.alergias ? (
            <Alergias />
          ) : alergias.noPatologico ? (
            <FormTipoSangre />
          ) : alergias.ginecologicos ? (
            <FormGinecológicos />
          ) : alergias.obstericos ? (
            <FormPrincipa />
          ) : alergias.patologico ? (
            <FormPrincipalPatologico />
          ) : alergias.heredidatorio ? (
            <FormPrincipalHereditario />
          ) : alergias.perenitales ? (
            <FormPerinatales />
          ) : null}
        </PanelDiagnostico>
        {alergias.noPatologico && (
          <Button
            variant='primary'
            onClick={handleSaveNoPatologico}
            disabled={isDisable}
          >
            <BsSave2 /> Guardar{' '}
          </Button>
        )}
      </div>
    </Fragment>
  );
}
