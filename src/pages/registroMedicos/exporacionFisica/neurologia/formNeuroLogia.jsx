/** @format */

import React, { Fragment } from "react";
import { NeurologiaRichText } from "./components/NeurologiaRichText";
const FormNeurologia = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active "
          id="v-pills-2-12"
          role="tabpanel"
          aria-labelledby="v-pills-2-12-tab"
        >
          <NeurologiaRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormNeurologia;
