/** @format */

import React from 'react';
import LayoutForm from '../../containers/layouts/LayoutForm';
import { Footer } from '../../components/ui/Footer';

export default function Home() {
  return (
    <React.Fragment>
      <LayoutForm>
        <div className='card'>
          <div className='card-header'>Example Card</div>
          <div className='card-body'>
            This is a blank page. You can use this page as a boilerplate for
            creating new pages! This page uses the compact page header format, which
            allows you to create pages with a very minimal and slim page header so
            you can get right to showcasing your content.
          </div>
        </div>
      </LayoutForm>
      <Footer />
    </React.Fragment>
  );
}
