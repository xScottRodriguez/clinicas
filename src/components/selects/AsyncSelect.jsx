import React from 'react';

import AsyncSelect from 'react-select/async';

export const AsyncSelectCustom = ({
  loadOptions,
  isLoading,
  placeholder = 'Seleccione...',
  defaultOptionSelected,
  isclearable = false,
  ...rest
}) => {
  return (
    <AsyncSelect
      isClearable={isclearable}
      {...rest}
      loadingMessage={() => 'Cargando...'}
      noOptionsMessage={() => 'No hay opciones'}
      isLoading={isLoading}
      loadOptions={loadOptions}
      cacheOptions
      defaultOptions
      placeholder={placeholder}
      createOptionPosition='last'
      defaultOptionSelected={defaultOptionSelected}
      {...rest}
    />
  );
};
