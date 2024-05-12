/** @format */
import React, { useEffect, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/editor.css';
import { viewFieldsMapping } from '../../../constants';
import { RichTextEditor } from '../../../components/inputs/RichTextEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import SpeechToText from '../../../plugins';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';
export default function FormDiagnostico({
  trans,
  sliceName,
  propertySliceName,
  title,
}) {
  const [editorReady, setEditorReady] = useState(false);
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const recognition = new SpeechToText(
    (finalTranscript) => {
      if (editorReady) {
        const cleanTrans = finalTranscript.replace(/<p><\/p>/g, ''); // Eliminar etiquetas <p></p> vacías
        editor?.commands?.insertContent(` ${cleanTrans.trim()}`);
        const newCOntent = editor?.getHTML();
        updateNotesToRedux(newCOntent);
      }
    },
    () => setSpeechRecognitionActive(false),
    (interimTranscript) => console.log('Interim transcript:'),
    (error) => console.error('Speech recognition error:', error)
  );
  const { control, setValue, getValues } = useForm({
    defaultValues: {
      notas: ``,
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
    onDestroy: (props) => {
      props?.editor?.commands?.clearContent();
    },
    onCreate: ({ editor }) => {
      setEditorReady(true);
      editor.commands.setContent(trans);
      onChangeNotes(trans);
    },
    onUpdate: ({ editor }) => {
      const newContent = editor?.getHTML();
      onChangeNotes(newContent);
    },
    content: getValues('notas'),
    onSelectionUpdate: ({ editor }) => {},
  });

  useEffect(() => {
    if (editorReady) {
      setValue('notas', trans);
      editor?.commands.setContent(trans);
      updateNotesToRedux(trans);
    }
  }, [editorReady, trans]);
  const dispatch = useDispatch();

  const updateNotesToRedux = useCallback(
    (notes) => {
      const fieldPath = viewFieldsMapping[sliceName];
      const reducerName = propertySliceName
        ? fieldPath[propertySliceName]
        : viewFieldsMapping[sliceName];

      dispatch({
        type: `${sliceName}/${reducerName}`,
        payload: notes,
      });
    },
    [sliceName, propertySliceName, dispatch]
  );

  const onChangeNotes = useCallback(
    (newValue) => {
      setValue('notas', newValue);
      updateNotesToRedux(newValue);
    },
    [setValue, updateNotesToRedux]
  );

  const handleSpeechRecognitionStart = () => {
    setSpeechRecognitionActive(true);
    recognition.startListening();
  };

  const handleSpeechRecognitionStop = () => {
    setSpeechRecognitionActive(false);
    recognition.stopListening();
  };

  return (
    <Form>
      <Form.Group className='container'>
        <div className='d-flex justify-content-between  m-2'>
          <Form.Label>{title}</Form.Label>
          <ButtonGroup>
            <Button
              disabled={speechRecognitionActive}
              onClick={handleSpeechRecognitionStart}
              variant='outline-primary'
            >
              <CiMicrophoneOn size={24} />
            </Button>
            <Button
              variant='outline-dark'
              disabled={!speechRecognitionActive}
              onClick={handleSpeechRecognitionStop}
            >
              <CiMicrophoneOff size={24} />
            </Button>
          </ButtonGroup>
        </div>
        <Controller
          name='notas'
          control={control}
          render={({ field }) => (
            <RichTextEditor
              {...field}
              onChange={onChangeNotes}
              newContent={getValues('notas')}
              editor={editor}
            />
          )}
        />
      </Form.Group>
    </Form>
  );
}

FormDiagnostico.propTypes = {
  trans: PropTypes.string.isRequired,
  sliceName: PropTypes.string,
  title: PropTypes.string.isRequired,
};
