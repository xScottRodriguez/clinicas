/** @format */

import React from "react";
import { Alert, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
const CATEGORY_LEVE = 1;
const CATEGORY_EXCESIVO = 2;
const CATEGORY_GRAVE = 3;
export const IndiceAlcoholismoMarconi = () => {
  const { alcoholismo } = useSelector(
    (state) => state.antecedente.noPatologicos
  );
  if (+alcoholismo.alcoholCount?.value === CATEGORY_LEVE) {
    return (
      <>
        <h6>Indice de Alcoholismo en Clasificación de Marconi</h6>
        <Alert variant="success">
          <Row>
            <Col md={4} className="mb-3 d-flex">
              <Image
                src="/assets/img/drinks/3.svg"
                fluid
                style={{ maxWidth: "4rem", maxHeight: "5rem" }}
              />
            </Col>
            <Col md={8}>
              <Alert.Heading>Bebedor moderado</Alert.Heading>
              <p className="text-justify">
                Persona que refiere beber cantidades de alcohol menores de 100
                ml con periodicidad. No mayor de 3 veces a la semana (300 ml de
                etanol semanal o sus equivalentes) o experimente menos de 12
                estados de embriaguez en un año. Grupo de riesgo para
                convertirse en bebedores excesivos.
              </p>
            </Col>
          </Row>
        </Alert>
      </>
    );
  }

  if (+alcoholismo.alcoholCount?.value === CATEGORY_EXCESIVO) {
    return (
      <>
        <h6>Indice de Alcoholismo en Clasificación de Marconi</h6>
        <Alert variant="warning">
          <Row>
            <Col md={4} className="mb-3 d-flex">
              <Image
                src="/assets/img/drinks/3.svg"
                fluid
                style={{ maxWidth: "4rem", maxHeight: "5rem" }}
              />
            </Col>
            <Col md={8}>
              <Alert.Heading>Bebedor excesivo</Alert.Heading>
              <p>
                Persona que refiere beber cantidades de alcohol iguales o
                mayores de 100 ml, con periodicidad mayor de 3 veces a la semana
                (300 ml de etanol semanal o sus equivalentes) o experimente 12 o
                más estados de embriaguez en un año.
              </p>
            </Col>
          </Row>
        </Alert>
      </>
    );
  }
  if (+alcoholismo.alcoholCount?.value === CATEGORY_GRAVE) {
    return (
      <>
        <h6>Indice de Alcoholismo en Clasificación de Marconi</h6>
        <Alert variant="danger">
          <Row>
            <Col md={4} className="mb-3 d-flex">
              <Image
                src="/assets/img/drinks/3.svg"
                fluid
                style={{ maxWidth: "4rem", maxHeight: "5rem" }}
              />
            </Col>
            <Col md={8}>
              <Alert.Heading>Bebedor patológico o alcohólico</Alert.Heading>
              <p>
                Persona bebedora de alcohol (independientemente de la cantidad y
                frecuencia) que presente regularmente síntomas y signos de
                dependencia del alcohol, ya sean físicos o psíquicos.
              </p>
            </Col>
          </Row>
        </Alert>
      </>
    );
  }
  return null;
};
