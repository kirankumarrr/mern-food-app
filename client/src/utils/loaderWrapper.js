import { clearLoading, setLoading } from 'store/loading/action';
export const loadingWrapper = async (cb, key, dispatch) => {
  try {
    dispatch(setLoading(key));
    await cb();
  } finally {
    dispatch(clearLoading(key));
  }
};
