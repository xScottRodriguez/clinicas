import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { TableEspecialidades } from './components/TableEspecialidades';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import LayoutForm from '../../containers/layouts/LayoutForm';
import { useDispatch } from 'react-redux';
import { showEspecialidadModal } from '../../store/slices/uiSlice';
import { EspecialidadModal } from './components/EspecialidadModal';

export const Especialidades = () => {
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch(showEspecialidadModal());
  };
  return (
    <LayoutForm title='Listado de Especialidades'>
      <Card className='shadow-none'>
        <Card.Header>
          <div className='d-flex flex-row  justify-content-between'>
            <article>
              <h3 className='py-0 my-0'>Especialidades</h3>
            </article>
            <Button size='md' onClick={handleShow}>
              <AiOutlineMedicineBox size={24} />
              <span className='ml-auto'>Crear Especialidad</span>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <TableEspecialidades />
        </Card.Body>
      </Card>
      <EspecialidadModal />
    </LayoutForm>
  );
};
