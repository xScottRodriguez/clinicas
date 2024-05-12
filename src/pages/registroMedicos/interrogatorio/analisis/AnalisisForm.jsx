/** @format */

import React from 'react';
import { ReasonConsultation } from './components/ReasonConsultation';
import { SymtomsNotes } from './components/SymtomsNotes';
import { DescriptionNotes } from './components/DescriptionNotes';
import { Container } from 'react-bootstrap';
export default function AnalisisForm() {
  return (
    <Container>
      <ReasonConsultation />
      <SymtomsNotes />
      <DescriptionNotes />
    </Container>
  );
}
