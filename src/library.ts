export const backgroundGradient = `linear-gradient(
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

export const loggedBackgorund = `linear-gradient(
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

export const adminBackgroundGradient =
  'linear-gradient(144deg, rgba(199,151,151,1) 0%, rgba(219,72,89,1) 35%, rgba(255,0,0,1) 100%)';

const BASE_URL_LOCALHOST = 'http://localhost:8080';
const BASE_URL_AZURE = 'https://holidayapp.politewater-8bb1c971.westeurope.azurecontainerapps.io';


export const BASE_URL = BASE_URL_AZURE;

export const REACT_APP_REDIRECT_URL = BASE_URL + '/login/oauth2/code/google';
export const GOOGLE_AUTH_URL = `${BASE_URL}/oauth2/authorize/google?redirect_uri=${REACT_APP_REDIRECT_URL}`;