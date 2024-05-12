/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import React, { Fragment, useRef, useState } from 'react';
import FormDiagnostico from '../../incapacidad/FormDiagnostico';
import {
  Alert,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';

import { viewTypes } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ANTECEDENTES_VIEWS } from '../../../../constants';
import { useGetComplicationsQuery } from '../../../../services/rtk-query/clinicalApi';
import { Loader } from '../../../../components/ui/Loader';
import { setComplications } from '../../../../store/slices/antecedentes';
import SpeechToText from '../../../../plugins';
import { requestPermissionMicrofone } from '../../../../helpers/requestPermitions';
import { toast } from 'react-hot-toast';
// import { setPerinatalNotes } from "../../../../store/slices/antecedentes";

const Complicaciones = ({ tempData }) => {
  const { data, isError, isSuccess, isLoading } = useGetComplicationsQuery();
  const { perinatales } = useSelector((state) => state.antecedente);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const speechToTextRef = useRef(null);

  useEffect(() => {
    if (tempData?.length) return setSelectedDiseases(tempData);
  }, [tempData]);

  useEffect(() => {
    speechToTextRef.current = new SpeechToText(handleFinalised);

    return () => {
      speechToTextRef.current.stopListening();
      setListening(false);
    };
  }, []);

  const handleFinalised = (transcript) => {
    setFinalTranscript(transcript);
  };

  const startListeningHandler = () => {
    requestPermissionMicrofone()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        speechToTextRef.current.stopListening();
        setListening(false);
        if (err.message === 'Permission denied') {
          toast.error('Permiso de microfono denegado');
          return;
        }
        if (err.message === 'Permission dismissed') {
          toast.error('Permiso de microfono denegado');
          return;
        }

        toast.error('Error al conceder permiso de microfono');
        return;
      });
    speechToTextRef.current.startListening({
      lang: 'es-ES',
    });
    setListening(true);
  };

  const stopListeningHandler = () => {
    speechToTextRef.current.stopListening();
    setListening(false);
  };

  useEffect(() => {
    if (!listening && !isLoaded && perinatales?.notas) {
      setEditorContent(perinatales.notas);
      setIsLoaded(true);
    }

    if (!listening && finalTranscript) {
      setEditorContent(finalTranscript);
    }
  }, [dispatch, listening, perinatales.notas, finalTranscript]);

  const handleDiseaseToggle = (diseaseId) => {
    if (selectedDiseases.includes(diseaseId)) {
      setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, diseaseId]);
    }
  };
  useEffect(() => {
    setSelectedDiseases(perinatales?.complicaciones);
  }, []);

  useEffect(() => {
    if (!loaded && perinatales?.complicaciones) {
      setSelectedDiseases(perinatales?.complicaciones);
      setLoaded(true);
    }
  }, [loaded, perinatales?.complicaciones]);

  useEffect(() => {
    dispatch(setComplications(selectedDiseases));
  }, [dispatch, selectedDiseases]);

  return (
    <Fragment>
      <FormDiagnostico
        title='Complicaciones'
        sliceName={viewTypes.ANTECEDENTE}
        propertySliceName={ANTECEDENTES_VIEWS.PERINATALES}
        trans={editorContent}
      />
      <Row className='my-5'>
        {isLoading && <Loader />}
        {isError && (
          <Alert variant='danger' className='my-3'>
            {' '}
            Ocurrio un error al cargar las Complicaciones
          </Alert>
        )}

        {isSuccess &&
          data?.map((complicacion) => (
            <Col md={4} className='py-1' key={complicacion.id}>
              <FormCheck>
                <FormCheck.Input
                  type='checkbox'
                  value={complicacion.id}
                  data-model='perinatal_newborn_diseases'
                  id={'newborn-disease' + complicacion.id}
                  checked={selectedDiseases.includes(complicacion.id)}
                  onChange={() => handleDiseaseToggle(complicacion.id)}
                />
                <FormCheck.Label
                  className='form-check-label'
                  htmlFor={'newborn-disease' + complicacion.id}
                >
                  {complicacion.nombre}
                </FormCheck.Label>
              </FormCheck>
            </Col>
          ))}
      </Row>
    </Fragment>
  );
};

export default Complicaciones;
