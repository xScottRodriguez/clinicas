/** @format */

import React from "react";

import { Container } from "react-bootstrap";
import { CardioRichText } from "./components/CardioRichText";
const FormCardio = () => {
  return (
    <Container fluid>
      <div className=" " id="v-pills-3-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-3-1"
          role="tabpanel"
          aria-labelledby="v-pills-3-1-tab"
        >
          <CardioRichText />
        </div>
      </div>
    </Container>
  );
};

export default FormCardio;
