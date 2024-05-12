/** @format */

import React, { Fragment } from "react";
import { OtorrinoLaringologiaRichText } from "./components/OtorrinoLaringologiaRichText";

const FormOto = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-4"
          role="tabpanel"
          aria-labelledby="v-pills-2-4-tab"
        >
          <OtorrinoLaringologiaRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormOto;
