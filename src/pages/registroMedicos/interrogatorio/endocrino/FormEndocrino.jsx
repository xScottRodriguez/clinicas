/** @format */

import React from "react";
import { EndocrineRichText } from "./components/EndocrineRichText";
export default function FormEndocrino() {
  return (
    <div className="tab-content " id="v-pills-3-tabContent">
      <div
        className="tab-pane fade show active"
        id="v-pills-3-2"
        role="tabpanel"
        aria-labelledby="v-pills-3-2-tab"
      >
        <EndocrineRichText />
      </div>
    </div>
  );
}
