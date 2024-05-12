/** @format */

import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const PanelInterrogatorio = ({
  children,
  digestivo,
  endocrino,
  urinario,
  generales,
  nervioso,
  respiratorio,
  reproductivo,
  piel,
  esqueletico,
  mamas,
  hemoli,
  analisis,
  cardioVascular,
}) => {
  return (
    <Fragment>
      <div
        className="tab-pane  show active"
        id="pills-4"
        role="tabpanel"
        aria-labelledby="pills-4-tab"
      >
        <Row>
          <Col sm={12} md={2} lg={2}>
            <div
              className="nav sticky-md-rop nav-pills me-3 flex-column"
              id="v-pills-3-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link text-start active"
                id="v-pills-3-1-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-1"
                type="button"
                role="tab"
                aria-controls="v-pills-3-1"
                aria-selected="true"
                onClick={() => analisis()}
              >
                <i className="fa fa-bed me-2"></i> Análisis
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-2-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-2"
                type="button"
                role="tab"
                aria-controls="v-pills-3-2"
                aria-selected="false"
                onClick={() => digestivo()}
              >
                <svg
                  height="16"
                  width="16"
                  fill="currentColor"
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M384 96c-54.29 0-90.86 32.57-109.17 64H256c-35.34 0-64-28.65-64-64V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v80c0 70.69 57.3 128 128 128h.49c-.07 1.85-.49 3.63-.49 5.5V288c0 35.35-28.66 64-64 64h-64C57.3 352 0 409.31 0 480v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16c0-37.63 33.96-51.21 53.92-51.21 17.11 0 29.59 6.71 41.07 18.2C226.21 514.21 297.63 512 308.36 512c112.48 0 203.65-91.17 203.65-203.65V224C512 153.31 454.7 96 384 96zm64 212.35c0 9.23-1.01 18.21-2.73 26.95-21.56 6.08-45.01.97-61.27-15.3-17.37-17.37-42.91-22.14-65.6-13.93.84-5.93 1.6-11.9 1.6-18.07v-58.5c0-36.15 26.38-69.5 64-69.5 35.29 0 64 28.71 64 64v84.35z"
                  />
                </svg>
                Digestivo
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-3-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-3"
                type="button"
                role="tab"
                aria-controls="v-pills-3-3"
                aria-selected="false"
                onClick={() => endocrino()}
              >
                <svg
                  height="16"
                  width="16"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M249.385 395.114c-24.979 0-48.88 10.56-66.564 29.181 17.538 3.984 43.38 8.288 73.179 8.288s55.641-4.304 73.179-8.288c-17.684-18.621-41.585-29.181-66.564-29.181zM256 462.583c-37.098 0-68.261-5.978-87.328-10.786V512h174.655v-60.204c-19.066 4.809-50.229 10.787-87.327 10.787zM258.135 160.747c23.075 0 45.505-8.785 62.823-24.101-15.159-6.074-39.167-13.367-67.092-13.367-27.276 0-49.444 6.978-63.349 12.894 17.389 15.607 40.038 24.574 63.349 24.574zM187.969 0c-29.242 0-53.031 23.79-53.031 53.031v39.133c12.884 4.078 24.652 11.111 34.457 20.688 15.492-7.746 45.527-19.575 84.471-19.575 39.721 0 72.168 12.288 88.424 19.879 9.868-9.734 21.751-16.871 34.773-20.993V53.031C377.062 23.79 353.272 0 324.031 0S271 23.79 271 53.031v5.516h-30v-5.516C241 23.79 217.21 0 187.969 0z" />
                  <path d="M403.715 118.07c-18.19 0-34.944 8.321-45.965 22.831-23.707 31.211-60.946 49.845-99.615 49.845h-4.269c-38.669 0-75.909-18.634-99.616-49.845-11.021-14.51-27.774-22.832-45.965-22.832-16.496 0-31.678 6.734-42.751 18.961-11.073 12.228-16.273 28.001-14.643 44.417l20.202 203.366c2.427 24.429 22.769 42.85 47.318 42.85 14.244 0 27.619-6.31 36.698-17.31 23.727-28.751 58.09-45.24 94.277-45.24h13.229c36.187 0 70.549 16.489 94.277 45.24 9.079 11.001 22.455 17.311 36.698 17.311 24.549 0 44.891-18.421 47.318-42.85l20.202-203.366c1.631-16.415-3.569-32.189-14.643-44.417-11.073-12.227-26.256-18.961-42.752-18.961zM87.328 178.594h33.734v30H87.328zm0 75.903h33.734v30H87.328zm50.602 105.902h-33.735v-30h33.735zm185.539-148.07h33.734v30h-33.734zm-168.672 0h33.734v30h-33.734zm50.601 97.468h-33.734v-30h33.734zm67.469 16.868h-33.734v-30h33.734zm0-67.469h-33.734v-30h33.734zm67.469 50.601h-33.734v-30h33.734zm67.469 50.602H374.07v-30h33.735zm16.867-75.902h-33.734v-30h33.734zm0-75.903h-33.734v-30h33.734z" />
                </svg>
                Endocrino
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-4-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-4"
                type="button"
                role="tab"
                aria-controls="v-pills-3-4"
                aria-selected="false"
                onClick={() => hemoli()}
              >
                <svg
                  height="16"
                  width="16"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M469.598 310.335c-3.203-7.637-11.991-11.232-19.635-8.029-18.266 7.662-35.143 9.239-51.239 4.768 1.766-7.076 2.676-14.418 2.676-21.9l-.001-44.474c0-8.284-6.716-15-15-15s-15 6.716-15 15l.001 44.474c0 15.962-6.215 30.968-17.501 42.253l-61.427 61.427V68.919c12.446 2.692 25.004 6.578 37.642 11.654.228 26.796 6.736 48.181 20.201 66.641 2.937 4.026 7.501 6.161 12.131 6.161 3.065 0 6.16-.938 8.827-2.883 6.692-4.882 8.161-14.265 3.278-20.958-7.191-9.858-11.552-20.876-13.406-34.207 15.514 8.514 31.106 18.76 46.715 30.716 2.722 2.085 5.928 3.093 9.11 3.093 4.508 0 8.966-2.024 11.919-5.88 5.037-6.577 3.79-15.992-2.787-21.029-10.602-8.12-21.225-15.516-31.854-22.198 10.906-8.034 18.855-18.522 23.705-31.422 2.915-7.754-1.008-16.403-8.763-19.318-7.749-2.916-16.404 1.006-19.318 8.762-4.311 11.466-12.952 19.58-26.316 24.701-22.563-11.309-47.591-20.093-71.085-24.44V0h-72.945v178.852l-61.427-61.428c-11.286-11.284-17.501-26.29-17.501-42.252l.001-44.474c0-8.284-6.716-15-15-15-8.283 0-15 6.716-15 15l.001 44.475c0 7.482.91 14.824 2.676 21.9-16.096 4.472-32.973 2.895-51.239-4.767-7.642-3.207-16.431.391-19.635 8.029-3.205 7.64.391 16.431 8.029 19.635 15.256 6.399 30.203 9.598 44.75 9.598 10.319 0 20.436-1.616 30.313-4.836 3.291 4.949 7.095 9.609 11.393 13.907l13.747 13.848c-12.584 8.936-21.877 21.475-27.714 37.504-2.835 7.784 1.178 16.393 8.962 19.228 1.694.617 3.428.909 5.132.909 6.126 0 11.878-3.781 14.096-9.871 4.319-11.861 11.293-20.416 21.171-25.963l47.247 47.596v143.6c-23.832 4.293-49.256 13.154-72.149 24.632-13.363-5.12-22.005-13.235-26.317-24.702-2.916-7.756-11.568-11.679-19.319-8.761-7.754 2.915-11.677 11.565-8.761 19.319 4.85 12.899 12.8 23.388 23.705 31.421-10.629 6.682-21.253 14.078-31.854 22.198-6.577 5.038-7.824 14.453-2.787 21.029 2.953 3.855 7.411 5.88 11.919 5.88 3.182 0 6.39-1.009 9.11-3.093 15.609-11.956 31.2-22.202 46.715-30.716-1.855 13.331-6.216 24.349-13.407 34.209-4.882 6.692-3.413 16.076 3.28 20.958 2.667 1.945 5.76 2.882 8.826 2.882 4.629 0 9.195-2.136 12.132-6.162 13.465-18.461 19.973-39.846 20.2-66.641 12.998-5.22 25.913-9.19 38.707-11.887V512h72.945v-80.53l47.133-47.242c9.939 5.546 16.95 14.122 21.286 26.029 2.218 6.09 7.97 9.871 14.096 9.871 1.704 0 3.438-.293 5.132-.909 7.784-2.835 11.797-11.443 8.962-19.228-5.844-16.047-15.15-28.596-27.755-37.534l13.786-13.818c4.299-4.298 8.102-8.959 11.393-13.908 9.877 3.22 19.992 4.836 30.313 4.836 14.545 0 29.496-3.199 44.75-9.598 7.638-3.203 11.234-11.994 8.029-19.634z" />
                </svg>
                Hemolinfático
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-5-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-5"
                type="button"
                role="tab"
                aria-controls="v-pills-3-5"
                aria-selected="false"
                onClick={() => mamas()}
              >
                <svg
                  height="14"
                  width="14"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 512.032 512.032"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M385.666 380.396c-30.735.001-61.371-8.87-88.595-25.652-15.292-9.428-29.116-21.137-41.056-34.684-11.939 13.543-25.764 25.252-41.056 34.68-27.224 16.781-57.858 25.652-88.59 25.655h-.014c-23.638 0-46.186-5.147-67.128-15.286 7.924 29.93 12.236 63.66 12.236 97.806 0 10.987-.439 22.058-1.306 32.906a15.0017 15.0017 0 003.931 11.37 14.9992 14.9992 0 0011.021 4.825H427.01c4.186 0 8.181-1.749 11.021-4.825a14.9979 14.9979 0 003.931-11.37c-.867-10.848-1.306-21.919-1.306-32.906 0-34.242 4.311-67.939 12.241-97.849-20.967 10.167-43.553 15.33-67.231 15.33z" />
                  <circle cx="386" cy="232.843" r="15" />
                  <path d="M126.001 217.843c-8.271 0-15 6.729-15 15s6.729 15 15 15 15-6.729 15-15-6.73-15-15-15z" />
                  <path d="M493.511 144.308c-34.309-64.514-43.6-87.873-43.6-129.292 0-8.284-6.715-15-14.999-15H77.12c-8.284 0-14.999 6.716-14.999 15 0 41.419-9.291 64.778-43.6 129.292C.345 178.485-4.661 217.122 4.425 253.101c9.223 36.52 31.798 65.938 63.567 82.835 65.066 34.605 148.745 4.956 186.535-66.1.506-.952 1.002-1.908 1.489-2.868.486.96.983 1.917 1.489 2.869 27.073 50.906 77.697 80.561 128.159 80.56 19.973 0 39.924-4.647 58.375-14.46 31.768-16.897 54.344-46.315 63.567-82.835 9.087-35.98 4.082-74.617-14.095-108.794zm-367.51 133.535c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.188 45-45 45zm259.999 0c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z" />
                </svg>
                Mamas
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-6-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-6"
                type="button"
                role="tab"
                aria-controls="v-pills-3-6"
                aria-selected="false"
                onClick={() => esqueletico()}
              >
                <i className="fas fa-bone me-2"></i> Músculo esquelético
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-7-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-7"
                type="button"
                role="tab"
                aria-controls="v-pills-3-7"
                aria-selected="false"
                onClick={() => piel()}
              >
                <svg
                  height="14"
                  width="14"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M388.144 294.05c-12.86-25.49-24.99-49.56-24.99-72.23 0-5.47.43-11.06 1.24-16.64-10.69 3.14-22 4.82-33.69 4.82-27.68 0-53.99-9.49-75-26.34-21.01 16.85-47.32 26.34-75 26.34-11.69 0-23-1.68-33.69-4.82.82 5.57 1.24 11.16 1.24 16.63 0 22.56-12 46.84-24.71 72.55-26.74 54.1-60.01 121.42-.32 210.96 2.78 4.17 7.46 6.68 12.48 6.68h105v-84.4c-8.747-8.881-21.234-29.788-51.34-44.16l-.13-.07c-7.47-3.57-10.64-12.52-7.06-20 3.57-7.47 12.52-10.64 20-7.07l.13.07c33.85 16.168 50.036 39.451 53.4 42.72 2.805-2.717 19.712-26.59 53.21-42.63l.29-.14c7.46-3.59 16.43-.45 20.02 7.02 3.59 7.46.45 16.43-7.02 20.02l-.36.17c-29.748 14.237-42.725 35.544-51.14 44.07V512h105c5.02 0 9.7-2.51 12.48-6.68 60.63-90.94 26.99-157.66-.04-211.27zM255.704 302c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zM330.704 0h-150c-49.63 0-90 40.37-90 90s40.37 90 90 90c31.27 0 58.86-16.03 75-40.3 16.14 24.27 43.73 40.3 75 40.3 49.63 0 90-40.37 90-90s-40.37-90-90-90zm-165 120c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zm180 0c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15z" />
                </svg>
                Piel y anexos
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-8-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-8"
                type="button"
                role="tab"
                aria-controls="v-pills-3-8"
                aria-selected="false"
                onClick={() => reproductivo()}
              >
                <i className="fas fa-baby me-2"></i> Reproductivo
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-9-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-9"
                type="button"
                role="tab"
                aria-controls="v-pills-3-9"
                aria-selected="false"
                onClick={() => respiratorio()}
              >
                <i className="fas fa-lungs me-2"></i> Respiratorio
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-10-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-10"
                type="button"
                role="tab"
                aria-controls="v-pills-3-10"
                aria-selected="false"
                onClick={() => nervioso()}
              >
                <i className="fas fa-brain me-2"></i> Sistema nervioso
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-11-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-11"
                type="button"
                role="tab"
                aria-controls="v-pills-3-11"
                aria-selected="false"
                onClick={() => generales()}
              >
                <i className="fas fa-child me-2"></i> Sistemas generales
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-12-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-12"
                type="button"
                role="tab"
                aria-controls="v-pills-3-12"
                aria-selected="false"
                onClick={() => urinario()}
              >
                <i className="fas fa-tint me-2"></i> Urinario
              </button>
              <button
                className="nav-link text-start"
                id="v-pills-3-12-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-3-12"
                type="button"
                role="tab"
                aria-controls="v-pills-3-12"
                aria-selected="false"
                onClick={() => cardioVascular()}
              >
                <i className="fas fa-heartbeat me-2"></i> Cardiovascular
              </button>
            </div>
          </Col>
          <Col
            sm={12}
            md={10}
            lg={10}
            className="overflow-auto"
            style={{ height: "80vh" }}
          >
            {children}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default PanelInterrogatorio;
