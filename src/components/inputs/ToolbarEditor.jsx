import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiItalic,
  RiMarkPenLine,
  RiStrikethrough,
} from 'react-icons/ri';
export const ToolbarEditor = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // Array de eventos y nombres para los botones
  const buttons = [
    {
      event: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      name: 'h1',
    },
    {
      event: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      name: 'h2',
    },
    {
      event: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      name: 'h3',
    },
    { event: () => editor.chain().focus().setParagraph().run(), name: 'paragraph' },
    { event: () => editor.chain().focus().toggleBold().run(), name: 'bold' },
    { event: () => editor.chain().focus().toggleItalic().run(), name: 'italic' },
    { event: () => editor.chain().focus().toggleStrike().run(), name: 'strike' },
    {
      event: () => editor.chain().focus().toggleHighlight().run(),
      name: 'highlight',
    },
    {
      event: () => editor.chain().focus().setTextAlign('left').run(),
      name: 'left',
    },
    {
      event: () => editor.chain().focus().setTextAlign('center').run(),
      name: 'center',
    },
    {
      event: () => editor.chain().focus().setTextAlign('right').run(),
      name: 'right',
    },
    {
      event: () => editor.chain().focus().setTextAlign('justify').run(),
      name: 'justify',
    },
  ];

  return (
    <div className='customHeading p-2'>
      {buttons?.map((button, index) => (
        <>
          <Button
            variant='none'
            key={index}
            onClick={button.event}
            className={[getButtonClassName(editor, button), 'm-1']}
          >
            {button.name === 'h1' && <RiH1 />}
            {button.name === 'h2' && <RiH2 />}
            {button.name === 'h3' && <RiH3 />}
            {button.name === 'paragraph' && button.name}
            {button.name === 'bold' && <RiBold />}
            {button.name === 'italic' && <RiItalic />}
            {button.name === 'strike' && <RiStrikethrough />}
            {button.name === 'highlight' && <RiMarkPenLine />}
            {button.name === 'left' && <RiAlignLeft />}
            {button.name === 'right' && <RiAlignRight />}
            {button.name === 'center' && <RiAlignCenter />}
            {button.name === 'justify' && <RiAlignJustify />}
          </Button>
        </>
      ))}
    </div>
  );
};

// Función para obtener la clase del botón activo
const getButtonClassName = (editor, button) => {
  if (button.name === 'paragraph') {
    return editor.isActive('paragraph') ? 'btn-primary' : '';
  } else if (
    button.name === 'left' ||
    button.name === 'center' ||
    button.name === 'right' ||
    button.name === 'justify'
  ) {
    return editor.isActive({ textAlign: button.name }) ? 'btn-primary' : '';
  } else {
    return editor.isActive(button.name) ? 'btn-primary' : '';
  }
};
ToolbarEditor.prpTypes = {
  editor: PropTypes.any,
};
