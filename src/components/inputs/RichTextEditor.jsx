import { EditorContent } from '@tiptap/react';
import './tiptap.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { ToolbarEditor } from './ToolbarEditor';
export const RichTextEditor = ({ onChange, editor, ...rest }) => {
  return (
    <Container>
      <ToolbarEditor editor={editor} />
      <EditorContent editor={editor} />
    </Container>
  );
};
