import { useDispatch } from 'react-redux';
import { resetStore } from '../store/actions/reset-store';

export const useResetStore = () => {
  const dispatch = useDispatch();

  const reset = () => dispatch(resetStore());

  return reset;
};
