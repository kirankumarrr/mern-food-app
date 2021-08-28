import { clearLoading, setLoading } from 'store/loading/action';
export const loadingWrapper = (cb, key, dispatch) => {
  try {
    dispatch(setLoading(key));
    cb();
  } finally {
    dispatch(clearLoading(key));
  }
};
