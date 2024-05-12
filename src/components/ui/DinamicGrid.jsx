/** @format */

import React, { useState } from 'react';
import { Col, Image, Row, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
const buttonStyles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'none',
};
const DynamicGrid = ({
  items,
  folder,
  onChange,
  itemCheked,
  handleSetScrollPosition,
}) => {
  const [value, setValue] = useState(1);

  const handleClick = (item) => {
    const currentPosition = window.scrollY || document.documentElement.scrollTop;
    setValue(item.value);
    onChange(item.value);
    console.log({ currentPosition });
    handleSetScrollPosition(currentPosition);
  };
  return (
    <>
      <Row className='mb-3'>
        {items?.map((item, index) => (
          <Col md={4} className='mb-3' key={index}>
            <ToggleButton
              style={buttonStyles}
              className='mb-2 '
              id={`toggle-check-${item.text}-${index}`}
              type='radio'
              variant='outline-primary'
              checked={
                itemCheked ? +itemCheked === +item.value : value === +item.value
              }
              value={item.text}
              onChange={() => handleClick(item)}
            >
              <div>
                <Image
                  src={`/assets/img/${folder}/${item.image}`}
                  fluid
                  style={{ maxHeight: '3rem' }}
                />
                <h6
                  className={`px-5 ${
                    itemCheked
                      ? itemCheked === item.value
                        ? 'text-white'
                        : 'text-dark'
                      : value === item.value
                      ? 'text-white'
                      : 'text-dark'
                  }`}
                >
                  {item.text}
                </h6>
              </div>
            </ToggleButton>
          </Col>
        ))}
      </Row>
    </>
  );
};

DynamicGrid.propTypes = {
  items: PropTypes.array.isRequired,
  folder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  itemCheked: PropTypes.bool.isRequired,
  handleSetScrollPosition: PropTypes.func.isRequired,
};

export default DynamicGrid;
