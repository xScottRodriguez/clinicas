import _ from 'lodash';
import { updateNestedItemsActives } from '../../../../../utils';

const filterRelationshipWithEmptyArray = (relationships) =>
  relationships.filter((relationship) => relationship.parentesco.length);

const mapHereditaryHistory = (hereditaryHistories) =>
  hereditaryHistories?.map((hereditaryHistory) => {
    return {
      id: hereditaryHistory.enfermedadId,
      nombre: hereditaryHistory.nombreEnfermedad,
      familiares: mapKinship(
        hereditaryHistory.parentescos,
        hereditaryHistory.enfermedadId
      ),
      descripcion: hereditaryHistory.comentario?.trim() ?? null,
    };
  });

const mapKinship = (kinships, parentKey) => {
  if (!kinships) return [];

  return kinships?.map((kinship) => ({
    id: kinship.id,
    code: `${kinship.id}`,
    valor: _.capitalize(kinship.name),
    isChecked: true,
    parentId: parentKey,
  }));
};
const mapUpdateDataToHereditary = (data, dataRelationShip) =>
  data?.map((disease, index) => ({
    ...disease,
    familiares: dataRelationShip?.map((relation) => ({
      ...relation,
      isChecked: false,
      parentId: disease.id,
    })),
  }));

const mapToLoadData = (hereditario, expedientHereditary) => {
  const mappedHereditaryHistory = mapHereditaryHistory(expedientHereditary);

  return updateNestedItemsActives({
    items: hereditario,
    actives: mappedHereditaryHistory,
    idKey: 'id',
    nestedKey: 'familiares',
  });
};

const loadMapData = (hereditario, expedientHereditary) => {
  return {
    hereditario,
    expedientHereditary,
  };
};
export {
  filterRelationshipWithEmptyArray,
  mapHereditaryHistory,
  mapKinship,
  mapUpdateDataToHereditary,
  mapToLoadData,
  loadMapData,
};
