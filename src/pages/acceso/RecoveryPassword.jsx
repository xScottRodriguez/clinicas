import React from "react";
import Footer from "../../components/theme/footer/Footer";
import { Link } from "react-router-dom";


export default function RecoveryPassword() {
  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container-xl px-4">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  {/*Basic forgot password form*/}
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header justify-content-center">
                      <h3 className="fw-light my-4">Recuperacion de contraseña</h3>
                    </div>
                    <div className="card-body">
                      <div className="small mb-3 text-muted">
                        Ingrese su direccion de correo electronico y le enviaremos 
                        un enlace para restablecer su contraseña
                      </div>
                      {/*Forgot password form*/}
                      <form>
                        {/*Form Group (email address)*/}
                        <div className="mb-3">
                          <label className="small mb-1" for="inputEmailAddress">
                            Correo electronico
                          </label>
                          <input
                            className="form-control"
                            id="inputEmailAddress"
                            type="email"
                            aria-describedby="emailHelp"
                            placeholder="Escribir la direccion de correo electronico"
                          />
                        </div>
                        {/*Form Group (submit options)*/}
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link className="small" to="auth-login-basic.html">
                            Volver a iniciar sesión
                          </Link>
                          <Link
                            className="btn btn-primary"
                            to="auth-login-basic.html"
                          >
                            restablecer contraseña
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
