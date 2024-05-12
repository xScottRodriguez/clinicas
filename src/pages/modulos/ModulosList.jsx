/** @format */

import React, { useMemo, useRef } from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import PeticionesAxios from '../../services/peticionesAxios';
import Alertas from '../../services/Alertas';
import BontonesAcciones from '../../components/botones/BontonesAcciones';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useNavigate } from 'react-router-dom';
import { useGetModulesQuery } from '../../services/rtk-query';
import { TablePlugin } from '../../plugins/components/TablePlugin';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';

const CONTEXT_MENU = 'context-menu-test';
export default function ModulosList() {
  const { data, isFetching } = useGetModulesQuery();
  const navigate = useNavigate();
  const tablaRef = useRef();
  const { show } = useContextMenu({
    id: CONTEXT_MENU,
  });

  const Delete = (id, activo) => {
    Alertas.loading_reload(true);
    const data = {
      activo,
    };
    PeticionesAxios.PATCH(`modulo/${id}`, data).then((result) => {
      Alertas.loading_reload(false);

      if (result !== false) {
        if (result.status === 200) {
          tablaRef.current.clear();
          if (activo === true) {
            Alertas.toast_success('¡Módulos activado con éxito!');
          } else if (activo === false) {
            Alertas.toast_success('¡Módulo anulado con éxito!');
          }
        }
      }
    });
  };
  const handleDelete = (id, activo) => {
    if (activo === false) {
      Alertas.QuestionYesNo(
        '¿Deseas activar este modulo?',
        'Administración de Suyanet'
      ).then((resp) => {
        if (resp) {
          Delete(id, true);
        }
      });
    } else if (activo === true) {
      Alertas.QuestionYesNo(
        '¿Desea desativar este modulo?',
        'Administración de proyectos'
      ).then((resp) => {
        if (resp) {
          Delete(id, false);
        }
      });
    }
  };
  const activado = ({ row: { original } }) => {
    return (
      <div>
        {original?.activo ? (
          <span className='badge bg-green-soft text-green'>Activado</span>
        ) : (
          <span className='badge bg-red-soft text-red'>Desactivado</span>
        )}
      </div>
    );
  };
  function rankFormatter({ row: { original } }) {
    return (
      <BontonesAcciones
        ruta={`/modulos/update/${original?.id}`}
        borrar={() => handleDelete(original?.id, original?.activo)}
      />
    );
  }
  const rowEvents = (e) => {
    // console.log(e);
    // alert('hola');
    // show({
    //   props: {
    //     ...original,
    //   },
    // });
  };

  const columnDefs = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id' },
      { header: 'NOMBRE', accessorKey: 'nombre' },
      {
        header: 'MODULO PRINCIPAL',
        accessorKey: 'principal.nombre',
      },
      {
        header: 'ESTADO',
        accessorKey: 'activo',
        cell: activado,
      },
      {
        accessorKey: 'actions',
        header: 'ACCIONES',
        cell: rankFormatter,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const actualizarRol = (props) => {
    navigate(`/modulos/update/${props[0].id}`);
  };

  const estatusModul = ({ event, props, row }) => {
    const id = props[0].id;
    const activo = props[0].activo;
    handleDelete(id, activo);
  };

  function IconFont(props) {
    return <i {...props} style={{ marginRight: '10px' }} />;
  }

  return (
    <LayoutForm title='Módulos'>
      <Stack>
        <h3>Lista de Módulos</h3>
        <hr />
      </Stack>

      <Row className='justify-content-end'>
        <Col className='text-end'>
          <Button
            onClick={() => {
              navigate('/modulos/nuevo');
            }}
            size='lg'
            className='ml-auto mb-3 '
          >
            <FaPlus /> Nuevo Modulo
          </Button>
        </Col>
      </Row>
      <TablePlugin
        data={data}
        isFetching={isFetching}
        columns={columnDefs}
        isInternalFiltering={true}
        contextMenu={rowEvents}
      />

      <Menu id={CONTEXT_MENU}>
        <Item onClick={actualizarRol}>
          <IconFont className='fas fa-edit' /> ACTUALIZAR
        </Item>
        <Item onClick={estatusModul}>
          <IconFont className='far fa-trash-alt' /> ELIMINAR
        </Item>
      </Menu>
    </LayoutForm>
  );
}
