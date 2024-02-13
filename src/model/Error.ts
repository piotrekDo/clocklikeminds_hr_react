import { string } from 'zod';

export interface AppHttpError {
  code: number;
  header: string;
  details: string;
}

export interface ApiError {
  code: number;
  message: string;
  details: string;
}
