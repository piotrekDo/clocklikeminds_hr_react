import { create } from 'zustand';
import { ApiError, AppHttpError } from '../model/Error';
import { AxiosError } from 'axios';

interface HttpErrorState {
  error: AppHttpError | undefined;
  setError: (error: Error) => void;
  clearError: () => void;
}

const mapAxiosToAppError = (err: Error): AppHttpError => {
  const appErr: AxiosError = <AxiosError>err;
  let code: number = 0;
  let header: string = '';
  let details: string = '';

  if (appErr.response && appErr.response.data) {
    const data: ApiError = <ApiError>appErr.response.data;
    (code = data.code), (header = data.message), (details = data.details);
  } else if (appErr.code === 'ERR_NETWORK') {
    (code = 504), (header = 'Serwer nieosiągalny');
  } else {
    (code = 500), (header = appErr.code || '');
  }

  return {
    code: code,
    header: header,
    details: details,
  };
};

const useHttpErrorState = create<HttpErrorState>(set => ({
  error: undefined,
  clearError: () => set({ error: undefined }),
  setError: err =>
    set({
      error: mapAxiosToAppError(err),
    }),
}));

export default useHttpErrorState;
