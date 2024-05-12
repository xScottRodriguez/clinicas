import { BLOOD_TYPES } from '../../../../../constants';

const mapNoPathologicalDiseases = (data) => {
  const { actividadFisica, id, idExpediente, activeBlood, ...rest } = data;
  return {
    ...rest,
    activeBlood: activeBlood ?? 'Ninguno',
    actividadFisicaAndDream: actividadFisica,
  };
};

async function simulateButtonClick({
  donor,
  bloodBag,
  bloodVias,
  centerVia,
  timeout,
  bloodTypes,
  setBloodCompatibility,
}) {
  const newCompatibility = [];

  if (!Array.isArray(BLOOD_TYPES[donor])) return;
  for (let item of BLOOD_TYPES[donor]) {
    const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
    const height = 50 + 50 * Math.floor(recipent_index / 2);
    const blood_height = 125 - 25 * Math.floor(recipent_index / 2);

    if (bloodBag) bloodBag.style.height = `${blood_height}px`;
    if (centerVia) centerVia.style.height = `${height}px`;
    await timeout(100);
    if (bloodVias) bloodVias[recipent_index].style.width = '100%';
    if (bloodTypes) bloodTypes[recipent_index].classList.add('highlightText');
    if (bloodTypes) newCompatibility.push(bloodTypes[recipent_index].textContent);
  }

  setBloodCompatibility(newCompatibility);
}

export { mapNoPathologicalDiseases, simulateButtonClick };
