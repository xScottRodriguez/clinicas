/** @format */

import React, { Fragment } from "react";

export default function LayoutPanel(props) {
  return (
    <div className="shadow-none mb-4 ">
      <div className="">{props.titulo}</div>
      <div className="">{props.children}</div>
    </div>
  );
}
