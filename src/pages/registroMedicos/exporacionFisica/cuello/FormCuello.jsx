/** @format */

import React, { Fragment } from "react";
import { CuelloRichText } from "./components/CuelloRichText";
const FormCuello = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-5"
          role="tabpanel"
          aria-labelledby="v-pills-2-5-tab"
        >
          <CuelloRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormCuello;
