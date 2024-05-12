/* eslint-disable react/forbid-foreign-prop-types */
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import { flexRender } from '@tanstack/react-table';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { Loader } from '../../components/ui/Loader';
import { useState } from 'react';

/**
 * Plugin de "@tanstack/react-table"
 * @param columns -Define las columbas que mostrara la tabla
 * @param data - Define la informacion a cargar por la tabla
 * @param pageSize -Define la cantidad de rows por pagina
 * @param rowPerPagination -Un arreglo que define la cantidades de rows por pagina
 * @param isFetching -Esto indica que mostrara un loader en el body de la tabla mientras cargan los datos
 * @param filtering -Filtro que utilizara para la tabla
 * @param onFilteringChange -Evento que ejecutara el cambio del input para manejarlo externamente
 * @param isInternalFiltering -Prop para indicarle a la tabla si el filtro se maneja externamente o si lo deberia de manejar internamente
 * @param contextMenu - Menu de context para click derecho
 * @returns
 */

export const TablePlugin = ({
  columns,
  data = [],
  initialPageSize = 25,
  rowPerPagination = [25, 50, 75, 100],
  isFetching = false,
  filtering = '',
  onFilteringChange,
  isInternalFiltering = true,
  contextMenu,
}) => {
  const [internalFiltering, setInternalFiltering] = useState('');

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
    state: {
      globalFilter: isInternalFiltering ? internalFiltering : filtering,
    },
    onGlobalFilterChange: isInternalFiltering
      ? setInternalFiltering
      : onFilteringChange,
  });

  const handleChange = (e) => {
    if (isInternalFiltering) {
      return setInternalFiltering(e.target.value);
    } else {
      return onFilteringChange(e.target.value);
    }
  };

  return (
    <>
      <Row>
        <Col lg={4} md={4} sm={12}>
          <Form.Group className='mb-3'>
            <Form.Label>Buscar:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Escriba para buscar...'
              value={isInternalFiltering ? internalFiltering : filtering}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped responsive onContextMenu={contextMenu}>
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers?.map((header) => (
                <th key={header?.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isFetching && (
            <tr>
              <td colSpan={12} className='text-center'>
                <Loader />
              </td>
            </tr>
          )}
          {!data.length && !isFetching && (
            <tr>
              <td colSpan={12} className='text-center'>
                <p>Sin datos que mostrar</p>
              </td>
            </tr>
          )}
          {!isFetching &&
            table?.getRowModel().rows?.map((rowModel) => (
              <tr key={rowModel?.id}>
                {rowModel.getVisibleCells()?.map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='d-flex flex-wrap justify-content-between px-3'>
        <p>
          Pagina {table.getState().pagination.pageIndex + 1} de:{' '}
          {table.getPageCount()}
        </p>
        <ButtonGroup className='d-flex flex-wrap'>
          <DropdownButton
            className='flex-grow-1'
            as={ButtonGroup}
            id={`dropdown-button-drop-down`}
            drop={'down-centered'}
            variant='outline-primary'
            title={table.getState().pagination.pageSize}
          >
            {rowPerPagination?.map((pageSize) => (
              <Dropdown.Item
                // eventKey={pageSize}
                key={pageSize}
                onClick={() => {
                  table.setPageSize(pageSize);
                }}
              >
                {pageSize}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Button
            variant='outline-primary'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FiChevronsLeft /> Primera
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FiChevronLeft />
            Atras
          </Button>

          <Button
            variant='outline-primary'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente <FiChevronRight />
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            Ultima <FiChevronsRight />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
