import React from 'react';
import { Image, Stack } from 'react-bootstrap';
const ImageDefault = '/assets/img/illustrations/profiles/profile-1.png';
export const ImageComponents = () => {
  return (
    <>
      <article className='d-flex flex-column  text-center align-items-center'>
        <Image src={ImageDefault} rounded height={100} width={100} />
        <span>JPG o PNG no mayor a 10 MB</span>
      </article>
    </>
  );
};
