export interface Cookies {
  [key: string]: string;
}

const useCookies = (): Cookies => {
  return document.cookie.split('; ').reduce((acc: Cookies, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});
};

export default useCookies;
