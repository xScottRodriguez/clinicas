/** @format */

import React from "react";
import { SkeletalRichText } from "./components/SkeletalRichText";
export default function FormEsqueletico() {
  return (
    <div className="tab-content " id="v-pills-3-tabContent">
      <div
        className="tab-pane fade show active"
        id="v-pills-3-2"
        role="tabpanel"
        aria-labelledby="v-pills-3-2-tab"
      >
        <SkeletalRichText />
      </div>
    </div>
  );
}
