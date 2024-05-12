/** @format */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSexuallyTransmittedDiseases } from '../../store/slices/antecedentes';
import { PiVirusLight } from 'react-icons/pi';
import { clinicalApi } from '../../services/rtk-query';
import { ginecologicalaAdapter } from '../../pages/registroMedicos/antecedentes/Ginecologicos/utils';
import { useParams } from 'react-router-dom';

export const CustomTable = ({ diseases }) => {
  const { id = null, consultaId } = useParams();
  const { data, isSuccess, isFetching } =
    clinicalApi.endpoints.getGinecologicalForFile.useQueryState(consultaId);
  const { ginecologicos } = useSelector((state) => state.antecedente);
  const [loading, setLoading] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const dispatch = useDispatch();
  const handleDiseaseToggle = (diseaseId) => {
    if (selectedDiseases.includes(diseaseId)) {
      setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, diseaseId]);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      if (!data?.length) return;

      const { enfermedadesTransmicionSexual } = ginecologicalaAdapter(data[0]);
      setSelectedDiseases(enfermedadesTransmicionSexual);
      dispatch(setSexuallyTransmittedDiseases(enfermedadesTransmicionSexual));
    }
  }, [data, isFetching, isSuccess]);

  useEffect(() => {
    if (!loading && ginecologicos.enfermedadesTransmicionSexual) {
      setSelectedDiseases(ginecologicos.enfermedadesTransmicionSexual);
      setLoading(true);
    }
  }, [loading, ginecologicos?.enfermedadesTransmicionSexual]);

  return (
    <>
      <h4 className='lh-base mb-3'>
        <PiVirusLight size={24} /> Enfermedades de Transmisión Sexual
        <p className='text-muted fw-normal small mb-0'>
          Seleccione las enfermedades de transmisión sexual del paciente
        </p>
      </h4>
      <Table hover striped size='sm' responsive bordered>
        <thead>
          <tr>
            <th className='w-10'>Seleccionar</th>
            <th>Enfermedad</th>
          </tr>
        </thead>
        <tbody>
          {diseases.length > 0 &&
            diseases?.map((disease) => (
              <tr key={disease.id}>
                <td className='d-flex justify-content-center py-2'>
                  <Form>
                    <Form.Check
                      onBlurCapture={() =>
                        dispatch(setSexuallyTransmittedDiseases(selectedDiseases))
                      }
                      checked={selectedDiseases.includes(disease.id)}
                      onChange={() => handleDiseaseToggle(disease.id)}
                      type='switch'
                      id='custom-switch'
                    />
                  </Form>
                </td>
                <td className='py-2'>{disease.nombre}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
CustomTable.propTypes = {
  diseases: PropTypes.array.isRequired,
};
