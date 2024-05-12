/** @format */

import React, { Fragment } from "react";
import { GenitalesRichText } from "./components/GenitalesRichText";

const FormGenitales = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-9"
          role="tabpanel"
          aria-labelledby="v-pills-2-9-tab"
        >
          <GenitalesRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormGenitales;
