import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import peticionesAxios from '../../services/peticionesAxios';
const gridStyle = { minHeight: 550, marginTop: 10 };
let timer;
const TablaPersonas = forwardRef((props, ref) => {
  const columnDefs = props.columns;
  const id = props.id;

  const focusRef = useRef();

  const [data, setData] = useState([]);
  const [buscar, setBuscar] = useState('');
  const getData = (filter = '') => {
    const params = {
      filter,
    };
    peticionesAxios.GET(props.ruta, params).then((result) => {
      if (result !== false) {
        if (result.status === 200) {
          const persona = result.data?.map((persona) => ({
            nombre_completo: persona.nombreCompleto,
            sexo: persona.sexo?.value,
            estado_civil: persona.estadoCivil?.value,
          }));
          setData(persona);
        }
      }
    });
  };
  useEffect(() => {
    const getData = (filter = '') => {
      const params = {
        filter,
      };
      peticionesAxios.GET(props.ruta, params).then((result) => {
        if (result !== false) {
          if (result.status === 200) {
            const persona = result.data?.map((persona) => ({
              nombre_completo: persona.nombreCompleto,
              sexo: persona.sexo?.value,
              estado_civil: persona.estadoCivil?.value,
              departamento_nacimiento: persona.departamentoNacimiento?.value,
              pais: persona.paisNacimiento?.value,
              sucursal: persona.sucursal?.value,
              docIdentidad: persona?.tipoDocumentoIdentidad.value,
              tipoCliente: persona.tipoCliente.value,
            }));
            setData(persona);
          }
        }
      });
    };

    focusRef.current.focus();
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData(buscar);
    }, 300);
  }, [buscar, props.ruta]);

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    clear() {
      setBuscar('');
      getData();
    },
  }));

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total'>
      Mostrando {from} a {to} de {size} Resultados
    </span>
  );
  const link = '#';
  const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
    <li
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
      key={text}
      role='presentation'
      className='dropdown-item'
    >
      <a
        href={link}
        onClick={(e) => {
          e.preventDefault();
        }}
        tabIndex='-1'
        role='menuitem'
        data-page={page}
        onMouseDown={(e) => {
          e.preventDefault();
          onSizePerPageChange(page);
        }}
      >
        {text}
      </a>
    </li>
  );

  const options = {
    paginationSize: 10,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    hideSizePerPage: false, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    prePageText: 'Atras',
    nextPageText: 'Sig.',
    nextPageTitle: 'Página siguiente',
    prePageTitle: 'Página anterior',
    firstPageTitle: 'Primera Página',
    lastPageTitle: 'Última Página',

    firstPageText: '<<<',

    lastPageText: '>>>',
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

  function indication() {
    <i className='fa fa-spinner fa-spin font-26'></i>;
  }

  return (
    <div className='row'>
      <div className='col-lg-4'>
        <label htmlFor=''>Buscar:</label>

        <input
          type='text'
          className='form-control'
          placeholder='Escriba para buscar...'
          value={buscar}
          onChange={handleChange}
          ref={focusRef}
        />
      </div>
      <div className='col-lg-12 mt-3'>
        <BootstrapTable
          rowEvents={props.evento}
          keyField={id}
          data={data}
          rowStyle={gridStyle}
          columns={columnDefs}
          pagination={paginationFactory(options)}
          noDataIndication={indication}
          bootstrap4
          striped
          hover
          condensed
          wrapperClasses='table-responsive'
        />
      </div>
    </div>
  );
});
export default TablaPersonas;
