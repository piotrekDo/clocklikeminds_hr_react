import { Theme, ThemeConfig } from './model/Theme';

export const lightBackground = `linear-gradient(
    125deg,
    hsl(0deg 0% 100%) 0%,
    hsl(202deg 38% 89%) 9%,
    hsl(202deg 38% 78%) 18%,
    hsl(201deg 38% 67%) 27%,
    hsl(201deg 42% 58%) 36%,
    hsl(202deg 49% 53%) 45%,
    hsl(203deg 58% 49%) 55%,
    hsl(203deg 83% 42%) 64%,
    hsl(206deg 100% 41%) 73%,
    hsl(212deg 100% 43%) 82%,
    hsl(218deg 100% 45%) 91%,
    hsl(227deg 91% 47%) 100%
  )`;

export const darkBackgorund = `linear-gradient(135deg, rgba(31,61,145,1) 0%, rgba(60,34,34,1) 100%)`;
export const darkElementBg = `#385898`;

const BASE_URL_LOCALHOST = 'http://localhost:8080';
const BASE_URL_AZURE = 'https://holidayapp.politewater-8bb1c971.westeurope.azurecontainerapps.io';
const BASE_URL_VM = 'https://hr.cloud.clocklikeminds.com:8443';
export const BASE_URL = BASE_URL_VM;

export const REACT_APP_REDIRECT_URL = BASE_URL + '/login/oauth2/code/google';
export const GOOGLE_AUTH_URL = `${BASE_URL}/oauth2/authorize/google?redirect_uri=${REACT_APP_REDIRECT_URL}`;
