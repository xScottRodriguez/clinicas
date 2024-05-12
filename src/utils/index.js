import { ARR_TAGS } from '../constants';
import { clinicalApi } from '../services/rtk-query/clinicalApi';

const updateNestedItemsActives = ({
  items,
  actives,
  idKey = 'id',
  nestedKey = 'familiares',
}) => {
  return checkItemActive({ items, actives, idKey, nestedKey });
};

const findElement = ({ arr, idKey, item }) =>
  arr?.find((element) => element[idKey] === item[idKey]);

const checkItemActive = ({
  items,
  actives,
  idKey = 'id',
  nestedKey = 'familiares',
}) => {
  return items?.map((item) => {
    const itemActiveFound = findElement({
      arr: actives,
      idKey,
      item,
    });

    if (!itemActiveFound?.[nestedKey]?.length) {
      const descripcion = itemActiveFound?.descripcion ?? item?.descripcion ?? null;

      return {
        ...item,
        descripcion,
      };
    }

    const modifiedActiveItem = item?.[nestedKey].map((nestedItem) => {
      const resultItem = findElement({
        arr: itemActiveFound?.[nestedKey],
        idKey,
        item: nestedItem,
      });

      return resultItem
        ? {
            ...nestedItem,
            isChecked: true,
            descripcion: resultItem?.descripcion ?? nestedItem.descripcion,
          }
        : nestedItem;
    });

    return {
      ...itemActiveFound,
      [nestedKey]: modifiedActiveItem.length
        ? modifiedActiveItem
        : itemActiveFound[nestedKey],
    };
  });
};

function obtenerURLBlob(blob) {
  return URL.createObjectURL(blob);
}
function saveOnCookies(propName, data) {
  document.cookie = `${propName}=${JSON.stringify(data)};path=/`;
  return;
}

const getDataCookie = (propname) => {
  const nombreCookie = `${propname}=`;
  const cookies = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie) === 0) {
      return JSON.parse(cookie.substring(nombreCookie.length, cookie.length));
    }
  }
  return null;
};

function clearCookies(propName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const cookieName = cookie.split('=')[0];
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
  return;
}
const makeArray = (num) => Array.from({ length: num }, (_, index) => index);

function cleanCacheApi() {
  clinicalApi.util.resetApiState();
}
export {
  updateNestedItemsActives,
  obtenerURLBlob,
  saveOnCookies,
  getDataCookie,
  makeArray,
  clearCookies,
  cleanCacheApi,
};

export * from './form-scshemas';

export * from './calendar-messages-es';
