import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import LayoutForm from '../../containers/layouts/LayoutForm';
import { useDispatch } from 'react-redux';
import { showSubEspecialidadModal } from '../../store/slices/uiSlice';
import { TableSubEspecialidades } from './components/TableSubEspecialidades';
import { SubEspecialidadModal } from './components/SubEspecialidadModal';

export const SubEspecialidades = () => {
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch(showSubEspecialidadModal());
  };
  return (
    <LayoutForm title='Listado de Sub Especialidades'>
      <Card className='shadow-none'>
        <Card.Header>
          <div className='d-flex flex-row  justify-content-between'>
            <article>
              <h3 className='py-0 my-0'>Sub Especialidades</h3>
            </article>
            <Button size='md' onClick={handleShow}>
              <AiOutlineMedicineBox size={24} />
              <span className='ml-auto'>Crear Sub Especialidad</span>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <TableSubEspecialidades />
        </Card.Body>
      </Card>
      <SubEspecialidadModal />
    </LayoutForm>
  );
};
