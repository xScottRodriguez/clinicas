/** @format */

import React, { Fragment } from "react";
import { ExtremidadesRichText } from "./components/ExtrermidadesRichText";

const FormExtremidad = () => {
  return (
    <Fragment>
      <div class="tab-content" id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-11"
          role="tabpanel"
          aria-labelledby="v-pills-2-11-tab"
        >
          <ExtremidadesRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormExtremidad;
