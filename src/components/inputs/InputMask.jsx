/** @format */

import React from "react";
import ReactInputMask from "react-input-mask";
import PropTypes from "prop-types";
export const InputMask = ({ value, onChange, mask, ...rest }) => {
  return (
    <ReactInputMask
      {...rest}
      className="form-control"
      mask={mask}
      placeholder={mask}
      value={value}
      onChange={onChange}
    ></ReactInputMask>
  );
};

InputMask.propTypes = {
  value: PropTypes.number.isRequired,
  onchange: PropTypes.func.isRequired,
  mask: PropTypes.string.isRequired,
};
