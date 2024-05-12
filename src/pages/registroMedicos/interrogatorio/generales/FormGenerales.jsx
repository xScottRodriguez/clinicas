/** @format */

import React from "react";
import { SistemaGeneralRichText } from "./components/SistemaGenerales";

export default function FormGenerales() {
  return (
    <div className="tab-content " id="v-pills-3-tabContent">
      <div
        className="tab-pane fade show active"
        id="v-pills-3-2"
        role="tabpanel"
        aria-labelledby="v-pills-3-2-tab"
      >
        <SistemaGeneralRichText />
      </div>
    </div>
  );
}
