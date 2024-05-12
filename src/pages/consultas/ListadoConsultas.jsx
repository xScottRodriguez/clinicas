import React, { useState } from 'react';
import { TablePlugin } from '../../plugins/components/TablePlugin';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import {
  clinicalApi,
  useConsultasPorExpedienteQuery,
  useSaveInterrogationMutation,
} from '../../services/rtk-query/clinicalApi';
import { SanitizeRichText } from '../../components/ui/SanitizeRichText';
import { OptionsColumnConsultas } from './enfermedades/components/OptionsColumnConsultas';
import { useDispatch } from 'react-redux';
import { setInterrogatorioTab } from '../../store/slices/uiSlice';
import { getDataCookie } from '../../utils';
import { toastAdapter } from '../../plugins/hot-toast.plugin';
import { selectAlert } from '../../plugins/sweetAlert.plugin';
const columns = [
  { header: 'id', accessorKey: 'id' },
  {
    header: 'estudios',
    accessorKey: 'estudios',
    cell: ({ row: { original } }) => <SanitizeRichText html={original.estudios} />,
  },
  {
    header: 'observaciones',
    accessorKey: 'observaciones',
    cell: ({ row: { original } }) => (
      <SanitizeRichText html={original.observaciones} />
    ),
  },
  {
    header: 'recetas',
    accessorKey: 'recetas',
    cell: ({ row: { original } }) => <SanitizeRichText html={original.recetas} />,
  },
  {
    header: 'Opciones',
    accessorKey: 'id',
    cell: ({ row: { original } }) => <OptionsColumnConsultas cell={original?.id} />,
  },
];
export default function ListadoConsultas() {
  const [filtering, setFiltering] = useState('');
  const { id = null } = useParams();
  const { data, isFetching } = useConsultasPorExpedienteQuery(id);
  const { data: medicos } = clinicalApi.endpoints.medicos.useQuery();
  const [saveInterrogationMutation] = useSaveInterrogationMutation();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const data = getDataCookie('medico');
      if (!data?.medico?.id) {
        return selectAlert({
          title: 'Seleccione un medico',
          text: 'Seleccione un Medico para continuar',
          inputPlaceHolder: 'Seleccione...',
          inputOptions: medicos
            .map((medico) => {
              return {
                label: `${medico.nombres} ${medico.apellidos}`,
                value: medico.id,
              };
            })
            .reduce((acc, insurer) => {
              acc[insurer.value] = insurer.label;
              return acc;
            }, {}),
        }).then((resp) => {
          if (resp.isConfirmed) {
            handleSave(resp.value);
          }
        });
      } else {
        handleSave(data?.medico?.id);
      }
    } catch (error) {
      console.error('ERROR AL CREAR LA CONSULTA');
    }
  };
  const handleSave = async (medico) => {
    toastAdapter.promise({
      promise: saveInterrogationMutation({
        idExpediente: id,
        medicoId: medico,
      }).unwrap(),
      successMessage: (data) => {
        dispatch(setInterrogatorioTab());
        navigator(`/expedientes-medicos/${id}/consultas/${data?.id}`);
        return 'Consulta Creada';
      },
      errorMessage: 'Error al crear consulta',
    });
  };
  return (
    <Container fluid>
      <Row className='justify-content-end'>
        <Col className='text-end'>
          <Button onClick={handleClick} size='lg' className='ml-auto mb-3 '>
            <FaPlus /> Nueva Consulta
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <TablePlugin
            columns={columns}
            data={data}
            filtering={filtering}
            onFilteringChange={(data) => setFiltering(data)}
            isFetching={isFetching}
            isInternalFiltering={false}
          />
        </Col>
      </Row>
    </Container>
  );
}
