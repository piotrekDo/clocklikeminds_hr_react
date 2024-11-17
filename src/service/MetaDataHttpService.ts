import { AxiosResponse } from 'axios';
import { MetaData } from '../model/MetaData';
import APIclient from './APIclient';

export const fetchMetaData = (signal?: AbortSignal) => {
  return APIclient.get<MetaData>('/api/v1/meta', { signal }).then((res: AxiosResponse<MetaData>) => res.data);
};
