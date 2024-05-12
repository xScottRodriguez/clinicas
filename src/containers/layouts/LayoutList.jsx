/** @format */

import React from 'react';
import HeaderPage from '../../components/theme/header/Header';

export default function LayoutList(props) {
  return (
    <>
      <HeaderPage title={props.title} tools={props.tools} />

      {/* Main page content*/}
      <div className='p-4 bg-light'>{props.children}</div>
    </>
  );
}
