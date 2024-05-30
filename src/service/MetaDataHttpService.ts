import { AxiosResponse } from 'axios';
import { MetaData } from '../model/MetaData';
import APIclient from './APIclient';

export const fetchMetaData = () => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<MetaData>('/api/v1/meta').then((res: AxiosResponse<MetaData>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};
