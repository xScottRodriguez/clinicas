/** @format */

import React, { Fragment } from "react";
import { ColumnaVertebralRichText } from "./components/ColumnaVertebralRichText";
const FormColumna = () => {
  return (
    <Fragment>
      <div class="tab-content" id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-10"
          role="tabpanel"
          aria-labelledby="v-pills-2-10-tab"
        >
          <ColumnaVertebralRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormColumna;
