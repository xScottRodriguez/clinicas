/** @format */

import React, { Fragment } from "react";
import { OjosRichText } from "./components/OjosRichText";

const FormOjos = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-3"
          role="tabpanel"
          aria-labelledby="v-pills-2-3-tab"
        >
          <OjosRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormOjos;
