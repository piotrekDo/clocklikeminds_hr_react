import { AxiosResponse } from 'axios';
import APIclient from './APIclient';
import { UserPtoSummary } from '../model/Pto';

export const fetchUserPtoSummary = (userId: number) => {
    const controller = new AbortController();
    const httpRequest = APIclient.get<UserPtoSummary>('/api/v1/pto/summary', {
        params: {
            id: userId
        }
    })
    .then(
      (res: AxiosResponse<UserPtoSummary>) => res.data
    );
    return { request: httpRequest, cancel: () => controller.abort() };
}