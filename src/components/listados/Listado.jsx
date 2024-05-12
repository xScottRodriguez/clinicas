/** @format */

import React, { forwardRef, useState, useRef, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import HTMLParser from 'html-react-parser';
import {
  useConsultasQuery,
  useGetClinicalRecordsQuery,
  useGetDiagnosticsQuery,
  useGetIncapacitiesQuery,
  useGetModulesQuery,
  useGetRolesQuery,
  useGetUsersQuery,
} from '../../services/rtk-query/clinicalApi';
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { Alert, Col, ListGroup, Row, Spinner, Stack } from 'react-bootstrap';

import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { Controller, useForm } from 'react-hook-form';

const gridStyle = { minHeight: 550, marginTop: 10 };

function indication() {
  <i className='fa fa-spinner fa-spin font-26'></i>;
}

const customTotal = (from, to, size) => (
  <p className='react-bootstrap-table-pagination-total '>
    Mostrando {from} a {to} de {size} Resultados
  </p>
);
const link = '#';
const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
  <ListGroup>
    <ListGroup.Item
      active={''}
      key={text}
      action
      data-page={page}
      href={link}
      onClick={(e) => {
        e.preventDefault();
      }}
      tabIndex='-1'
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
    >
      {text}
    </ListGroup.Item>
  </ListGroup>
);

const options = {
  paginationSize: 10,
  pageStartIndex: 1,
  alwaysShowAllBtns: true, // Always show next and previous button
  withFirstAndLast: true, // Hide the going to First and Last page button
  hideSizePerPage: false, // Hide the sizePerPage dropdown always
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  prePageText: <MdOutlineKeyboardArrowLeft />,
  nextPageText: <MdKeyboardArrowRight />,
  nextPageTitle: 'Página siguiente',
  prePageTitle: 'Página anterior',
  firstPageTitle: <MdOutlineKeyboardDoubleArrowLeft />,
  lastPageTitle: <MdOutlineKeyboardDoubleArrowRight />,

  firstPageText: <BsChevronDoubleLeft />,

  lastPageText: <BsChevronDoubleRight />,
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPageList: [
    {
      text: '10',
      value: 10,
    },
    {
      text: '20',
      value: 20,
    },
    {
      text: '30',
      value: 30,
    },
  ],
  sizePerPageOptionRenderer,
};

const hooksMap = {
  people: useGetClinicalRecordsQuery,
  modules: useGetModulesQuery,
  users: useGetUsersQuery,
  roles: useGetRolesQuery,
  incapacidades: useGetIncapacitiesQuery,
  pacientes: useGetClinicalRecordsQuery,
  diagnosticos: useGetDiagnosticsQuery,
  consultas: useConsultasQuery,
};
const Listado = forwardRef(
  ({ id, endpoint, columns, evento, expedientId = null }, ref) => {
    const [debouncedBuscar, setDebouncedBuscar] = useState('');
    const { control } = useForm({
      defaultValues: {
        search: '',
      },
    });
    const searchTimerRef = useRef();

    const performSearch = (value) => {
      setDebouncedBuscar(value);
    };

    const debouncedSearch = useCallback((value) => {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = setTimeout(() => {
        performSearch(value);
      }, 500);
    }, []);

    const hook = hooksMap[endpoint];
    if (!hook) {
      return (
        <Row>
          <Col className='my-3' md={6} sm={12}>
            <label htmlFor=''>Buscar:</label>
            <Controller
              control={control}
              name='search'
              render={({ field }) => (
                <input
                  {...field}
                  onKeyUp={(e) => debouncedSearch(e.target.value)}
                  type='text'
                  className='form-control my-2'
                  placeholder='Escriba para buscar...'
                />
              )}
            />
          </Col>
          <Col className='my-3' md={12} sm={12}>
            <BootstrapTable
              keyField='id'
              rowEvents={evento}
              data={[]}
              rowStyle={gridStyle}
              columns={columns}
              pagination={paginationFactory(options)}
              noDataIndication={indication}
              bootstrap4
              striped
              hover
              condensed
              ref={ref}
              wrapperClasses='table-responsive'
            />
          </Col>
        </Row>
      );
    }

    const { data, isLoading, isSuccess, isError, isFetching } = hook({
      filter: debouncedBuscar,
      search: debouncedBuscar,
      id: expedientId,
    });
    return (
      <div className='row'>
        <div className='col-lg-4 col-sm-12 mb-3'>
          <label htmlFor='' className='my-2'>
            Buscar:
          </label>
          <Controller
            control={control}
            name='search'
            render={({ field }) => (
              <input
                {...field}
                onKeyUp={(e) => debouncedSearch(e.target.value)}
                type='text'
                className='form-control '
                placeholder='Escriba para buscar...'
              />
            )}
          />
        </div>
        <div className='col-12'>
          {isLoading ||
            (isFetching && (
              <Stack className='mx-auto'>
                <p>Cargando...</p>
                <Spinner animation='grow ' className='bg-primary' />
              </Stack>
            ))}

          {isError && (
            <Alert variant='danger'>Ocurrio un error al cargar {endpoint}</Alert>
          )}

          {isSuccess && { id, endpoint, columns } && (
            <BootstrapTable
              rowEvents={evento}
              keyField={id}
              data={data}
              rowStyle={gridStyle}
              columns={columns?.map((col) => ({
                ...col,
                formatter: col.formatter
                  ? col.formatter
                  : (cell, row) => {
                      // Verificar si el contenido de la celda es HTML
                      const isHtml =
                        typeof cell === 'string' && /<\/?[a-z][\s\S]*>/i.test(cell);

                      // Si la columna tiene un formatter definido, aplicarlo a la celda
                      if (col.formatter) {
                        return col.formatter(cell, row);
                      }
                      // Si el contenido es HTML, parsearlo a texto plano; de lo contrario, mantenerlo igual
                      return isHtml ? HTMLParser(cell) : cell;
                    },
              }))}
              pagination={paginationFactory(options)}
              noDataIndication={indication}
              bootstrap4
              striped
              hover
              condensed
              ref={ref}
              wrapperClasses='table-responsive'
            />
          )}
        </div>
      </div>
    );
  }
);

export default Listado;
