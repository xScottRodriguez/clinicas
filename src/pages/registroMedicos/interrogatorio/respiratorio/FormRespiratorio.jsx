/** @format */

import React from "react";

import { RespiratorioRichText } from "./components/RespiratorioRichText";
export default function FormRespiratorio() {
  return (
    <div className="tab-content " id="v-pills-3-tabContent">
      <div
        className="tab-pane fade show active"
        id="v-pills-3-2"
        role="tabpanel"
        aria-labelledby="v-pills-3-2-tab"
      >
        <RespiratorioRichText />
      </div>
    </div>
  );
}
