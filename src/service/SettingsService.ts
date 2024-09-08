import { AxiosResponse } from 'axios';
import { Setting } from '../model/Setting';
import APIclient from './APIclient';

export const fetchSettings = () => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<Setting[]>('/api/v1/settings/get-all').then(
    (res: AxiosResponse<Setting[]>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const switchMailingEnabled = () => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<boolean>('/api/v1/settings/switch-mailing').then(
    (res: AxiosResponse<boolean>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};
