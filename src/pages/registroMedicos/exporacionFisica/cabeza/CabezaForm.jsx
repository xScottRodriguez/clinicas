/** @format */

import React, { Fragment } from "react";
import { CabezaRichText } from "./components/CabezaRichText";

const CabezaForm = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-2"
          role="tabpanel"
          aria-labelledby="v-pills-2-2-tab"
        >
          <CabezaRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default CabezaForm;
