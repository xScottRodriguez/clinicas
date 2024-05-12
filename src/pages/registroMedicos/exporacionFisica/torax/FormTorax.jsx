/** @format */

import React, { Fragment } from "react";
import { ToraxRichText } from "./components/ToraxRichText";

const FormTorax = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          class="tab-pane fade show active"
          id="v-pills-2-6"
          role="tabpanel"
          aria-labelledby="v-pills-2-6-tab"
        >
          <ToraxRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormTorax;
