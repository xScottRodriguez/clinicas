import toast from 'react-hot-toast';
import { POSITIONS_TOASTS } from '../constants/position-toasts';
const threeSeconds = 3000;
const error = ({
  message = 'Algo Salio Mal ',
  duration = threeSeconds,
  position = POSITIONS_TOASTS.BOTTOM_RIGHT,
}) => {
  toast.error(message, {
    duration: duration,
    position: position,
  });
};

const success = ({
  message = 'Operacion Exitosa ',
  duration = threeSeconds,
  position = POSITIONS_TOASTS.BOTTOM_RIGHT,
}) => {
  toast.success(message, {
    duration: duration,
    position: position,
  });
};

const loading = ({
  message = 'Cargando ',
  duration = threeSeconds,
  position = POSITIONS_TOASTS.BOTTOM_RIGHT,
}) => {
  toast.loading(message, {
    duration: duration,
    position: position,
  });
};

const info = ({
  message = 'Informacion ',
  duration = threeSeconds,
  position = POSITIONS_TOASTS.BOTTOM_RIGHT,
}) => {
  toast(message, {
    duration: duration,
    position: position,
  });
};

const blank = ({
  message = ' ',
  duration = threeSeconds,
  position = POSITIONS_TOASTS.BOTTOM_RIGHT,
}) => {
  toast(message, {
    duration: duration,
    position: position,
  });
};

const promise = ({
  promise,
  loadingMessage = 'Cargando...',
  successMessage = 'Operacion Exitosa',
  errorMessage = 'Algo Salio Mal',
}) => {
  return toast.promise(promise, {
    loading: loadingMessage,
    success: successMessage,
    error: errorMessage,
  });
};

const toastAdapter = {
  error,
  success,
  loading,
  info,
  blank,
  promise,
};
export { toastAdapter };
