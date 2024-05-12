/** @format */

import React from 'react';
import { Alert, Col, Container, Image, Row } from 'react-bootstrap';
import { DrogasEstimulantes } from './DrogasEstimulantes';
import { DrogasAlucinogenas } from './DrogasAlucinogenas';
import { DrogasDepresoras } from './DrogasDepresoras';
import { useGetDrugsQuery } from '../../services/rtk-query/clinicalApi';
import { Loader } from '../ui/Loader';

export const TipoDrogasTabla = () => {
  const { data, isError, isLoading, isSuccess } = useGetDrugsQuery();
  return (
    <Container>
      {isLoading && <Loader />}
      {isError && <Alert variant='danger'>Error al cargar las toxinas</Alert>}
      {isSuccess && (
        <Row className='mb-3'>
          <Col md={12} className='d-flex gap-3 my-3'>
            <Image
              src={`/assets/img/drugs/3.svg`}
              fluid
              style={{ maxHeight: '4rem' }}
            />
            <h6>Tipo de drogas</h6>
          </Col>
          {data?.map((drug) => {
            if (drug?.nombre?.includes('Estimulantes')) {
              return (
                <Col md={12}>
                  <DrogasEstimulantes tipoToxina={data?.[0].tipoToxina} />
                </Col>
              );
            }
            if (drug.nombre.includes('Depresoras')) {
              return (
                <Col md={12}>
                  <DrogasDepresoras drugs={data[1].tipoToxina} />
                </Col>
              );
            }

            return (
              <Col md={12}>
                <DrogasAlucinogenas drugs={data[2].tipoToxina} />
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};
