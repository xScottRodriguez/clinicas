/** @format */

import { ListGroup } from 'react-bootstrap';

const physicalSymptoms = [
  'Temblores severos',
  'Nerviosidad',
  'Insomnio',
  'Cefalea',
  'Sudoración',
  'Necesidad de continuar tomando',
  'Otros signos de deterioro',
  'En ocasiones diarreas, subsaltos musculares o cuadros de delirium subagudo',
];

const psychicSymptoms = [
  'Delirium tremens',
  'Alucinosis alcohólica',
  'Delirios celopáticos alcohólicos',
  'Psicosis de Korsakoff',
  'Nerviosidad',
  'Otros signos de psíquicos',
];
const AlcoholWithdrawalSymptoms = () => {
  return (
    <>
      <h4>Físicos</h4>
      <ListGroup>
        {physicalSymptoms?.map((symptom, index) => (
          <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className='mt-4'>Psíquicos</h4>
      <ListGroup>
        {psychicSymptoms?.map((symptom, index) => (
          <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default AlcoholWithdrawalSymptoms;
