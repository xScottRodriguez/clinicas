import React, { Fragment } from "react";
export default function ErrorNotFount(props) {
  return (
    <Fragment>
      <body className="bg-white">
        <div id="layoutError">
          <div id="layoutError_content">
            <main>
              <div className="container-xl px-4">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="text-center mt-4">
                      <img
                        className="img-fluid p-4"
                        src="assets/img/illustrations/404-error.svg"
                        alt=""
                      />
                      <p className="lead">
                        Esta URL solicitada no se encontró en este servidor.
                      </p>
                      <a className="text-arrow-icon" href="/">
                        <i className="ms-0 me-1" data-feather="arrow-left"></i>
                        Volver al panel de control
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </Fragment>
  );
}
