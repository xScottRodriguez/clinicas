import React from 'react';

import AsyncSelect from 'react-select/async-creatable';

export const AsyncSelectCreate = ({
  loadOptions,
  isLoading,
  placeholder = 'Seleccione...',
  defaultOptionSelected,
  createOption = null,
  ...rest
}) => {
  if (createOption) {
    return (
      <AsyncSelectCreateWithOption
        loadOptions={loadOptions}
        isLoading={isLoading}
        defaultOptionSelected={defaultOptionSelected}
        createOption={createOption}
        placeholder={placeholder}
        loadingMessage={() => 'Cargando...'}
        noOptionsMessage={() => 'No hay opciones'}
        {...rest}
      />
    );
  }
  return (
    <AsyncSelect
      {...rest}
      loadingMessage={() => 'Cargando...'}
      noOptionsMessage={() => 'No hay opciones'}
      isLoading={isLoading}
      loadOptions={loadOptions}
      isSearchable
      defaultOptions
      placeholder={placeholder}
      createOptionPosition='last'
    />
  );
};

export const AsyncSelectCreateWithOption = ({
  loadOptions,
  isLoading,
  placeholder = 'Seleccione...',
  defaultOptionSelected,
  createOption,
  ...rest
}) => {
  return (
    <AsyncSelect
      {...rest}
      loadingMessage={() => 'Cargando...'}
      noOptionsMessage={() => 'No hay opciones'}
      isLoading={isLoading}
      loadOptions={loadOptions}
      isSearchable
      defaultOptions
      placeholder={placeholder}
      createOptionPosition='last'
      onCreateOption={(inputValue) => {
        createOption(inputValue);
      }}
    />
  );
};
