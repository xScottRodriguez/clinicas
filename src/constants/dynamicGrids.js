/** @format */

const TIPOS_TABAQUISMO = [
  { value: 1, image: "1.svg", text: "No Fuma" },
  { value: 2, image: "2.svg", text: "Fumador" },
  { value: 3, image: "3.svg", text: "Ex Fumador" },
  { value: 4, image: "4.svg", text: "Fumador Pasivo" },
  { value: 6, image: "6.svg", text: "Exposición a biomasa" },
  // Agrega más elementos aquí
];
const TIPOS_ALCOLISMO = [
  { value: 1, image: "1.svg", text: "No Ingiere Alcohol" },
  { value: 2, image: "4.svg", text: "Bebedor excepcional" },
  { value: 3, image: "2.svg", text: "Ingiere Alcohol" },
];
const TIPOS_DROGAS = [
  { value: 1, image: "1.svg", text: "No Consume Drogas" },
  { value: 2, image: "2.svg", text: "Consume Drogas" },
];
const FOLDERS = {
  SMOOKING: "smooking",
  DRINKS: "drinks",
  DRUGS: "drugs",
};
export { TIPOS_TABAQUISMO, TIPOS_ALCOLISMO, FOLDERS, TIPOS_DROGAS };
