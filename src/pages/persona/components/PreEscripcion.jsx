import React, { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import { Controller, useForm } from 'react-hook-form';
import { RichTextEditor } from '../../../components/inputs/RichTextEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { toastAdapter } from '../../../plugins';
import {
  clinicalApi,
  useConsultaByIdQuery,
  useUpdateConsultaMutation,
} from '../../../services/rtk-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setConsulta,
  setConsultaTabFalse,
  toggleConsultasTab,
} from '../../../store/slices/uiSlice';

const rules = {
  required: {
    value: true,
    message: 'Campo requerido',
  },
};
export const PreEscripcion = () => {
  const { id = null, consultaId = null } = useParams();
  const [updateConsulta] = useUpdateConsultaMutation();
  const { isSuccess, data, isLoading } = useConsultaByIdQuery(consultaId);
  const { data: consulta } =
    clinicalApi.endpoints.consultaById.useQuery(consultaId);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      prescripcionMedicamentos: '',
      observations: '',
      prescripcionRayosX: '',
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    onUpdate: ({ editor }) => {
      setValue('observations', editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {},
    onCreate: ({ editor }) => {
      editor.commands.setContent(getValues('observations'));
    },
  });

  const prescripcionMedicamentos = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    onUpdate: ({ editor }) => {
      setValue('prescripcionMedicamentos', editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {},
    onCreate: ({ editor }) => {
      editor.commands.setContent(getValues('prescripcionMedicamentos'));
    },
  });

  const prescripcionRayosX = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    onUpdate: ({ editor }) => {
      setValue('prescripcionRayosX', editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {},
    onCreate: ({ editor }) => {
      // editor.commands.clearContent();
      editor.commands.setContent(getValues('prescripcionRayosX'));
    },
  });

  useEffect(() => {
    if (consultaId && isSuccess) {
      dispatch(setConsultaTabFalse());
      dispatch(setConsulta(consultaId));
      setValue('observations', data.observaciones);
      setValue('prescripcionMedicamentos', data.recetas);
      setValue('prescripcionRayosX', data.estudios);
    }
  }, [data, consultaId, isSuccess, isLoading]);

  // const resetRichTexts = () => {
  //   editor.commands.clearContent();
  //   prescripcionMedicamentos.commands.clearContent();
  //   prescripcionRayosX.commands.clearContent();
  // };
  const onSavePreEscripcion = (data) => {
    const payload = {
      recetas: data.prescripcionMedicamentos,
      estudios: data.prescripcionRayosX,
      observaciones: data.observations,
      idExpediente: +id,
    };

    toastAdapter.promise({
      promise: updateConsulta({ body: payload, consultaId }).unwrap(),
      errorMessage: (error) => {
        return 'Error al crear la prescripcion';
      },
      loadingMessage: 'Guardando Prescripcion',
      successMessage: ({ id }) => {
        dispatch(toggleConsultasTab());
        return 'Prescripcion Guardada';
      },
    });
  };
  return (
    <Container
      style={{
        overflowX: 'clip',
      }}
    >
      <Form>
        <Form.Group className='py-4'>
          <Form.Label>Prescripción de medicamentos</Form.Label>
          <Controller
            control={control}
            rules={rules}
            name='prescripcionMedicamentos'
            render={({ field }) => (
              <RichTextEditor {...field} editor={prescripcionMedicamentos} />
            )}
          />

          {errors?.prescripcionMedicamentos && (
            <Form.Text className='text-danger'>
              {errors.prescripcionMedicamentos.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='py-4'>
          <Form.Label>Prescripción de laboratorio clinico o rayos x</Form.Label>
          <Controller
            control={control}
            name='prescripcionRayosX'
            render={({ field }) => (
              <RichTextEditor {...field} editor={prescripcionRayosX} />
            )}
          />
        </Form.Group>
        <Form.Group className='pb-4'>
          <Form.Label>Observaciones</Form.Label>
          <Controller
            control={control}
            name='observations'
            render={({ field }) => <RichTextEditor {...field} editor={editor} />}
          />
        </Form.Group>

        <Button
          size='lg'
          variant='primary'
          onClick={handleSubmit(onSavePreEscripcion)}
        >
          Guardar Prescripción
        </Button>
      </Form>
    </Container>
  );
};
