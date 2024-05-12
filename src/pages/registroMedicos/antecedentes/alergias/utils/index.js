export const mapAllergies = (allergies) =>
  allergies?.map((allergie) => {
    return {
      id: allergie.alergiaId ?? allergie.id,
      nombre: allergie.nombre ?? allergie.nombreAlergia,
      comentario: allergie.comentario,
      selectedSymptoms: selectedSymptoms(allergie),
      isChecked: allergie.isChecked ?? true,
      foto: `${process.env.PUBLIC_URL}/assets/img/illustrations/profiles/${allergie.id}.svg`,
    };
  });

const selectedSymptoms = (allergie) => {
  if (!allergie.sintomas) return [];

  return 'selectedSymptoms' in allergie
    ? allergie?.selectedSymptoms?.map((sintomaSeleccionado) => ({
        id: sintomaSeleccionado,
        name: sintomaSeleccionado?.name ?? sintomaSeleccionado?.nombre,
      }))
    : allergie?.sintomas?.map((sintoma) => ({
        id: sintoma.id,
        name: sintoma?.name ?? sintoma?.nombre,
      }));
};

export const updateItemActives = ({ allergies, allergiesActives }) =>
  allergies?.map((allergie) => {
    const allergieActiveFounded = allergiesActives.find(
      (allergieActive) => allergieActive.id === allergie.id
    );

    if (!allergieActiveFounded?.isChecked) return allergie;

    if (allergieActiveFounded?.isChecked) return allergieActiveFounded;

    return { ...allergieActiveFounded, isChecked: true };
  });
