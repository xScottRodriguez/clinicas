/** @format */

import React, { Fragment } from "react";
import { ExploracionGinecologicaRichText } from "./components/ExploracionGinecologicaRichText";
const FormGinicologia = () => {
  return (
    <Fragment>
      <div class="tab-content " id="v-pills-2-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-2-8"
          role="tabpanel"
          aria-labelledby="v-pills-2-8-tab"
        >
          <ExploracionGinecologicaRichText />
        </div>
      </div>
    </Fragment>
  );
};

export default FormGinicologia;
