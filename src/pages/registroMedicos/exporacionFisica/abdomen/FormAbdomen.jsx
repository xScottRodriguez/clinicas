/** @format */

import React, { Fragment } from "react";
import { AbdomenRichText } from "./components/AbdomenRichText";
const FormAbdomen = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-7"
          role="tabpanel"
          aria-labelledby="v-pills-2-7-tab"
        >
          <AbdomenRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormAbdomen;
