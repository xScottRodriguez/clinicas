export const canSave = (data, setError) => {
  if (data.observations.length < 15) {
    setError('observations', {
      message: 'Minimo de caracteres es de 15',
    });
  }

  if (data.recipes.length < 15) {
    setError('recipes', {
      message: 'Minimo de caracteres es de 15',
    });
  }

  if (data.studios.length < 15) {
    setError('studios', {
      message: 'Minimo de caracteres es de 15',
    });
  }

  if (
    data.studios.length > 15 &&
    data.recipes.length > 15 &&
    data.observations.length > 15
  ) {
    return true;
  }

  return false;
};
