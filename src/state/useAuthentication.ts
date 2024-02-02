import { create } from 'zustand';
import { AuthenticationResponse } from '../model/User';


interface AuthStore {
  appUser: AuthenticationResponse | undefined;
  isSessionActive: boolean;
  setUserData: (appUser: AuthenticationResponse) => void;
  setLogoutTimer: (mils: number) => void;
  checkAutologin: () => void;
  logout: () => void;
}

const checkIfTokenIsValid = (appUser: AuthenticationResponse): boolean => {
  return appUser.jwtExpiresAtTimestamp - new Date().getTime() - 900000 > 0;
};

const useAuthentication = create<AuthStore>(set => {
  let logoutTimer: number;

  return {
    appUser: undefined,
    isSessionActive: false,
    setLogoutTimer: mils => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      logoutTimer = setTimeout(() => {
        set(store => {
          localStorage.removeItem('userData');
          return { ...store, appUser: undefined, isSessionActive: false };
        });
      }, mils);
    },
    setUserData: appUser =>
      set(store => {
        localStorage.setItem('userData', JSON.stringify(appUser));
        const milliseconds = appUser.jwtExpiresAtTimestamp - new Date().getTime();
        store.setLogoutTimer(milliseconds);
        return { ...store, appUser: appUser, isSessionActive: true };
      }),
    checkAutologin: () =>
      set(store => {
        const userDataString = localStorage.getItem('userData');
        const autologinUser = (userDataString && JSON.parse(userDataString)) || undefined;
        const isTokenValid = autologinUser && checkIfTokenIsValid(autologinUser);
        return {
          appUser: isTokenValid && autologinUser ? autologinUser : undefined,
          isSessionActive: isTokenValid && autologinUser ? true : false,
        };
      }),
      logout: () => set(store => {
        clearTimeout(logoutTimer);
        localStorage.removeItem('userData');
        return {...store, appUser: undefined, isSessionActive: false}
      })
  };
});

export default useAuthentication;
