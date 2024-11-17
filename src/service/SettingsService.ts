import { AxiosResponse } from 'axios';
import { Setting } from '../model/Setting';
import APIclient from './APIclient';

export const fetchSettings = (signal?: AbortSignal) => {
  return APIclient.get<Setting[]>('/api/v1/settings/get-all', { signal }).then(
    (res: AxiosResponse<Setting[]>) => res.data
  );
};

// no abort controller- method used to switch mailing from enabled to disabled
export const switchMailingEnabled = () => {
  return APIclient.get<boolean>('/api/v1/settings/switch-mailing').then((res: AxiosResponse<boolean>) => res.data);
};
