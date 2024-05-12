/** @format */

import React from "react";
import packageJson from "../../../package.json";
export const Footer = () => {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="footer-admin mt-auto footer-dark">
        <div className="container-xl px-4">
          <div className="row">
            <div className="col-md-6 small">
              Copyright © SuyaNet: {packageJson.version}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
