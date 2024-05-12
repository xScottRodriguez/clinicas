/** @format */

import React, { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiBrain } from 'react-icons/bi';
import { LuHeartPulse } from 'react-icons/lu';
import { RiBodyScanLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { FaEarDeaf } from 'react-icons/fa6';
import { BsLungs } from 'react-icons/bs';
const HabitudExterios = ({
  children,
  ojo,
  cabeza,
  exterior,
  otorrino,
  cuello,
  torax,
  abdomen,
  ginecologia,
  genitales,
  columna,
  extremidades,
  neurologica,
  signosVitales,
}) => {
  // console.log(exterior);
  return (
    <Fragment>
      <div
        className='tab-pane fade show active '
        style={{ min: '50vh' }}
        id='pills-3'
        role='tabpanel'
        aria-labelledby='pills-3-tab'
      >
        <div className='my-2'>
          <Row className='d-flex justify-content-space-between'>
            <Col md={2}>
              <div
                className='nav nav-pills my-3 flex-column'
                id='v-pills-2-tab'
                role='tablist'
                aria-orientation='vertical'
              >
                <button
                  onClick={signosVitales}
                  className='nav-link text-start active'
                  id='v-pills-2-0-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-0'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-0'
                  aria-selected='true'
                >
                  <LuHeartPulse size={24} /> Signos Vitales
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-1-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-1'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-1'
                  aria-selected='true'
                  onClick={() => exterior()}
                >
                  <RiBodyScanLine size={24} /> Habitus exterior
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-2-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-2'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-2'
                  aria-selected='false'
                  onClick={() => cabeza()}
                >
                  <BiBrain size={24} className='mr-1' /> Cabeza
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-3-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-3'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-3'
                  aria-selected='false'
                  onClick={() => ojo()}
                >
                  <FaRegEye size={24} /> Ojos
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-4-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-4'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-4'
                  aria-selected='false'
                  onClick={() => otorrino()}
                >
                  <FaEarDeaf size={24} /> Otorrinolaringología
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-5-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-5'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-5'
                  aria-selected='false'
                  onClick={() => cuello()}
                >
                  <svg
                    height='16'
                    width='16'
                    fill='currentColor'
                    className='me-2'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2400/svg'
                  >
                    <path d='M407 62h-31c-24.39 0-45-21.52-45-47 0-8.28-6.72-15-15-15H196c-8.28 0-15 6.72-15 15 0 25.48-24.61 47-45 47h-31C47.1 62 0 109.1 0 167v180c0 8.28 6.72 15 15 15h76v135c0 8.28 6.72 15 15 15h71.13c-22.622-44.001-29.464-100.555-24.71-150 .55-5.82 1.26-11.59 2.14-17.29 1.27-8.18 8.93-13.8 17.11-12.53 8.19 1.26 13.81 8.92 12.54 17.11-.65 4.19-1.2 8.43-1.65 12.71-5.14 48.581 1.97 109.674 29.38 150h88.28c26.89-39.711 34.359-101.426 29.22-150-.45-4.28-1-8.52-1.65-12.71-1.27-8.19 4.35-15.85 12.54-17.11 8.19-1.27 15.84 4.35 17.11 12.53.88 5.7 1.59 11.47 2.14 17.29 4.76 49.508-2.19 106.248-24.73 150H406c8.28 0 15-6.72 15-15V362h76c8.28 0 15-6.72 15-15V167c0-57.9-47.1-105-105-105zm-61 150c8.28 0 15 6.72 15 15 0 8.271-6.716 15-15 15-8.275 0-15-6.723-15-15 0-8.28 6.72-15 15-15zm-180 0c8.28 0 15 6.72 15 15 0 8.271-6.716 15-15 15-8.275 0-15-6.723-15-15 0-8.28 6.72-15 15-15zm105 225c0 8.28-6.72 15-15 15s-15-6.72-15-15v-90c0-8.28 6.72-15 15-15s15 6.72 15 15zm175.56-236.46C430.774 265.616 381.528 302 330.25 302c-6.661-.971-42.59 6.035-74.25-23.84-31.606 29.824-67.467 22.851-74.25 23.84-50.893 0-100.428-35.991-116.31-101.46-1.96-8.05 2.98-16.16 11.03-18.12 8.06-1.95 16.17 2.99 18.12 11.04 12.23 50.389 48.775 78.54 87.16 78.54 7.549-1.026 32.953 5.087 54.89-16.85l8.75-8.76c5.862-5.842 15.337-5.863 21.22 0l8.75 8.76c21.964 21.965 47.575 15.856 54.89 16.85 41.876 0 75.956-32.378 87.16-78.54 1.95-8.05 10.06-12.99 18.12-11.04 8.05 1.96 12.99 10.07 11.03 18.12z' />
                  </svg>
                  Cuello
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-6-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-6'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-6'
                  aria-selected='false'
                  onClick={() => torax()}
                >
                  <BsLungs size={25} />
                  Tórax
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-7-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-7'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-7'
                  aria-selected='false'
                  onClick={() => abdomen()}
                >
                  <svg
                    height='16'
                    width='16'
                    fill='currentColor'
                    className='me-2'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2400/svg'
                  >
                    <path d='M428.06 0H83.94c-9.56 0-16.68 8.84-14.66 18.18C90.54 116.16 158.22 210 256 210c97.75 0 165.45-93.8 186.72-191.82C444.74 8.83 437.61 0 428.06 0z' />
                    <path d='M503.65 303.55l-87.77-43.38c-15.35-7.67-24.88-23.1-24.88-40.25v-39.08C352.43 219.6 306.01 240 256 240c-50.02 0-96.43-24.4-135-59.16v39.08c0 17.15-9.53 32.58-24.81 40.22L8.35 303.55C3.24 306.08 0 311.29 0 317v180c0 8.28 6.72 15 15 15h482c8.28 0 15-6.72 15-15V317c0-5.71-3.24-10.92-8.35-13.45zm-308.09-46.52c8.27-.5 15.37 5.81 15.86 14.08 2.89 48.97 19.22 81.63 28 99.18 3.7 7.41.7 16.42-6.71 20.13-7.41 3.7-16.42.7-20.13-6.71-9.04-18.09-27.85-55.71-31.11-110.82-.49-8.27 5.82-15.37 14.09-15.86zM226 482c-8.28 0-15-6.72-15-15 0-8.27-6.73-15-15-15H76c-8.28 0-15-6.72-15-15s6.72-15 15-15h120c24.81 0 45 20.19 45 45 0 8.28-6.72 15-15 15zm46.58-111.71c8.78-17.55 25.11-50.21 28-99.18.49-8.26 7.61-14.57 15.86-14.08 8.27.49 14.58 7.59 14.09 15.86-3.26 55.1-22.07 92.73-31.11 110.82-3.7 7.4-12.71 10.42-20.13 6.71-7.41-3.71-10.41-12.72-6.71-20.13zM436 452H316c-8.27 0-15 6.73-15 15 0 8.28-6.72 15-15 15s-15-6.72-15-15c0-24.81 20.19-45 45-45h120c8.28 0 15 6.72 15 15s-6.72 15-15 15z' />
                  </svg>
                  Abdomen
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-8-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-8'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-8'
                  aria-selected='false'
                  onClick={() => ginecologia()}
                >
                  <i className='fas fa-female me-2'></i> Exploración Ginecológica
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-9-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-9'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-9'
                  aria-selected='false'
                  onClick={() => genitales()}
                >
                  <i className='fas fa-venus-mars me-2'></i> Genitales
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-10-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-10'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-10'
                  aria-selected='false'
                  onClick={() => columna()}
                >
                  <svg
                    height='16'
                    width='16'
                    fill='currentColor'
                    className='me-2'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2400/svg'
                  >
                    <path d='M398.488 166H361c0-16.57-13.43-30-30-30h-23.06c-10.39 17.92-29.79 30-51.95 30-22.17 0-41.56-12.08-51.95-30h-23.05c-16.57.01-29.99 13.43-29.99 30h-37.488c-12.426 0-22.5 10.074-22.5 22.5s10.074 22.5 22.5 22.5h37.476c0 16.569 13.431 30 30 30h45c0 16.569 13.431 30 30 30s30-13.431 30-30H331c16.57 0 30-13.43 30-30h37.488c12.426 0 22.5-10.074 22.5-22.5s-10.074-22.5-22.5-22.5zM398.488 301H361c0-16.57-13.43-30-30-30h-23.06c-10.39 17.92-29.79 30-51.95 30-22.17 0-41.56-12.08-51.95-30h-23.05c-16.57.01-29.99 13.43-29.99 30h-37.488c-12.426 0-22.5 10.074-22.5 22.5s10.074 22.5 22.5 22.5h37.476c0 16.569 13.431 30 30 30h45c0 16.569 13.431 30 30 30s30-13.431 30-30H331c16.57 0 30-13.43 30-30h37.488c12.426 0 22.5-10.074 22.5-22.5s-10.074-22.5-22.5-22.5zM398.488 436H361c0-16.57-13.43-30-30-30h-23.06c-10.39 17.92-29.79 30-51.95 30-22.17 0-41.56-12.08-51.95-30h-23.05c-16.57.01-29.99 13.43-29.99 30h-37.488c-12.426 0-22.5 10.074-22.5 22.5v1c0 12.426 10.074 22.5 22.5 22.5H151c0 16.57 13.43 30 30 30h150c16.57 0 30-13.43 30-30h37.488c12.426 0 22.5-10.074 22.5-22.5v-1c0-12.426-10.074-22.5-22.5-22.5zM397.988 30H361c0-16.568-13.431-30-30-30H181c-16.569 0-30 13.432-30 30h-36.988c-12.703 0-23 10.297-23 23s10.297 23 23 23h36.976c0 16.569 13.431 30 30 30h45c0 16.569 13.431 30 30 30s30-13.431 30-30H331c16.569 0 30-13.432 30-30h36.988c12.703 0 23-10.297 23-23s-10.298-23-23-23z' />
                  </svg>
                  Columna Vertebral
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-11-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-11'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-11'
                  aria-selected='false'
                  onClick={() => extremidades()}
                >
                  <svg
                    height='16'
                    width='16'
                    fill='currentColor'
                    className='me-2'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2400/svg'
                  >
                    <path d='M441.071 192.046l-3.729-.042c-51.917 0-98.948 28.75-122.781 74.156-14.875-6.656-31.115-10.156-47.885-10.156-16.856 0-33.055 3.759-47.872 10.45-3.969 1.792-6.307 6.005-5.977 10.348.28 3.691.516 7.397.516 11.242 0 17.385-3.5 33.323-10.396 47.365-1.854 3.781-5.646 5.969-9.583 5.969-1.573 0-3.177-.354-4.688-1.094-5.292-2.594-7.469-8.99-4.875-14.271 5.448-11.104 8.208-23.875 8.208-37.969 0-7.82-1.664-28.522-1.947-31.085-1.01-9.141-2.26-18.068-3.46-26.405-.003-.021.007-.04.004-.061-1.987-13.837-3.921-27.276-4.046-38.46l53.933.01a32.0067 32.0067 0 0022.639-9.375l42.667-42.667c12.198-12.198 12.469-31.875.813-44.406 5.567-8.46 6.936-19.292 2.973-29.469-2.49-6.395-7.326-11.625-13.037-15.431l-24.843-16.558c-11.443-7.627-24.744-12.292-38.489-12.705-32.731-.985-63.653 11.306-86.698 34.351-40.864 40.865-73.02 87.657-95.603 139.084-27.208 61.958-41 107.667-41 135.844 0 16.146-1.396 29.26-4.156 38.99-5.896 20.781 3.385 42.948 22.563 53.906 76.823 43.896 164.198 67.104 252.677 67.104h15.427c54.96 0 109.557-8.895 161.674-26.34l6.857-2.295c30.495-10.208 51.052-38.766 51.052-70.925V266.765c0-40.167-31.823-73.688-70.938-74.719z' />
                  </svg>
                  Extremidades
                </button>
                <button
                  className='nav-link text-start'
                  id='v-pills-2-12-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#v-pills-2-12'
                  type='button'
                  role='tab'
                  aria-controls='v-pills-2-12'
                  aria-selected='false'
                  onClick={() => neurologica()}
                >
                  <i className='fas fa-brain me-2'></i> Exploración neurológica
                </button>
              </div>
            </Col>
            <Col
              md={10}
              className=' overflow-auto'
              style={{
                height: '80vh',
              }}
            >
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default HabitudExterios;
