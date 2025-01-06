import { AxiosResponse } from 'axios';
import APIclient from './APIclient';

export const generateCreativeWorkTemplate = (monthIndex: number, year: number) => {
  APIclient.get<Blob>('/api/v1/report/generate-creative-work-report-template', {
    responseType: 'blob',
    params: {
      monthIndex: monthIndex,
      year: year,
    },
  })
    .then((response: AxiosResponse<Blob>) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const date = new Date(year, monthIndex -1, 1);
      const desc = date.toLocaleDateString('pl-PL', {month: 'long', year: 'numeric'});
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ewidencja czasu prac twórczych ${desc}.xlsx`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error while generating the template:', error);
    });
};
