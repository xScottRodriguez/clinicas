import React from 'react';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = ({ data, isLoading, loadOptions, ...rest }) => {
  const mapOptionsToSelectFormat = (options) => {
    return options?.map((option) => {
      return {
        value: option?.id,
        label: option?.value,
      };
    });
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={mapOptionsToSelectFormat(data)}
      isLoading={isLoading}
      isDisabled={isLoading}
      options={mapOptionsToSelectFormat(data)}
      {...rest}
      isClearable
      // Puedes manejar el error de la solicitud aquí
    />
  );
};

export default CustomAsyncSelect;
