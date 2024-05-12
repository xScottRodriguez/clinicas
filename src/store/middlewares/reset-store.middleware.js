import { clearAll } from '../slices/antecedentes';
import {
  clearActivePatient,
  clearActiveProfesion,
  clearActiveRelationShip,
  clearAllBasicInformation,
} from '../slices/expedienteSlice';
import { clearExploracionFisica } from '../slices/exploracionFisica';
import { clearIncapacity } from '../slices/incapacidad';
import { clearInterrogatorio } from '../slices/interrogatorio';
import { clearObstetricos } from '../slices/obstetricos';
import { clearAllTabs } from '../slices/uiSlice';

export const resetStoreMiddleware = (store) => (next) => (action) => {
  if (action.type === 'RESET_STORE') {
    store.dispatch(clearInterrogatorio());
    store.dispatch(clearAllTabs());
    store.dispatch(clearAll());
    store.dispatch(clearAllBasicInformation());

    store.dispatch(clearExploracionFisica());
    store.dispatch(clearIncapacity());
    store.dispatch(clearObstetricos());

    store.dispatch(clearActivePatient());
    store.dispatch(clearActiveProfesion());
    store.dispatch(clearActiveRelationShip());
  }
  return next(action);
};
